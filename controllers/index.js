/* ------------------------------- */
/* Project  : Tech Blog            */
/* File     : controllers/index.js */
/* Author   : Vicente Garcia       */
/* Date     : 05/06/2022           */
/* Modified : 05/06/2022           */
/* ------------------------------- */
// Access to router module
const router = require('express').Router();
// Access to api folder to get API's routes (tables routes)
const apiRoutes = require('./api');
// Access to home routes
const homeRoutes = require('./home-routes.js');
// Access to dashboard routes
const dashboardRoutes = require('./dashboard-routes.js');
// Initialize dashboard routes
router.use('/dashboard', dashboardRoutes);
// Initialize home routes
router.use('/', homeRoutes);
// Initialize api routes
router.use('/api', apiRoutes);
// Open router
router.use((req, res) => {
  res.status(404).end();
});
// Export module router
module.exports = router;