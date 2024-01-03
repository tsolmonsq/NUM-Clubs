//Windows-iin settings deer dark light mode tohiruulga hiih uyd web site-iin huudas dagaad mode ni uurchlugdunu
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const darkModeToggle = document.getElementById('mode-toggle');

function enableDarkMode() {
  document.body.classList.add('dark-mode');
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
}

function handleDarkModeChange(e) {
    if (e.matches) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
handleDarkModeChange(darkModeMediaQuery);