/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : models/index.js */
/* Author   : Vicente Garcia  */
/* Date     : 05/06/2022      */
/* Modified : 05/06/2022      */
/* -------------------------- */
// Access to User model
const User = require('./User');
// Access to Post model
const Post = require('./Post');
//const Vote = require('./Vote');
// Access to Comment model
const Comment = require('./Comment');
// Create tables associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});
// Export models User, Post and Comment
module.exports = { User, Post, Comment };