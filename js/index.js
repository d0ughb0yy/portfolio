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
                    ${project.github ? `<a href="${project.github}" target="_blank" class="github-link"><img src="img/github-logo.svg" alt="GitHub" class="github-icon"></a>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
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