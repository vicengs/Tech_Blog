/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : auth.js */
/* Author   : Vicente Garcia  */
/* Date     : 05/06/2022      */
/* Modified : 05/09/2022      */
/* -------------------------- */
// Function to avoid access through the direction path without authentication
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};
// Export module
module.exports = withAuth;