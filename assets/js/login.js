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
        // your login credentials
        }),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // handle successful login
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
