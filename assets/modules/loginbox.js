const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const loginModal = document.getElementById('loginModal');
const signupLink = document.getElementById('signupLink');
const signupModal = document.getElementById('signupModal');
const closeSignupModalButton = document.getElementById('closeSignupModal');

openModalButton.addEventListener('click', () => {
  loginModal.style.display = 'flex'; 
});

closeModalButton.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

loginModal.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

signupLink.addEventListener('click', () => {
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
});

closeSignupModalButton.addEventListener('click', () => {
  signupModal.style.display = 'none';
});

signupModal.addEventListener('click', (event) => {
  if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
});