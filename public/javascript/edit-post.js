/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : edit-post.js   */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/09/2022     */
/* ------------------------- */
// Function to edit a post
async function editFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content_post = document.querySelector('textarea[name="post-content"]').value.trim();
    // Call update method (route)
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
           ,content_post
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert(response.statusText);
    }
}
// Declare listener to execute click event for update post
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);