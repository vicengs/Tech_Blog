/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : post-routes.js */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/09/2022     */
/* ------------------------- */
// Access to router module
const router = require('express').Router();
// Access to helpers
const withAuth = require('../../utils/auth');
// Access to Post, User and Comment models
const { Post, User, Comment } = require('../../models');
// Route to get all posts
router.get('/', (req, res) => {
    // Access to Post model to get all posts
    Post.findAll({
        attributes: ['id'
                    ,'title'
                    ,'content_post'
                    ,'created_at'
        ]
       ,order: [['created_at', 'DESC']]
        // JOIN to Post and Comment to get their fields
       ,include: [
            {
                model: Comment
               ,attributes: ['id'
                            ,'comment_text'
                            ,'post_id'
                            ,'user_id'
                            ,'created_at']
               ,include: {
                    model: User
                   ,attributes: ['username']
                }
            },
            {
                model: User
               ,attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get post by id
router.get('/:id', (req, res) => {
    // Access to Post model to get a post by id
    Post.findOne({
        where: {
            id: req.params.id
        }
       ,attributes: ['id'
                    ,'title'
                    ,'content_post'
                    ,'created_at'
        ]
       ,include: [
            {
                model: Comment
               ,attributes: ['id'
                            ,'comment_text'
                            ,'post_id'
                            ,'user_id'
                            ,'created_at']
               ,include: {
                    model: User
                   ,attributes: ['username']
                }
            },
            {
                model: User
               ,attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a post
router.post('/', withAuth, (req, res) => {
    // Access to Post model to create a post
    Post.create({
        title: req.body.title
       ,content_post: req.body.content_post
       ,user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to update a post
router.put('/:id', withAuth, (req, res) => {
    // Access to Post model to update a post
    Post.update(
        {
            title: req.body.title
           ,content_post: req.body.content_post
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to delete a post
router.delete('/:id', withAuth, (req, res) => {
    // Access to Post model to delete a post
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;