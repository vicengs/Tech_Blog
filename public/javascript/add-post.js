/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : add-posts.js   */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/10/2022     */
/* ------------------------- */
// Funtion to create a new post
async function newFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const title        = document.querySelector('input[name="post-title"]').value;
    const content_post = document.querySelector('textarea[name="post-content"]').value;
    // Call to post route to add new post
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title
           ,content_post
        })
       ,headers: {
            'Content-Type': 'application/json'
        }
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};
// Declare listener to execute click event for add new post
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);