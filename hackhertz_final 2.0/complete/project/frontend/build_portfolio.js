 // Navigation Logic
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html'; 
        });
    }

    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    const isLoggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedInStatus) {
        navLinks.forEach(link => {
            if (link.textContent.toLowerCase() !== 'home') {
                link.classList.add('disabled');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Please log in or sign up to access this page.');
                });
            }
        });
    }
// });

    // Theme Toggling (Sun/Moon)
    // const themeToggle = document.getElementById('theme-toggle');
    // const body = document.body;

    // const savedTheme = localStorage.getItem('theme');
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    //     body.classList.add('dark-mode');
    //     themeToggle.classList.remove('fa-sun');
    //     themeToggle.classList.add('fa-moon');
    // } else {
    //     body.classList.add('light-mode');
    // }

    // themeToggle.addEventListener('click', () => {
    //     body.classList.toggle('dark-mode');
    //     if (body.classList.contains('dark-mode')) {
    //         themeToggle.classList.remove('fa-sun');
    //         themeToggle.classList.add('fa-moon');
    //         localStorage.setItem('theme', 'dark');
    //     } else {
    //         themeToggle.classList.remove('fa-moon');
    //         themeToggle.classList.add('fa-sun');
    //         localStorage.setItem('theme', 'light');
    //     }
    // })
    // Theme Toggling (Sun/Moon)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.classList.remove('fa-sun');
    themeToggle.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }
});