document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Modal Functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    loginBtn.addEventListener('click', function() {
        openModal(loginModal);
    });
    
    signupBtn.addEventListener('click', function() {
        openModal(signupModal);
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Resource Filtering
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourcesGrid = document.querySelector('.resources-grid');
    
    // Sample resources data
    const resources = [
        {
            id: 1,
            title: 'Modern Card Component',
            description: 'A clean, responsive card with hover effects and multiple content options.',
            category: 'html',
            downloads: 1245
        },
        {
            id: 2,
            title: 'Animated Button Collection',
            description: '10 different button styles with smooth hover and click animations.',
            category: 'css',
            downloads: 982
        },
        {
            id: 3,
            title: 'Form Validation Logic',
            description: 'Complete form validation with error messages and success states.',
            category: 'js',
            downloads: 1567
        },
        {
            id: 4,
            title: 'Responsive Navbar',
            description: 'Mobile-friendly navigation with dropdown menus and hamburger toggle.',
            category: 'html',
            downloads: 2034
        },
        {
            id: 5,
            title: 'Dark Mode Toggle',
            description: 'Switch between light and dark themes with localStorage persistence.',
            category: 'js',
            downloads: 1789
        },
        {
            id: 6,
            title: 'CSS Grid Layout System',
            description: 'Flexible grid system for creating complex responsive layouts.',
            category: 'css',
            downloads: 1456
        },
        {
            id: 7,
            title: 'React Modal Component',
            description: 'Reusable modal dialog with animations and accessibility features.',
            category: 'react',
            downloads: 876
        },
        {
            id: 8,
            title: 'Loading Spinners',
            description: 'Collection of 8 different CSS-only loading animations.',
            category: 'css',
            downloads: 1123
        }
    ];
    
    // Display all resources initially
    displayResources(resources);
    
    // Filter resources by category
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            resourceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            if (category === 'all') {
                displayResources(resources);
            } else {
                const filteredResources = resources.filter(resource => resource.category === category);
                displayResources(filteredResources);
            }
        });
    });
    
    // Function to display resources
    function displayResources(resourcesToDisplay) {
        resourcesGrid.innerHTML = '';
        
        if (resourcesToDisplay.length === 0) {
            resourcesGrid.innerHTML = '<p class="no-resources">No resources found in this category.</p>';
            return;
        }
        
        resourcesToDisplay.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.innerHTML = `
                <div class="resource-image">
                    <i class="fas fa-code"></i>
                </div>
                <div class="resource-info">
                    <div class="resource-meta">
                        <span class="resource-category">${resource.category.toUpperCase()}</span>
                        <span class="resource-downloads"><i class="fas fa-download"></i> ${resource.downloads.toLocaleString()}</span>
                    </div>
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-actions">
                        <button class="btn small-btn">View Code</button>
                        <button class="btn small-btn outline-btn">Download</button>
                    </div>
                </div>
            `;
            
            resourcesGrid.appendChild(resourceCard);
        });
    }
    
    // Template Slider Navigation
    const slider = document.querySelector('.templates-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: 380,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -380,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                authButtons.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Code Tab Switching in Hero Section
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            codeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, you would switch the code content here
            // For this example, we'll just change the language class
            const codeBlock = document.querySelector('.code-preview code');
            codeBlock.className = `language-${this.textContent.toLowerCase()}`;
        });
    });
});