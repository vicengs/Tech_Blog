/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : delete-posts.js */
/* Author   : Vicente Garcia  */
/* Date     : 05/06/2022      */
/* Modified : 05/10/2022      */
/* -------------------------- */
// Funtion to delete a post
async function deleteFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // Call delete method (route)
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert(response.statusText);
    }
}
// Declare listener to execute click event for delete a post
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);