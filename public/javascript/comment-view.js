/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : comment-view.js */
/* Author   : Vicente Garcia  */
/* Date     : 05/13/2022      */
/* Modified : 05/13/2022      */
/* -------------------------- */
// Function to reload comments to get the most recents
function getRecentComments() {
    setInterval(function(){
            document.location.reload();
    }, 5000);
};
// Call function to begin, first getting the current day and time
getRecentComments();