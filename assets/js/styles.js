// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     let messageElement = document.getElementById('message');

//     // Fetch the user data
//     fetch('assets/json/user.json')
//         .then(response => response.json())// json datagaa idevhitei bolgoj baigaa
//         .then(users => {
//             let user = users.find(user => user.uid1 === email);//js ugj bga user gsn utga ni  jsonoos irsn utga bln htmlees irsen utga hyr tntsuu thioldold user ni idevhitei blno

//             if (user) {
//                 window.location.href = '/index.html'; // Redirect the user
//             } else {
//                 messageElement.textContent = 'email хаяг буруу байна!';
//             }   
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             messageElement.textContent = 'Error loading user data!';
//         });
// });
