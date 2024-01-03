let currentPage = 0;
const totalPages = document.querySelectorAll(".page").length;

function showPage(page) {
    document.querySelector(".main").style.transform = `translateX(-${page * 50}%)`;
}

function updateButtonColors() {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    prevButton.style.backgroundColor = currentPage === 0 ? "var(--primary-green)" : ""; 
    nextButton.style.backgroundColor = currentPage === totalPages - 1 ? "var(--primary-green)" : ""; 
}

function navigateSlide(direction) {
    if (direction === "next") {
        currentPage = (currentPage + 1) % totalPages;
    } else if (direction === "prev") {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
    }

    showPage(currentPage);
    updateButtonColors();
}

document
    .querySelector(".prev")
    .addEventListener("click", () => navigateSlide("prev"));

document
    .querySelector(".next")
    .addEventListener("click", () => navigateSlide("next"));

updateButtonColors();
