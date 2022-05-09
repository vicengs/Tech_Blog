/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : login.js       */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/09/2022     */
/* ------------------------- */
// Function to sign up a user
async function signupFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to grt value from page
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // If field values are not null save new user
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username
               ,password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // Check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    };
};
// Function to sign in
async function loginFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to grt value from page
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If field values are not null validate if is a valid user
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username
               ,password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // Check the response status
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    };
};
// Declare listeners to execute click events
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);