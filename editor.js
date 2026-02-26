
const defaultData = {
    personal: {
        firstName: "MUHAMMAD",
        lastName: "TAHIR",
        role: "Full Stack Developer",
        location: "Multan, Pakistan",
        phone: "+92 326 6640988",
        email: "tahirsultanofficial@gmail.com",
        portfolio: "https://tahirdev.vercel.app",
        github: "https://github.com/muhammad-tahir-sultan",
        linkedin: "https://linkedin.com/in/muhammadtahirsultan"
    },
    summary: "Results-oriented Full Stack Developer with 4+ years of experience specializing in building scalable web applications using NestJS, React, Next.js, TypeScript, Python, and Django. Proven track record in designing secure AI-powered APIs, implementing AI Integrations (OpenAI, Claude, LangChain), and optimizing performance.",
    experience: [
        {
            title: "Software Engineer",
            company: "Sparkosol",
            date: "2024 - Present",
            bullets: [
                "Architected scalable web applications using NestJS and React, focusing on high-traffic resilience.",
                "Leveraged AWS (EC2/S3) for scalable resource management and cloud storage solutions.",
                "Implemented complex RBAC systems and secure authentication workflows.",
                "Optimized database performance via PostgreSQL query tuning, reducing response times by 30%."
            ]
        },
        {
            title: "MERN Stack Developer",
            company: "Hashtagweb",
            date: "2022 – 2024",
            bullets: [
                "Lead backend development for 4+ web applications, ensuring robust API integration and security.",
                "Integrated Supabase and PostgreSQL for real-time data synchronization.",
                "Achieved average Lighthouse scores of 85+ through advanced frontend optimization."
            ]
        }
    ],
    projects: [
        { name: "Real Time Chat App", description: "One-to-one chat application built with MongoDB, Express, React, Node.js, and Socket.io." },
        { name: "AI Image Enhancer", description: "Deep learning powered tool to enhance image resolution and quality in seconds." },
        { name: "MobiCommerce", description: "Features premium smartphone discovery and accessories with fast delivery workflows." }
    ],
    skills: {
        frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        backend: ["Node.js", "NestJS", "Python", "Django", "GraphQL"],
        databases: ["PostgreSQL", "Supabase", "MongoDB", "Prisma"],
        devops: ["AWS", "Docker", "CI/CD", "Vercel"],
        ai: ["OpenAI", "Claude", "LangChain", "Cursor", "Antigravity"]
    },
    education: [
        { degree: "BS Computer Science", school: "BZU Multan", date: "2021 – 2025" },
        { degree: "Intermediate (ICS)", school: "DG Khan Board", date: "2019 – 2021" }
    ],
    languages: ["English (Professional)", "Urdu (Native)"]
};

let currentData = JSON.parse(localStorage.getItem('cv_data')) || defaultData;

function renderCV() {
    const data = currentData;

    // Personal Info
    document.querySelector('.name').innerHTML = `${data.personal.firstName} <span class="accent">${data.personal.lastName}</span>`;
    document.querySelector('.role').textContent = data.personal.role;

    const contactInfo = document.querySelector('.contact-info');
    contactInfo.innerHTML = `
        <span><i class="fas fa-map-marker-alt"></i> <span>${data.personal.location}</span></span>
        <span><i class="fas fa-phone"></i> <span>${data.personal.phone}</span></span>
        <span><i class="fas fa-envelope"></i> <span>${data.personal.email}</span></span>
    `;

    const socialLinks = document.querySelector('.social-links');
    socialLinks.innerHTML = `
        <a href="${data.personal.portfolio}" target="_blank"><i class="fas fa-globe"></i> Portfolio</a>
        <a href="${data.personal.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        <a href="${data.personal.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
    `;

    // Summary
    document.querySelector('.summary p').innerHTML = data.summary;

    // Experience
    const expContainer = document.querySelector('.experience');
    expContainer.innerHTML = '<h3 class="section-title">Professional Experience</h3>';
    data.experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'exp-item';
        item.innerHTML = `
            <div class="exp-header">
                <h4 class="job-title">${exp.title}</h4>
                <span class="company">${exp.company}</span>
                <span class="date">${exp.date}</span>
            </div>
            <ul class="exp-list">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;
        expContainer.appendChild(item);
    });

    // Projects
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = '<h3 class="section-title">Selected Projects</h3>';
    data.projects.forEach(p => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <h4 class="project-name">${p.name}</h4>
            <p>${p.description}</p>
        `;
        projectsContainer.appendChild(item);
    });

    // Skills
    const skillsContainer = document.querySelector('.skills');
    skillsContainer.innerHTML = '<h3 class="section-title">Technical Skills</h3>';
    Object.keys(data.skills).forEach(category => {
        const group = document.createElement('div');
        group.className = 'skill-group';
        group.innerHTML = `
            <h5>${category.charAt(0).toUpperCase() + category.slice(1)}</h5>
            <div class="skill-tags">
                ${data.skills[category].map(s => `<span>${s}</span>`).join('')}
            </div>
        `;
        skillsContainer.appendChild(group);
    });

    // Education
    const eduContainer = document.querySelector('.education');
    eduContainer.innerHTML = '<h3 class="section-title">Education</h3>';
    data.education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'edu-item';
        item.innerHTML = `
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-school">${edu.school}</div>
            <div class="edu-date">${edu.date}</div>
        `;
        eduContainer.appendChild(item);
    });

    // Languages
    const langContainer = document.querySelector('.languages');
    langContainer.innerHTML = '<h3 class="section-title">Languages</h3>';
    langContainer.innerHTML += `<p>${data.languages.map(l => `<strong>${l.split(' ')[0]}</strong> ${l.split(' ').slice(1).join(' ')}`).join('<br>')}</p>`;
}

