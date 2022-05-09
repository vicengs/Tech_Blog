/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : home-routes.js */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/06/2022     */
/* ------------------------- */
// Access to router module
const router = require('express').Router();
// Access to db connection
const sequelize = require('../config/connection');
// Access to Post, User and Comment models
const { Post, User, Comment } = require('../models');
// Route to get all posts
router.get('/', (req, res) => {
    // Access to Post model to get all posts
    Post.findAll({
        attributes: ['id'
                    ,'title'
                    ,'content_post'
                    ,'created_at'
        ]
        // JOIN to Comment and User to get their fields
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
        // Render a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get user session
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// Route to get a post by id
router.get('/post/:id', (req, res) => {
    // Access to Post model to get a posts by id
    Post.findOne({
        where: { id: req.params.id}
       ,attributes: ['id'
                    ,'post_url'
                    ,'title'
                    ,'created_at'
        ]
        // JOIN to Comment and User to get their fields
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
        // Render a single post object into the single post template
        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;