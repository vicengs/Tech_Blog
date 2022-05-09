/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : user-routes.js */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/09/2022     */
/* ------------------------- */
// Access to router module
const router = require('express').Router();
// Access to helper authorization
const withAuth = require('../../utils/auth');
// Access to Post, User and Comment models
const { User, Post, Comment } = require('../../models');
// Route to get all users
router.get('/', (req, res) => {
    // Access to User model to get all users
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get user by id
router.get('/:id', (req, res) => {
    // Access to User model to get a user by id
    User.findOne({
        attributes: { exclude: ['password'] }
       ,where: { id: req.params.id }
        // JOIN to Post and Comment to get their fields
       ,include: [{
            model: Post
           ,attributes: ['id'
                        ,'title'
                        ,'content_post'
                        ,'created_at']
        },
        {
            model: Comment
           ,attributes: ['id'
                        ,'comment_text'
                        ,'created_at']
           ,include: {
                model: Post
               ,attributes: ['title']
            }
        }
    ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to add a user
router.post('/', (req, res) => {
    // Access to User model to create a user
    User.create({
        username: req.body.username
       ,password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            // Declare session variables
            req.session.user_id  = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
// Route to log in user
router.post('/login', (req, res) => {
    // Access to User model to get a user by username
    User.findOne({
        where: { username: req.body.username }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found!' });
            return;
        }
        // Validate password typed
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // Declare session variables
            req.session.user_id  = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});
// Route to log out user
router.post('/logout', withAuth, (req, res) => {
    // Destroy session if exists
    if (req.session.loggedIn) {
        req.session.destroy(() => {
                res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});
// Route to update a user
router.put('/:id', withAuth, (req, res) => {
    // Access to User model to update a user
    User.update(req.body, {
        individualHooks: true
       ,where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to delete a user
router.delete('/:id', (req, res) => {
    // Access to User model to delete a user
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;