// Welcome Message with dynamic name
document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.getElementById('welcome-text');
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Harfi';
    
    welcomeText.textContent = `Hi ${name}, Welcome To Website`;
});

// Form Validation and Submission
const messageForm = document.getElementById('messageForm');
const formResults = document.getElementById('formResults');
const currentTimeElement = document.getElementById('currentTime');
const resultName = document.getElementById('resultName');
const resultEmail = document.getElementById('resultEmail');
const resultPhone = document.getElementById('resultPhone');
const resultBirthDate = document.getElementById('resultBirthDate');
const resultGender = document.getElementById('resultGender');
const resultMessage = document.getElementById('resultMessage');
const editFormBtn = document.getElementById('editForm');
const submitBtn = document.querySelector('.submit-btn');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.style.display = 'none';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('messageText').value.trim();
    
    // Validate Name
    if (name === '') {
        showError(nameError, 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError(nameError, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        hideError(nameError);
    }
    
    // Validate Email
    if (email === '') {
        showError(emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError(emailError);
    }
    
    // Validate Phone
    if (phone === '') {
        showError(phoneError, 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError(phoneError, 'Please enter a valid phone number');
        isValid = false;
    } else {
        hideError(phoneError);
    }
    
    // Validate Message
    if (message === '') {
        showError(messageError, 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError(messageError, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        hideError(messageError);
    }
    
    return isValid;
}

function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const now = new Date();
    return now.toString();
}

// Animated form submission
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading animation
        submitBtn.classList.add('loading');
        
        // Simulate form processing
        setTimeout(() => {
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                birthDate: document.getElementById('birthDate').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || 'Not specified',
                message: document.getElementById('messageText').value.trim()
            };
            
            // Display results
            currentTimeElement.textContent = getCurrentTime();
            resultName.textContent = formData.name;
            resultEmail.textContent = formData.email;
            resultPhone.textContent = formData.phone;
            resultBirthDate.textContent = formatDate(formData.birthDate);
            resultGender.textContent = formData.gender;
            resultMessage.textContent = formData.message;
            
            // Show results and hide form
            messageForm.style.display = 'none';
            formResults.style.display = 'block';
            
            // Remove loading state
            submitBtn.classList.remove('loading');
        }, 1500);
    }
});

editFormBtn.addEventListener('click', function() {
    // Show form and hide results
    messageForm.style.display = 'block';
    formResults.style.display = 'none';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update current time every second when results are shown
setInterval(() => {
    if (formResults.style.display === 'block') {
        currentTimeElement.textContent = getCurrentTime();
    }
}, 1000);

// Add input event listeners for real-time validation
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        hideError(nameError);
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (validateEmail(this.value.trim())) {
        hideError(emailError);
    }
});

document.getElementById('phone').addEventListener('input', function() {
    if (validatePhone(this.value.trim())) {
        hideError(phoneError);
    }
});

document.getElementById('messageText').addEventListener('input', function() {
    if (this.value.trim().length >= 10) {
        hideError(messageError);
    }
});