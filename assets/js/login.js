document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let messageElement = document.getElementById("message");

    fetch('http://localhost:3000/login', {
        method: 'POST',
        cache: "no-cache",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then(response => {
        if (!response.ok) {
            messageElement.textContent = "Имэйл хаяг эсвэл нууц үг буруу байна!";
            throw new Error(`Login failed: ${response.statusText}`);
        }

        return response.json();
    })
    .then(data => {
        const logincont = document.getElementById("login-cont");
        const loginbtn = document.getElementById("openModal");

        loginbtn.style.display = "none";

        
        logincont.innerHTML = `
        <style>
            #login-cont{
                display: flex;
            }
            .uname{
                color: var(--text-color-1);
                display: flex;
                align-items: center;
            }
            #logoutbtn{
                margin-left: 1.5rem;
            }
        
        </style>
        <p class="uname">${data.username}</p>
        <button id="logoutbtn" class="btn">Гарах</button>
        `;
        localStorage.setItem('username', data.username);
        
        location.reload();
        alert("Амжилттай нэвтэрлээ!");
    });
});

const username = localStorage.getItem('username');

if (username) {
    const logincont = document.getElementById("login-cont");
    const loginbtn = document.getElementById("openModal");

    loginbtn.style.display = "none";

    logincont.innerHTML = `
        <style>
            #login-cont{
                display: flex;
            }
            .uname{
                color: var(--text-color-1);
                display: flex;
                align-items: center;
            }
            #logoutbtn{
                margin-left: 1.5rem;
            }
        
        </style>
        <p class="uname">${username}</p>
        <button id="logoutbtn" class="btn">Гарах</button>
    `;
}

document.addEventListener("click", (event) => {
    if (event.target.id === "logoutbtn") {

        fetch("http://localhost:3000/logout")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Logout failed: ${response.statusText}`);
                }

                console.log("Amjilttai garlaa");

                localStorage.removeItem("username");

                const logincont = document.getElementById("login-cont");
                const loginbtn = document.getElementById("openModal");

                loginbtn.style.display = "block";
                   
                logincont.innerHTML = "";
            })
            .catch(error => {
                console.error("Logout Error:", error);
            });

            location.reload();
    }
});