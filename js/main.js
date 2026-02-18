// Dynamic Project Loader
const projects = [
    {
        title: "Project Augur (Nexus Grid)",
        description: "An AI-driven business intelligence platform designed to democratize data analytics for SMBs.",
        tags: "Python, AI, Business Intelligence",
        link: "https://github.com/davidvicunap/ProjectAugur" // Update with real link
    },
    {
        title: "Crypto Portfolio Optimizer",
        description: "A Python-based tool using Modern Portfolio Theory to optimize allocation for high-growth crypto assets.",
        tags: "Python, Pandas, Finance",
        link: "https://github.com/davidvicunap" // Update with real link
    },
    {
        title: "Apple (AAPL) Valuation Model",
        description: "A comprehensive DCF analysis model predicting intrinsic value based on wearables growth.",
        tags: "Excel, Financial Modeling",
        link: "https://github.com/davidvicunap"
    },
    {
        title: "Sustainable Brand Launch",
        description: "Market research and business plan for an eco-friendly wellness e-commerce brand.",
        tags: "Strategy, E-Commerce",
        link: "#"
    }
];

const projectContainer = document.getElementById('project-grid');

if (projectContainer) {
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h4>${project.title}</h4>
            <div class="project-tags">${project.tags}</div>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        `;
        projectContainer.appendChild(card);
    });
}

// Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();
