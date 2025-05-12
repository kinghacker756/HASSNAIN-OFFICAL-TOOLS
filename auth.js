// Authentication System with WhatsApp Notification
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.getElementById('userProfile');
    const authModal = new bootstrap.Modal(document.getElementById('authModal'));
    const authForm = document.getElementById('authForm');
    const toggleAuthForm = document.getElementById('toggleAuthForm');
    const authModalTitle = document.getElementById('authModalTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    
    let isLoginMode = true;
    
    // Check if user is already logged in (from localStorage)
    if (localStorage.getItem('loggedInUser')) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userProfile.style.display = 'block';
    }
    
    // Login button click
    loginBtn.addEventListener('click', function() {
        isLoginMode = true;
        authModalTitle.textContent = 'Login';
        authSubmitBtn.textContent = 'Login