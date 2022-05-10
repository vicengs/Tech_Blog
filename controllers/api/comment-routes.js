/* ---------------------------- */
/* Project  : Tech Blog         */
/* File     : comment-routes.js */
/* Author   : Vicente Garcia    */
/* Date     : 05/06/2022        */
/* Modified : 05/09/2022        */
/* ---------------------------- */
// Access to router module
const router = require('express').Router();
// Access to helpers
const withAuth = require('../../utils/auth');
// Access to Post, User and Comment models
const { Comment, User, Post } = require('../../models');
// Route to get all comments
router.get('/', (req, res) => {
    // Access to Comment model to get all comments
    Comment.findAll({
        attributes: ['id'
                    ,'comment_text'
                    ,'created_at']
       ,order: [['created_at', 'DESC']]
       ,include: [
            {
                model: User
               ,attributes: ['username']
            },
            {
                model: Post
               ,attributes: ['title']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a comment
router.post('/', withAuth, (req, res) => {
    // Access to Comment model to create a comment if a session exists
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text
               ,post_id: req.body.post_id
               ,user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});
// Route to delete a post
router.delete('/:id', withAuth, (req, res) => {
    // Access to Comment model to delete a comment
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;