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

// Load Projects into DOM with enhanced animations
const projectContainer = document.getElementById('project-grid');

if (projectContainer) {
    projects.forEach((project, index) => {
        // Create Tags HTML
        const tagsHtml = project.tags.map(tag => `<span class="tag-sm">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.innerHTML = `
            <div class="card-icon"><i class="${project.icon || 'fas fa-code-branch'}"></i></div>
            <h4>${project.title}</h4>
            <div class="project-tags">${tagsHtml}</div>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        `;
        projectContainer.appendChild(card);
        
        // Animate card entrance with stagger
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 150));
        
        // Add intersection observer for cards that aren't initially visible
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
}

// Enhanced smooth scroll for navigation links (already handled above, removing duplicate)

// Enhanced Intersection Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections for animation (excluding hero which has its own animations)
document.querySelectorAll('.section').forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    }
});

// Mobile menu toggle with improved UX
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const body = document.body;

// Create overlay for mobile menu
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function closeMobileMenu() {
    if (navLinks) {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    const menuIcon = mobileMenu?.querySelector('i');
    if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

function openMobileMenu() {
    if (navLinks) {
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('menu-open');
    }
    const menuIcon = mobileMenu?.querySelector('i');
    if (menuIcon) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
}

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize (if resizing to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
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

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    element.style.opacity = '1';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animate hero elements on load
window.addEventListener('load', () => {
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDescription = document.getElementById('hero-description');
    
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 80);
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(20px)';
            heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 100);
        }, 1500);
    }
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(20px)';
            heroDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 100);
        }, 2000);
    }
});

// Enhanced Intersection Observer with stagger animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe article cards with stagger
document.querySelectorAll('.article-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Subtle parallax effect for hero section
let ticking = false;
function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < window.innerHeight) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add smooth reveal animation to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
    
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
    }, 500 + (index * 100));
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.btn, .project-card, .article-card, .skill-tag').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Remove any loading animations
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
});

// Logo click - smooth scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Add animation to badge
const badge = document.querySelector('.badge');
if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-10px)';
    badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 100);
}

// Simple console greeting
console.log("Portfolio loaded. Welcome, David.");
