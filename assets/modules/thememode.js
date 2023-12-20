const darkModeMediaQuery = window.matchMedia('prefers-color-schema: dark');

function handleDarkModeChange(e){
    if(e.matches){
        enableDarkMode();
    }
    else{
        disableDarkMode();
    }
}
darkModeMediaQuery.addEventListener(handleDarkModeChange);

handleDarkModeChange(darkModeMediaQuery);


const windowsDarkMode = document.getElementById('toggleDarkMode');

windowsDarkMode.addEventListener('change', () => {
    if(windowsDarkMode.checked){
        enableDarkMode();
    }
    else{
        disableDarkMode();
    }
})

// const darkModeToggle = document.getElementById('toggleDarkMode');

// darkModeToggle.addEventListener('click', () => {
//     if(darkModeToggle.checked)
//         document.body.classList.toggle("dark-mode");
//     else{
//         document.body.classList.toggle(":root");
//     }
// })
