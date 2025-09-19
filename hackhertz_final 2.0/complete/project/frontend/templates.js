let currentTemplate = 'modern';
        let isEditorMode = false;
        let certificates = [];

        const templateConfig = {
            modern: {
                name: 'Modern Gradient',
                indicator: 'M',
                class: 'template-modern'
            },
            creative: {
                name: 'Creative Dynamic', 
                indicator: 'C',
                class: 'template-creative'
            },
            dark: {
                name: 'Dark Professional',
                indicator: 'D', 
                class: 'template-dark'
            },
            corporate: {
                name: 'Corporate Clean',
                indicator: 'B',
                class: 'template-corporate'
            }
        };

        // Theme Toggling (Sun/Moon)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    } else {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

            // Initialize preview
            updatePreview();
        

        function selectTemplate(template) {
            console.log('Template selected:', template);
            currentTemplate = template;
            
            document.querySelector('.bottom-bar').style.display = 'flex';

            const indicator = document.getElementById('template-indicator');
            const nameDisplay = document.getElementById('template-name-display');
            
            indicator.textContent = templateConfig[template].indicator;
            nameDisplay.textContent = templateConfig[template].name;
            
            document.getElementById('template-selection').style.display = 'none';
            document.getElementById('editor-screen').style.display = 'grid';
            
            isEditorMode = true;
            updatePreview();
            
            document.querySelectorAll('input, textarea').forEach(input => {
                input.removeEventListener('input', updatePreview);
                input.addEventListener('input', updatePreview);
            });
        }

        function goBackToSelection() {
            document.querySelector('.bottom-bar').style.display = 'none';
            document.getElementById('template-selection').style.display = 'block';
            document.getElementById('editor-screen').style.display = 'none';
            isEditorMode = false;
        }

        function updatePreview() {
            const name = document.getElementById('name').value;
            const title = document.getElementById('title').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const website = document.getElementById('website').value;
            const about = document.getElementById('about').value;

            let experienceHTML = '';
            document.querySelectorAll('#experience-container .experience-entry').forEach(entry => {
                const inputs = entry.querySelectorAll('input, textarea');
                if (inputs.length >= 4) {
                    const job = inputs[0].value;
                    const company = inputs[1].value;
                    const duration = inputs[2].value;
                    const desc = inputs[3].value;

                    experienceHTML += `
                        <div class="experience-card">
                            <div class="experience-title">${job}</div>
                            <div class="experience-company">${company}</div>
                            <div class="experience-duration">${duration}</div>
                            <div class="experience-description">${desc}</div>
                        </div>
                    `;
                }
            });

            let educationHTML = '';
            document.querySelectorAll('#education-container .education-entry').forEach(entry => {
                const inputs = entry.querySelectorAll('input');
                if (inputs.length >= 3) {
                    const degree = inputs[0].value;
                    const institution = inputs[1].value;
                    const year = inputs[2].value;

                    educationHTML += `
                        <div class="education-card">
                            <div class="education-degree">${degree}</div>
                            <div class="education-institution">${institution}</div>
                            <div class="education-year">${year}</div>
                        </div>
                    `;
                }
            });

            let skillsHTML = '';
            document.querySelectorAll('#skills-container input').forEach(input => {
                if (input.value.trim() !== '') {
                    skillsHTML += `<span class="skill-tag">${input.value}</span>`;
                }
            });

            let certificatesHTML = '';
            if (certificates.length > 0) {
                certificates.forEach(cert => {
                    certificatesHTML += `
                        <div class="certificate-display">
                            <img src="${cert.dataUrl}" alt="${cert.name}" style="max-width: 100%; height: auto; border-radius: 10px;">
                            <div class="certificate-name">${cert.name}</div>
                        </div>
                    `;
                });
            }

            const preview = document.getElementById('portfolio-preview');
            preview.className = templateConfig[currentTemplate].class;
            preview.innerHTML = `
                <div class="portfolio-name">${name}</div>
                <div class="portfolio-title">${title}</div>

                <div class="contact-grid">
                    <div class="contact-item">📧 ${email}</div>
                    <div class="contact-item">📱 ${phone}</div>
                    <div class="contact-item">📍 ${location}</div>
                    <div class="contact-item">🔗 ${website}</div>
                </div>

                <div class="section-heading">About Me</div>
                <p>${about}</p>

                <div class="section-heading">Experience</div>
                ${experienceHTML}

                <div class="section-heading">Education</div>
                ${educationHTML}

                <div class="section-heading">Skills</div>
                <div class="skills-container">
                    ${skillsHTML}
                </div>

                ${certificates.length > 0 ? `
                    <div class="section-heading">Certificates & Achievements</div>
                    <div class="certificates-grid">
                        ${certificatesHTML}
                    </div>
                ` : ''}
            `;
        }

        function addExperience() {
            const container = document.getElementById('experience-container');
            const div = document.createElement('div');
            div.className = 'entry-item experience-entry';
            div.innerHTML = `
                <input type="text" placeholder="Job Title" style="margin-bottom: 10px;">
                <input type="text" placeholder="Company" style="margin-bottom: 10px;">
                <input type="text" placeholder="Duration" style="margin-bottom: 10px;">
                <textarea placeholder="Job description" style="margin-bottom: 10px;"></textarea>
                <button type="button" class="remove-btn" onclick="removeExperience(this)">Remove</button>
            `;
            container.appendChild(div);
            
            div.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            updatePreview();
        }

        function removeExperience(btn) {
            btn.parentElement.remove();
            updatePreview();
        }

        function addEducation() {
            const container = document.getElementById('education-container');
            const div = document.createElement('div');
            div.className = 'entry-item education-entry';
            div.innerHTML = `
                <input type="text" placeholder="Degree" style="margin-bottom: 10px;">
                <input type="text" placeholder="Institution" style="margin-bottom: 10px;">
                <input type="text" placeholder="Year" style="margin-bottom: 10px;">
                <button type="button" class="remove-btn" onclick="removeEducation(this)">Remove</button>
            `;
            container.appendChild(div);
            
            div.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', updatePreview);
            });
            
            updatePreview();
        }

        function removeEducation(btn) {
            btn.parentElement.remove();
            updatePreview();
        }

        function addSkill() {
            const container = document.getElementById('skills-container');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Skill';
            input.style.marginBottom = '10px';
            input.addEventListener('input', updatePreview);
            container.appendChild(input);
            updatePreview();
        }

        function clearAllData() {
            if (confirm('Are you sure you want to clear all data?')) {
                document.getElementById('name').value = '';
                document.getElementById('title').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('location').value = '';
                document.getElementById('website').value = '';
                document.getElementById('about').value = '';
                
                document.getElementById('experience-container').innerHTML = '';
                document.getElementById('education-container').innerHTML = '';
                document.getElementById('skills-container').innerHTML = '';
                
                certificates = [];
                document.getElementById('certificate-preview').innerHTML = '';
                
                updatePreview();
            }
        }

        function handleFileUpload(event) {
            const files = event.target.files;
            processFiles(files);
        }

        function handleDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            processFiles(files);
            event.target.classList.remove('dragover');
        }

        function handleDragOver(event) {
            event.preventDefault();
            event.target.classList.add('dragover');
        }

        function handleDragLeave(event) {
            event.target.classList.remove('dragover');
        }

        function processFiles(files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                if (!file.type.startsWith('image/')) {
                    alert(`${file.name} is not an image file. Please upload only image files.`);
                    continue;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    const certificate = {
                        name: file.name.split('.')[0],
                        dataUrl: e.target.result
                    };
                    
                    certificates.push(certificate);
                    displayCertificatePreview(certificate, certificates.length - 1);
                    updatePreview();
                };
                reader.readAsDataURL(file);
            }
        }

        function displayCertificatePreview(certificate, index) {
            const previewContainer = document.getElementById('certificate-preview');
            
            const certificateItem = document.createElement('div');
            certificateItem.className = 'certificate-item';
            certificateItem.style.cssText = 'position: relative; display: inline-block; margin: 10px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;';
            certificateItem.innerHTML = `
                <img src="${certificate.dataUrl}" alt="${certificate.name}" style="width: 150px; height: 100px; object-fit: cover;">
                <button onclick="removeCertificate(${index})" style="position: absolute; top: 5px; right: 5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px;">×</button>
                <div style="padding: 8px; background: white; font-size: 12px; text-align: center;">${certificate.name}</div>
            `;
            
            previewContainer.appendChild(certificateItem);
        }

        function removeCertificate(index) {
            certificates.splice(index, 1);
            
            const previewContainer = document.getElementById('certificate-preview');
            previewContainer.innerHTML = '';
            
            certificates.forEach((cert, i) => {
                displayCertificatePreview(cert, i);
            });
            
            updatePreview();
        }

        function downloadPortfolio() {
            const element = document.getElementById("portfolio-preview");
            html2pdf().set({
                margin: 0.5,
                filename: 'MyPortfolio.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
        }

        function sharePortfolio() {
            const modal = document.getElementById("shareModal");
            const urlField = document.getElementById("portfolioUrl");
            const url = "https://yourportfolio.netlify.app";

            urlField.value = url;
            modal.style.display = "flex";
        }

        function copyUrl() {
            const input = document.getElementById("portfolioUrl");
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
            alert("📋 Link copied to clipboard!");
        }

        window.onclick = function(e) {
            const modal = document.getElementById("shareModal");
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
        // Navigation Logic
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html'; 
        });
    }

    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    const isLoggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedInStatus) {
        navLinks.forEach(link => {
            if (link.textContent.toLowerCase() !== 'home') {
                link.classList.add('disabled');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Please log in or sign up to access this page.');
                });
            }
        });
    }
