document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggling (Sun/Moon)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    } else {
        body.classList.add('light-mode');
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

    // FAQ Section Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            const answer = questionButton.nextElementSibling;
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Review Submission and Display
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');
    const starRatingContainer = document.getElementById('star-rating');
    let currentRating = 0;

    const predefinedReviews = [
        { name: "Priya S.", reviewText: "This platform is a game-changer for students! I easily built a stunning portfolio that got me my dream internship.", rating: 5 },
        { name: "Rahul V.", reviewText: "The drag-and-drop builder and AI features are incredibly intuitive. I had a professional portfolio ready in no time!", rating: 4 },
        { name: "Anjali P.", reviewText: "I had zero technical skills, but the templates made it easy to showcase my projects. Highly recommend!", rating: 5 }
    ];

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    renderReviews();

    function renderReviews() {
        const allReviews = [...predefinedReviews, ...reviews];
        reviewsContainer.innerHTML = '';
        allReviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            const starRating = '<div class="rating">' +
                Array(review.rating).fill('<i class="fas fa-star"></i>').join('') +
                Array(5 - review.rating).fill('<i class="far fa-star"></i>').join('') +
                '</div>';

            reviewCard.innerHTML = `
                <p>"${review.reviewText}"</p>
                ${starRating}
                <h4>${review.name}</h4>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }

    starRatingContainer.addEventListener('mouseover', (e) => {
        const rating = e.target.dataset.rating;
        if (rating) {
            highlightStars(rating);
        }
    });

    starRatingContainer.addEventListener('click', (e) => {
        const rating = e.target.dataset.rating;
        if (rating) {
            currentRating = rating;
            highlightStars(rating);
        }
    });

    starRatingContainer.addEventListener('mouseout', () => {
        highlightStars(currentRating);
    });

    function highlightStars(rating) {
        const stars = starRatingContainer.querySelectorAll('.fa-star');
        stars.forEach(star => {
            if (star.dataset.rating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;

        if (name && reviewText && currentRating > 0) {
            const newReview = {
                name: name,
                reviewText: reviewText,
                rating: parseInt(currentRating)
            };
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            renderReviews();
            reviewForm.reset();
            currentRating = 0;
            highlightStars(0);
        } else {
            alert('Please fill out all fields and provide a rating.');
        }
    });

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
});