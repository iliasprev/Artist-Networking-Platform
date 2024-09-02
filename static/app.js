document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.navbar__menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });
});

// app.js

// Function to apply for an opportunity
function applyForOpportunity(opportunityId) {
    const email = prompt("Enter your email to apply:");
    if (email) {
        // Call your backend API to process the application
        fetch('/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, opportunityId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Attach event listeners to apply buttons
document.addEventListener('DOMContentLoaded', function() {
    const applyButtons = document.querySelectorAll('.apply-button');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const opportunityId = this.getAttribute('data-opportunity-id');
            applyForOpportunity(opportunityId);
        });
    });
});

const signInBtnLink = document.querySelector('.signInBtn-link'); // No space between the dot and the class name
const signUpBtnLink = document.querySelector('.signUpBtn-link'); // No space between the dot and the class name
const wrapper = document.querySelector('.wrapper'); // No space between the dot and the class name

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});


