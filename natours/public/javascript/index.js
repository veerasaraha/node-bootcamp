import '@babel/polyfill';
import { displayMap } from './mapbox.js';
import { login, logout } from './login.js';

// DOM ELEMENTS
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

// DELEGATION
if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
