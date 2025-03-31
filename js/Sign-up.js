document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form values
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Create user object
    const user = {
        email: email,
        username: username,
        password: password
    };
    // Save to localStorage
    localStorage.setItem('trelloUser', JSON.stringify(user));
    // Optional: Get existing users array or create new one
    let users = JSON.parse(localStorage.getItem('trelloUsers')) || [];
    // Add new user to array
    users.push(user);
    // Save updated array back to localStorage
    localStorage.setItem('trelloUsers', JSON.stringify(users));
    // Show success message
    alert('Sign up successful!');
    // Clear form
    this.reset();
});