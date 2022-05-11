/* ------------------------------ */
/* Project  : Tech Blog           */
/* File     : dashboard-routes.js */
/* Author   : Vicente Garcia      */
/* Date     : 05/06/2022          */
/* Modified : 05/10/2022          */
/* ------------------------------ */
// Access to router module
const router = require('express').Router();
// Access to db connection
const sequelize = require('../config/connection');
// Access to helpers
const withAuth = require('../utils/auth');
// Access to Post, User and Comment models
const { Post, User, Comment } = require('../models');
// Route to get all posts
router.get('/', withAuth, (req, res) => {
    // Access to Post model to get all posts
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
       ,attributes: ['id'
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
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // Render a single post object into the dashboard template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get create post page
router.get('/create', withAuth, (req, res) => {
    res.render('create-post', { loggedIn: true });
});
// Route to get post by id to edit
router.get('/edit/:id', withAuth, (req, res) => {
    // Access to Post model to get a posts by id
    Post.findOne({
        where: { id: req.params.id}
       ,attributes: ['id'
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Render a single post object into the edit post template
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;