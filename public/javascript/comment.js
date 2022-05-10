/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : comment.js     */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/09/2022     */
/* ------------------------- */
// Function to add a comment
async function commentFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // If comment is not null then save and redirect to comments
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                 comment_text
                ,post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Check the response status
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        };
    };
};
// Declare listener to execute click event for add new post
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);