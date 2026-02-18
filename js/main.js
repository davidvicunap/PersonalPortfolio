// Dynamic Project Loader
const projects = [
    {
        title: "Project Nitro",
        description: "An AI-driven self-custody wallet for the next generation of crypto investing. Built with cutting-edge technology to provide secure, intelligent portfolio management.",
        tags: ["AI", "Crypto", "FinTech", "Web3"],
        link: "https://github.com/davidvicunap",
        icon: "fas fa-rocket"
    },
    {
        title: "Substack - Independent Equity Research",
        description: "A space where I share the research that goes into my stock picking for my personal portfolio and where I share thoughts on the markets.",
        tags: ["Investing", "Equity Research", "Finance", "Economics"],
        link: "https://davidvicuna.substack.com",
        icon: "fas fa-chart-line"
    },
    {
        title: "LearnOnChain",
        description: "WebApp to educate on Decentralized Finance and Blockchain Technologies. Making complex DeFi concepts accessible through interactive learning.",
        tags: ["DeFi", "Education", "Web3", "React"],
        link: "https://github.com/davidvicunap/LearnOnChain",
        icon: "fas fa-graduation-cap"
    },
    {
        title: "Financial Modeling Tools",
        description: "Python-based tools for DCF valuation, risk analysis, and portfolio optimization. Used for personal investment research and analysis.",
        tags: ["Python", "Finance", "Data Analysis", "Pandas"],
        link: "https://github.com/davidvicunap",
        icon: "fas fa-calculator"
    }
];

// Load Projects into DOM
const projectContainer = document.getElementById('project-grid');

if (projectContainer) {
    projects.forEach((project, index) => {
        // Create Tags HTML
        const tagsHtml = project.tags.map(tag => `<span class="tag-sm">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.innerHTML = `
            <div class="card-icon"><i class="${project.icon || 'fas fa-code-branch'}"></i></div>
            <h4>${project.title}</h4>
            <div class="project-tags">${tagsHtml}</div>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        `;
        projectContainer.appendChild(card);
        
        // Animate card entrance
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for actual anchor links, not empty hash
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation (excluding hero which has its own animations)
document.querySelectorAll('.section').forEach(section => {
    // Skip hero section as it has its own animations
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    const menuIcon = mobileMenu.querySelector('i');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (menuIcon) {
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
}

// Dynamic Year for Footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Add scroll effect to navbar and active link highlighting
const navbar = document.querySelector('.navbar');
const allNavLinks = document.querySelectorAll('.nav-links a');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const scrollPosition = window.pageYOffset + 150;
    let activeSectionFound = false;
    
    // Check each section to see if we're currently viewing it
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            allNavLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            navLink.classList.add('active');
            activeSectionFound = true;
        }
    });
    
    // Only remove active classes if we're truly at the top (before any section)
    // Use the same offset logic (scrollPosition - 150) to be consistent
    if (!activeSectionFound && (window.pageYOffset + 150) < (sections[0]?.offsetTop || 0)) {
        allNavLinks.forEach(link => link.classList.remove('active'));
    }
}

// Initialize active link on page load
window.addEventListener('load', updateActiveNavLink);

// Simple console greeting
console.log("Portfolio loaded. Welcome, David.");
