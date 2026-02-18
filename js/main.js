// Dynamic Project Loader
const projects = [
    {
        title: "Substack - Independent Equity Research & Blog",
        description: "A space where I share the research that goes into my stock picking for my personal portfolio and where I share thoughts on the markets.",
        tags: "Investing, Equity Research, Finance, Economics",
        link: "https://davidvicuna.substack.com" // Update with real link
    }
];

// Load Projects into DOM
const projectContainer = document.getElementById('project-grid');

if (projectContainer) {
    projects.forEach(project => {
        // Create Tags HTML
        const tagsHtml = project.tags.map(tag => `<span class="tag-sm">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-icon"><i class="fas fa-code-branch"></i></div>
            <h4>${project.title}</h4>
            <div class="project-tags">${tagsHtml}</div>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        `;
        projectContainer.appendChild(card);
    });
}

// Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple console greeting
console.log("Portfolio loaded. Welcome, David.");
