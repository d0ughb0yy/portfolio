// Function to load projects
async function loadProjects() {
    const response = await fetch('projects.json');
    const projects = await response.json();

    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="github-link" aria-label="View on GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });

    // Initialize carousel after projects are loaded
    initCarousel();
}

// Carousel functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    let cards = track.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    // Clone first and last cards for smooth looping
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);
    
    track.appendChild(firstCard);
    track.insertBefore(lastCard, cards[0]);

    // Get all cards including clones
    cards = track.querySelectorAll('.project-card');
    const totalSlides = cards.length; // includes 2 clones
    
    // Real projects start at index 1 (after the cloned last)
    let currentSlide = 1; 
    const isTransitioning = false;

    // Create dots - only for real projects (not clones)
    const realProjectCount = totalSlides - 2;
    for (let i = 0; i < realProjectCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i + 1));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel(animate = true) {
        const slideWidth = 100;
        
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.4s ease';
        }
        
        track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots - map to real slides (index 1 = dot 0, etc.)
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide - 1);
        });
        
        // After transition completes, check if we need to jump
        if (animate) {
            setTimeout(() => {
                // If we're on the cloned first (last position), jump to real first
                if (currentSlide === totalSlides - 1) {
                    currentSlide = 1;
                    updateCarousel(false);
                }
                // If we're on the cloned last (first position), jump to real last
                else if (currentSlide === 0) {
                    currentSlide = totalSlides - 2;
                    updateCarousel(false);
                }
            }, 400);
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel(true);
    }

    function nextSlide() {
        currentSlide++;
        updateCarousel(true);
    }

    function prevSlide() {
        currentSlide--;
        updateCarousel(true);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initial setup - start at first real slide (index 1)
    updateCarousel(false);
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') {
            // Logo click - scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (mobileMenuToggle && navLinks) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !e.target.closest('nav')) {
            closeMenu();
        }
    });

    // Close menu with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const skillValue = bar.getAttribute('data-skill');
                bar.style.setProperty('--skill-width', skillValue + '%');
                bar.style.width = skillValue + '%';
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bar animation
document.addEventListener('DOMContentLoaded', animateSkillBars);
