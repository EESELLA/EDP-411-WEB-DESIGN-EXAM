// ========== MAIN FUNCTIONS ========== //

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    setActiveLink();
    setupSmoothScrolling();
    handleResizeEvents();
    
    // Page-specific functions
    if (document.getElementById('login-form')) setupLoginForm();
    if (document.getElementById('contact-form')) setupContactForm();
    if (document.querySelector('.resource-grid')) setupResourceFiltering();
    if (document.getElementById('search-input')) setupSearch();
});

// ========== CORE FUNCTIONALITY ========== //

// Mobile menu toggle
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰ Menu';
    menuButton.className = 'mobile-menu-btn';
    menuButton.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    const header = document.querySelector('header .container');
    if (header) {
        header.insertBefore(menuButton, header.querySelector('nav'));
        
        // Hide regular menu on mobile initially
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').style.display = 'none';
        }
    }
}

// Highlight current page in navigation
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Handle window resize events
function handleResizeEvents() {
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth > 768 && nav) {
            nav.style.display = '';
        } else if (nav) {
            nav.style.display = 'none';
        }
    });
}

// ========== PAGE-SPECIFIC FEATURES ========== //

// Login Form Functionality
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!username || !password) {
            showAlert('Please enter both username and password', 'error');
            return;
        }
        
        // Simulate login (in real app, this would call your backend)
        showAlert('Login successful! Redirecting...', 'success');
        
        // Clear form and redirect after delay
        loginForm.reset();
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to home
        }, 1500);
    });
}

// Contact Form Functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showAlert('Your message has been sent!', 'success');
        contactForm.reset();
    });
}

// Resource Filtering (for Academic/Services/Extracurricular pages)
function setupResourceFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                filterResources(filterValue);
                
                // Update active state of buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

function filterResources(filter) {
    const resources = document.querySelectorAll('.resource-card');
    
    resources.forEach(resource => {
        if (filter === 'all' || resource.getAttribute('data-category') === filter) {
            resource.style.display = 'block';
        } else {
            resource.style.display = 'none';
        }
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const resources = document.querySelectorAll('.resource-card');
        
        resources.forEach(resource => {
            const text = resource.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                resource.style.display = 'block';
            } else {
                resource.style.display = 'none';
            }
        });
    });
}

// ========== HELPER FUNCTIONS ========== //

function showAlert(message, type) {
    // Remove any existing alerts first
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.prepend(alertDiv);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}