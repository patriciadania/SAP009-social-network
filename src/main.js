// import { myFunction } from './pages/index.js';

// myFunction();

const btn = document.querySelector('.container');
btn.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
});
