// ===================================
// PAGE NAVIGATION
// ===================================

/**
 * Show specific page and hide others
 * @param {string} page - 'front', 'login', or 'signup'
 */
const showPage = (page) => {
    const pages = {
        front: document.querySelector('.front-page'),
        login: document.querySelector('.login-page'),
        signup: document.querySelector('.signup-page')
    };

    // Hide all pages
    Object.values(pages).forEach(p => p.style.display = 'none');

    // Show selected page
    if (page === 'front') {
        pages.front.style.display = 'block';
    } else if (page === 'login') {
        pages.login.style.display = 'block';
    } else if (page === 'signup') {
        pages.signup.style.display = 'flex';
    }
};

// Logo click - return to front page
document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('front');
    });
});

// Login buttons - show login page
document.querySelectorAll('.login').forEach(loginBtn => {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
    });
});

// Signup buttons - show signup page
document.querySelectorAll('.signup').forEach(signupBtn => {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('signup');
    });
});

// ===================================
// NAVIGATION SETUP
// ===================================

/**
 * Setup navigation based on screen size
 */
const setupNavigation = () => {
    const isMobile = window.innerWidth < 1000;
    const dropdownItems = document.querySelectorAll('.dropdown-hover');

    if (isMobile) {
        setupMobileNavigation();
    } else {
        setupDesktopNavigation(dropdownItems);
    }
};

/**
 * Mobile navigation with hamburger menu
 */
const setupMobileNavigation = () => {
    const menuIcon = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar');

    // Clone to remove old event listeners
    const newMenuIcon = menuIcon.cloneNode(true);
    menuIcon.parentNode.replaceChild(newMenuIcon, menuIcon);

    // Toggle mobile menu
    newMenuIcon.addEventListener('click', () => {
        navbar.classList.toggle('change');
        
        // Close all dropdowns when menu closes
        if (!navbar.classList.contains('change')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.style.left = '-20rem';
            });
        }
    });

    // Show dropdown on link click
    document.querySelectorAll('.show-dropdown').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = newLink.nextElementSibling;
            if (dropdown) {
                dropdown.style.left = '0';
            }
        });
    });

    // Back button in dropdown
    document.querySelectorAll('.dropdown-heading-link').forEach(headingLink => {
        const newHeadingLink = headingLink.cloneNode(true);
        headingLink.parentNode.replaceChild(newHeadingLink, headingLink);
        
        newHeadingLink.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = newHeadingLink.closest('.nav-dropdown');
            if (dropdown) {
                dropdown.style.left = '-20rem';
            }
        });
    });
};

/**
 * Desktop navigation with hover dropdowns
 * @param {NodeList} dropdownItems - Dropdown menu items
 */
const setupDesktopNavigation = (dropdownItems) => {
    const navbarWrapper = document.querySelector('.navbar-wrapper');

    dropdownItems.forEach(dropdownItem => {
        // Clone to remove old event listeners
        const newDropdownItem = dropdownItem.cloneNode(true);
        dropdownItem.parentNode.replaceChild(newDropdownItem, dropdownItem);

        const dropdown = newDropdownItem.lastElementChild;
        const chevron = newDropdownItem.querySelector('.nav-list-link i');

        // Show dropdown on hover
        newDropdownItem.addEventListener('mouseover', () => {
            if (dropdown) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
            }
            if (navbarWrapper) {
                navbarWrapper.style.background = 'linear-gradient(to right, #066399, #2f8fdf, #066399)';
            }
            if (chevron) {
                chevron.style.transform = 'rotate(180deg)';
            }
        });

        // Hide dropdown on mouse leave
        newDropdownItem.addEventListener('mouseout', () => {
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            }
            if (navbarWrapper) {
                navbarWrapper.style.background = 'none';
            }
            if (chevron) {
                chevron.style.transform = 'rotate(0)';
            }
        });
    });
};

// ===================================
// FORM VALIDATION
// ===================================

/**
 * Validate login form
 */
const validateLoginForm = () => {
    const loginBtn = document.querySelector('.form-login-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const emailInput = document.querySelector('#login-email');
            const passwordInput = document.querySelector('#login-password');
            
            if (!emailInput || !passwordInput) return;
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Basic validation
            if (!email) {
                alert('Please enter your email or mobile number');
                emailInput.focus();
                return;
            }
            
            if (!password) {
                alert('Please enter your password');
                passwordInput.focus();
                return;
            }
            
            // Simulate login (in real app, would send to server)
            console.log('Login attempted with:', email);
            alert('Login feature is not implemented in this demo');
        });
    }
};

/**
 * Handle signup form continuation
 */
const handleSignupForm = () => {
    const signupBtn = document.querySelector('.signup-page-form .blue-btn');
    
    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const selectedAccount = document.querySelector('input[name="account-type"]:checked');
            
            if (selectedAccount) {
                const accountType = selectedAccount.id === 'personal' ? 'Personal' : 'Business';
                console.log('Selected account type:', accountType);
                alert(`${accountType} account signup is not implemented in this demo`);
            }
        });
    }
};

// ===================================
// RESIZE HANDLER
// ===================================

let resizeTimer;

/**
 * Debounced resize handler to prevent excessive reconfiguration
 */
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        setupNavigation();
    }, 250);
});

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize all features on page load
 */
const init = () => {
    setupNavigation();
    validateLoginForm();
    handleSignupForm();
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}