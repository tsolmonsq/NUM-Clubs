document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let messageElement = document.getElementById("signup-message");

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Assuming the server sends back a session token or ID
    const sessionToken = data.token;
   

    // Store the token in local storage or session storage
    localStorage.setItem('sessionToken', sessionToken);

    // Redirect to user dashboard or home page
    window.location.href = '/dashboard.html'; // Change this to your user-specific page
        
    })
    .catch(error => {
        console.error('Login Error:', error.message);
    });
});

function logout() {
    fetch("http://localhost:3000/logout", {})
        .then(() => {
            // Additional logout logic if needed
        })
        .catch(error => {
            console.error("Logout Error:", error);
        });
}
