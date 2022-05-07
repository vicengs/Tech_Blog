/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : api/index.js   */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/06/2022     */
/* ------------------------- */
// Access to router module
const router = require('express').Router();
// Access to user routes
const userRoutes = require('./user-routes.js');
// Access to post routes
const postRoutes = require('./post-routes');
// Access to comment routes
const commentRoutes = require('./comment-routes');
// Open user routes
router.use('/users', userRoutes);
// Open post routes
router.use('/posts', postRoutes);
// Open comment routes
router.use('/comments', commentRoutes);
// Export module router
module.exports = router;