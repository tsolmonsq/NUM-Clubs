//Delgetsiin hemjee bagasah uyd header navigation-g drop menu bolgoh
const navIcon = document.querySelector(".nav-icon");
      const navMenu = document.querySelector(".navbar-items");
      navIcon.addEventListener("click", () =>{
        navIcon.classList.toggle("active");
        navMenu.classList.toggle("active");
})