function parsePastedText(text) {
    console.log("Parsing text...");
    // Simple heuristic parser
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const newData = JSON.parse(JSON.stringify(defaultData)); // Clone

    // Basic extraction - Name (usually first line)
    if (lines[0]) {
        const nameParts = lines[0].split(' ');
        if (nameParts.length >= 2) {
            newData.personal.firstName = nameParts[0].toUpperCase();
            newData.personal.lastName = nameParts.slice(1).join(' ').toUpperCase();
        }
    }

    // Attempt to find email and phone
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)?.forEach(e => newData.personal.email = e);
    text.match(/\+?\d[\d\s-]{8,}\d/g)?.forEach(p => newData.personal.phone = p);

    // This is where a real LLM would shine, but we'll use blocks for now
    // For now, let's just show the user a JSON editor if parsing is too complex
    // Or just let them edit the "sheet"

    currentData = newData;
    saveData();
    renderCV();
}

function saveData() {
    localStorage.setItem('cv_data', JSON.stringify(currentData));
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderCV();
    setupEditorUI();
});

function setupEditorUI() {
    const editorToggle = document.createElement('div');
    editorToggle.className = 'editor-controls no-print';
    editorToggle.innerHTML = `
        <button id="toggle-editor" class="btn-primary">
            <i class="fas fa-edit"></i> Open Smart Editor
        </button>
        <button id="download-pdf" class="btn-secondary">
            <i class="fas fa-download"></i> Download PDF
        </button>
    `;
    document.body.appendChild(editorToggle);

    const modal = document.createElement('div');
    modal.id = 'editor-modal';
    modal.className = 'modal no-print';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-magic"></i> AI Resume Architect</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="tabs">
                    <button class="tab-btn active" data-tab="paste">Magic Paste</button>
                    <button class="tab-btn" data-tab="sheet">Data Sheet</button>
                </div>
                
                <div id="paste-tab" class="tab-content active">
                    <p>Paste your existing CV text here. I'll automatically fill the fields.</p>
                    <textarea id="paste-area" placeholder="Paste your CV content here..."></textarea>
                    <button id="auto-fill-btn" class="btn-primary">Auto-Fill from Text</button>
                </div>

                <div id="sheet-tab" class="tab-content">
                    <div id="data-sheet-container" class="form-scroll">
                        <!-- Form fields will be dynamically generated here -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="save-form" class="btn-primary">Save & Close</button>
                <button id="reset-data" class="btn-danger">Reset to Default</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Event Listeners
    document.getElementById('toggle-editor').onclick = () => {
        modal.classList.add('show');
        renderForm();
    };

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => modal.classList.remove('show');
    });

    document.getElementById('auto-fill-btn').onclick = () => {
        const text = document.getElementById('paste-area').value;
        if (text) {
            parsePastedText(text);
            renderForm();
            alert("Magic Paste applied! Check the 'Data Sheet' to verify.");
        }
    };

    document.getElementById('save-form').onclick = () => {
        saveFormToData();
        saveData();
        renderCV();
        modal.classList.remove('show');
    };

    document.getElementById('reset-data').onclick = () => {
        if (confirm("Are you sure? This will delete all your input.")) {
            currentData = JSON.parse(JSON.stringify(defaultData));
            saveData();
            renderCV();
            renderForm();
        }
    };

    document.getElementById('download-pdf').onclick = () => {
        window.print();
    };

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        };
    });
}

function renderForm() {
    const container = document.getElementById('data-sheet-container');
    const data = currentData;

    let html = `
        <div class="form-section">
            <h4>Personal Info</h4>
            <div class="form-grid">
                <div class="form-group"><label>First Name</label><input type="text" id="field-firstName" value="${data.personal.firstName}"></div>
                <div class="form-group"><label>Last Name</label><input type="text" id="field-lastName" value="${data.personal.lastName}"></div>
                <div class="form-group"><label>Role</label><input type="text" id="field-role" value="${data.personal.role}"></div>
                <div class="form-group"><label>Email</label><input type="email" id="field-email" value="${data.personal.email}"></div>
                <div class="form-group"><label>Phone</label><input type="text" id="field-phone" value="${data.personal.phone}"></div>
                <div class="form-group"><label>Location</label><input type="text" id="field-location" value="${data.personal.location}"></div>
            </div>
        </div>
        
        <div class="form-section">
            <h4>Profile Summary</h4>
            <textarea id="field-summary" style="height: 100px;">${data.summary}</textarea>
        </div>

        <div class="form-section">
            <h4>Skills (Comma separated)</h4>
            <div class="form-grid">
                ${Object.keys(data.skills).map(cat => `
                    <div class="form-group">
                        <label>${cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                        <input type="text" id="skill-${cat}" value="${data.skills[cat].join(', ')}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function saveFormToData() {
    currentData.personal.firstName = document.getElementById('field-firstName').value;
    currentData.personal.lastName = document.getElementById('field-lastName').value;
    currentData.personal.role = document.getElementById('field-role').value;
    currentData.personal.email = document.getElementById('field-email').value;
    currentData.personal.phone = document.getElementById('field-phone').value;
    currentData.personal.location = document.getElementById('field-location').value;
    currentData.summary = document.getElementById('field-summary').value;

    Object.keys(currentData.skills).forEach(cat => {
        const val = document.getElementById(`skill-${cat}`).value;
        currentData.skills[cat] = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
    });
}
