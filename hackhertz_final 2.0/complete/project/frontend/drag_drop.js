 class EnhancedPortfolioBuilder {
            constructor() {
                this.dropZone = document.getElementById('dropZone');
                this.imageUpload = document.getElementById('imageUpload');
                this.certificateUpload = document.getElementById('certificateUpload');
                this.projectFileUpload = document.getElementById('projectFileUpload');
                this.currentImageTarget = null;
                this.currentCertificateTarget = null;
                this.currentProjectTarget = null;
                this.init();
            }

            init() {
                this.setupDraggableComponents();
                this.setupDropZone();
                this.makeSortable();
                this.setupImageUpload();
                this.setupProjectFileUpload();
            }

            setupDraggableComponents() {
                const components = document.querySelectorAll('.component-item');
                
                components.forEach(component => {
                    component.addEventListener('dragstart', (e) => {
                        component.classList.add('dragging');
                        e.dataTransfer.setData('text/plain', component.dataset.type);
                        e.dataTransfer.effectAllowed = 'copy';
                    });

                    component.addEventListener('dragend', () => {
                        component.classList.remove('dragging');
                    });
                });
            }

            setupDropZone() {
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    this.dropZone.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });

                this.dropZone.addEventListener('dragenter', () => {
                    this.dropZone.classList.add('drag-over');
                });

                this.dropZone.addEventListener('dragleave', (e) => {
                    if (!this.dropZone.contains(e.relatedTarget)) {
                        this.dropZone.classList.remove('drag-over');
                    }
                });

                this.dropZone.addEventListener('drop', (e) => {
                    this.dropZone.classList.remove('drag-over');
                    const componentType = e.dataTransfer.getData('text/plain');
                    if (componentType) {
                        this.addComponent(componentType);
                    }
                });
            }

            makeSortable() {
                new Sortable(this.dropZone, {
                    animation: 200,
                    ghostClass: 'sortable-ghost',
                    chosenClass: 'sortable-chosen',
                    dragClass: 'sortable-drag',
                    onStart: () => {
                        this.dropZone.classList.add('sorting');
                    },
                    onEnd: () => {
                        this.dropZone.classList.remove('sorting');
                        this.showNotification('Section reordered!');
                    }
                });
            }

            setupImageUpload() {
                this.imageUpload.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file && this.currentImageTarget) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (this.currentImageTarget.classList.contains('image-placeholder')) {
                                this.currentImageTarget.innerHTML = `<img src="${e.target.result}" class="profile-image" alt="Profile">`;
                                this.currentImageTarget.classList.remove('image-placeholder');
                            } else {
                                this.currentImageTarget.src = e.target.result;
                            }
                            this.showNotification('Image uploaded successfully!');
                        };
                        reader.readAsDataURL(file);
                    }
                });

                this.certificateUpload.addEventListener('change', (e) => {
                    const files = Array.from(e.target.files);
                    if (files.length && this.currentCertificateTarget) {
                        files.forEach(file => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                this.addCertificate(this.currentCertificateTarget, e.target.result, file.name);
                            };
                            reader.readAsDataURL(file);
                        });
                        this.showNotification(`${files.length} certificate(s) uploaded!`);
                    }
                });
            }

            setupProjectFileUpload() {
                this.projectFileUpload.addEventListener('change', (e) => {
                    const files = Array.from(e.target.files);
                    if (files.length && this.currentProjectTarget) {
                        files.forEach(file => {
                            this.addProjectFile(this.currentProjectTarget, file);
                        });
                        this.showNotification(`${files.length} project file(s) attached!`);
                    }
                });
            }

            addProjectFile(projectCard, file) {
                let filesContainer = projectCard.querySelector('.project-files');
                if (!filesContainer) {
                    filesContainer = document.createElement('div');
                    filesContainer.className = 'project-files';
                    filesContainer.style.cssText = `
                        margin-top: 15px;
                        padding-top: 15px;
                        border-top: 1px solid #e9ecef;
                    `;
                    
                    const filesTitle = document.createElement('h5');
                    filesTitle.textContent = 'Project Files:';
                    filesTitle.style.cssText = `
                        margin: 0 0 10px 0;
                        color: #2c3e50;
                        font-size: 14px;
                        font-weight: 600;
                    `;
                    filesContainer.appendChild(filesTitle);
                    
                    projectCard.appendChild(filesContainer);
                }

                const fileItem = document.createElement('div');
                fileItem.className = 'project-file-item';

                const fileIcon = this.getFileIcon(file.name);
                const fileName = file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name;
                const fileSize = this.formatFileSize(file.size);

                fileItem.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">${fileIcon}</span>
                        <div>
                            <div style="font-weight: 500; color: #2c3e50;">${fileName}</div>
                            <div style="color: #6c757d; font-size: 11px;">${fileSize}</div>
                        </div>
                    </div>
                    <button class="remove-file-btn" onclick="this.parentElement.remove()" title="Remove file">×</button>
                `;

                filesContainer.appendChild(fileItem);
            }

            getFileIcon(filename) {
                const ext = filename.split('.').pop().toLowerCase();
                const icons = {
                    'pdf': '📄', 'doc': '📝', 'docx': '📝', 'txt': '📄', 'md': '📄',
                    'zip': '🗜️', 'rar': '🗜️', 'js': '📜', 'html': '🌐', 'css': '🎨',
                    'py': '🐍', 'java': '☕', 'cpp': '⚙️', 'c': '⚙️', 'json': '📋', 'xml': '📋',
                    'ppt': '📊', 'pptx': '📊', 'xls': '📈', 'xlsx': '📈',
                    'png': '🖼️', 'jpg': '🖼️', 'jpeg': '🖼️', 'gif': '🖼️'
                };
                return icons[ext] || '📎';
            }

            formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }

            addComponent(type) {
                const emptyState = this.dropZone.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.remove();
                }

                const section = this.createSection(type);
                this.dropZone.appendChild(section);
                
                setTimeout(() => {
                    section.style.transition = 'all 0.3s ease';
                    section.style.transform = 'translateY(0)';
                    section.style.opacity = '1';
                }, 10);

                this.showNotification(`${type} section added!`);
            }

            createSection(type) {
                const section = document.createElement('div');
                section.className = 'portfolio-section';
                section.dataset.type = type;

                const controls = document.createElement('div');
                controls.className = 'section-controls';
                
                const editBtn = document.createElement('button');
                editBtn.className = 'control-btn edit';
                editBtn.innerHTML = '✏️';
                editBtn.title = 'Toggle edit mode';
                editBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleEditMode(section);
                };

                if (type === 'header' || type === 'certificates') {
                    const imageBtn = document.createElement('button');
                    imageBtn.className = 'control-btn image';
                    imageBtn.innerHTML = '🖼️';
                    imageBtn.title = 'Upload image';
                    imageBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.handleImageUpload(section, type);
                    };
                    controls.appendChild(imageBtn);
                }

                if (type === 'projects') {
                    const fileBtn = document.createElement('button');
                    fileBtn.className = 'control-btn file';
                    fileBtn.innerHTML = '📎';
                    fileBtn.title = 'Upload project files';
                    fileBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.handleProjectFileUpload(section);
                    };
                    controls.appendChild(fileBtn);
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'control-btn delete';
                deleteBtn.innerHTML = '×';
                deleteBtn.title = 'Delete section';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.deleteSection(section);
                };

                controls.appendChild(editBtn);
                controls.appendChild(deleteBtn);

                const content = this.generateSectionContent(type);
                section.innerHTML = content;
                section.appendChild(controls);

                this.makeContentEditable(section);

                return section;
            }

            handleProjectFileUpload(section) {
                const projectCards = section.querySelectorAll('.project-card');
                if (projectCards.length === 0) {
                    this.showNotification('Add a project first before uploading files!');
                    return;
                }
                
                this.currentProjectTarget = projectCards[0];
                this.projectFileUpload.click();
            }

            makeContentEditable(section) {
                const editableElements = section.querySelectorAll('h1, h2, h3, p, span:not(.remove-skill)');
                editableElements.forEach(el => {
                    if (!el.closest('.section-controls')) {
                        el.classList.add('editable');
                        el.addEventListener('dblclick', () => {
                            el.contentEditable = true;
                            el.focus();
                        });
                        el.addEventListener('blur', () => {
                            el.contentEditable = false;
                        });
                        el.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                el.blur();
                            }
                        });
                    }
                });
            }

            toggleEditMode(section) {
                const editables = section.querySelectorAll('.editable');
                const isEditing = section.dataset.editing === 'true';
                
                if (isEditing) {
                    editables.forEach(el => el.contentEditable = false);
                    section.dataset.editing = 'false';
                    this.showNotification('Edit mode disabled');
                } else {
                    editables.forEach(el => el.contentEditable = true);
                    section.dataset.editing = 'true';
                    this.showNotification('Edit mode enabled - click text to edit');
                }
            }

            handleImageUpload(section, type) {
                if (type === 'header') {
                    const imageElement = section.querySelector('.image-placeholder, .profile-image');
                    if (imageElement) {
                        this.currentImageTarget = imageElement;
                        this.imageUpload.click();
                    }
                } else if (type === 'certificates') {
                    this.currentCertificateTarget = section.querySelector('.certificate-grid');
                    this.certificateUpload.click();
                }
            }

            addCertificate(grid, imageSrc, filename) {
                const addBtn = grid.querySelector('.add-certificate');

                const certificateItem = document.createElement('div');
                certificateItem.className = 'certificate-item';
                certificateItem.innerHTML = `
                    <img src="${imageSrc}" alt="Certificate">
                    <h4 class="editable">${filename.split('.')[0]}</h4>
                    <p class="editable">Certificate description</p>
                    <button class="control-btn delete" style="position: absolute; top: 5px; right: 5px; opacity: 1;" onclick="this.parentElement.remove()">×</button>
                `;

                if (addBtn) addBtn.remove();

                grid.appendChild(certificateItem);
                this.makeContentEditable(certificateItem);
            }

            generateSectionContent(type) {
                const templates = {
                    header: `
                        <div class="header-section">
                            <div class="image-placeholder" title="Click to upload profile image">👤</div>
                            <h1 class="editable">Your Name</h1>
                            <p class="editable" style="font-size: 18px; margin-top: 10px; opacity: 0.9;">Your Professional Title</p>
                        </div>
                    `,
                    about: `
                        <div class="about-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">About Me</h2>
                            <p class="editable" style="line-height: 1.6; color: #34495e;">I'm a passionate professional dedicated to creating amazing experiences and solving complex problems. Write your compelling story here that showcases your personality and professional journey.</p>
                        </div>
                    `,
                    skills: `
                        <div class="skills-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">Skills</h2>
                            <div class="skills-grid">
                                <div class="skill-item">
                                    <span class="editable">JavaScript</span>
                                    <button class="remove-skill" onclick="this.parentElement.remove()">×</button>
                                </div>
                                <div class="skill-item">
                                    <span class="editable">React</span>
                                    <button class="remove-skill" onclick="this.parentElement.remove()">×</button>
                                </div>
                                <div class="skill-item">
                                    <span class="editable">Node.js</span>
                                    <button class="remove-skill" onclick="this.parentElement.remove()">×</button>
                                </div>
                                <button class="add-skill-btn" onclick="this.parentElement.appendChild(this.previousElementSibling.cloneNode(true))">+ Add Skill</button>
                            </div>
                        </div>
                    `,
                    projects: `
                        <div class="projects-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">Projects</h2>
                            <div class="projects-grid">
                                <div class="project-card">
                                    <h3 class="editable" style="color: #2c3e50; margin-bottom: 10px;">Awesome Project</h3>
                                    <p class="editable" style="color: #7f8c8d; margin-bottom: 15px;">Description of your amazing project and the impact it created.</p>
                                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                                        <span class="editable" style="background: #3498db; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">React</span>
                                        <span class="editable" style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Node.js</span>
                                    </div>
                                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                                         </div>
                                </div>
                            </div>
                        </div>
                    `,
                    certificates: `
                        <div class="certificates-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">Certificates</h2>
                            <div class="certificate-grid">
                                <div class="certificate-item add-certificate">
                                    📜<br>
                                    <span>Click image button to upload certificates</span>
                                </div>
                            </div>
                        </div>
                    `,
                    experience: `
                        <div class="experience-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">Experience</h2>
                            <div style="border-left: 3px solid #3498db; padding-left: 20px; margin-bottom: 20px;">
                                <h3 class="editable" style="color: #2c3e50;">Software Developer</h3>
                                <p class="editable" style="color: #3498db; font-weight: bold; margin: 5px 0;">Tech Company • 2023 - Present</p>
                                <p class="editable" style="color: #7f8c8d; line-height: 1.5;">Developed and maintained web applications, collaborated with cross-functional teams, and implemented new features that improved user experience by 40%.</p>
                            </div>
                        </div>
                    `,
                    education: `
                        <div class="education-section">
                            <h2 class="editable" style="color: #2c3e50; margin-bottom: 15px;">Education</h2>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #3498db;">
                                <h3 class="editable" style="color: #2c3e50;">Bachelor of Technology</h3>
                                <p class="editable" style="color: #3498db; font-weight: bold; margin: 8px 0;">University Name • 2020 - 2024</p>
                                <p class="editable" style="color: #7f8c8d;">Computer Science Engineering</p>
                            </div>
                        </div>
                    `,
                    contact: `
                        <div class="contact-section">
                            <h2 class="editable" style="margin-bottom: 20px;">Get In Touch</h2>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 10px;">📧</div>
                                    <strong>Email</strong><br>
                                    <span class="editable" style="opacity: 0.9;">your.email@example.com</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 10px;">📱</div>
                                    <strong>Phone</strong><br>
                                    <span class="editable" style="opacity: 0.9;">+91 12345 67890</span>
                                </div>
                            </div>
                        </div>
                    `
                };

                return templates[type] || `<div><h2>${type}</h2><p>Content for ${type} section</p></div>`;
            }

            deleteSection(section) {
                section.style.transform = 'translateX(-100px)';
                section.style.opacity = '0';
                
                setTimeout(() => {
                    section.remove();
                    
                    if (this.dropZone.children.length === 0) {
                        this.dropZone.innerHTML = `
                            <div class="empty-state">
                                <h2>🚀 Build Your Portfolio</h2>
                                <p>Drag components from the left sidebar to start building your portfolio</p>
                                <p style="margin-top: 10px; font-size: 14px; opacity: 0.7;">You can also reorder sections by dragging them up or down</p>
                            </div>
                        `;
                    }
                }, 300);

                this.showNotification('Section deleted');
            }

            showNotification(message) {
                const existing = document.querySelector('.notification');
                if (existing) existing.remove();

                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 6px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 1000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                `;
                notification.textContent = message;

                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 10);

                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => notification.remove(), 300);
                }, 2500);
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const portfolioBuilder = new EnhancedPortfolioBuilder();
            
            // Make removeProjectFile globally accessible
            window.removeProjectFile = function(removeBtn) {
                portfolioBuilder.removeProjectFile(removeBtn);
            };
            
            // PDF Export
            document.getElementById("downloadPDF").addEventListener("click", () => {
                const element = document.getElementById("dropZone");
                const controls = element.querySelectorAll(".section-controls, .control-btn");
                controls.forEach(c => c.style.display = "none");

                html2pdf().set({
                    margin: 0.5,
                    filename: 'MyPortfolio.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                }).from(element).save().then(() => {
                    controls.forEach(c => c.style.display = "");
                });
            });

            // Share Modal
            const shareBtn = document.getElementById("sharePortfolio");
            const modal = document.getElementById("shareModal");
            const closeBtn = modal.querySelector(".close");

            shareBtn.addEventListener("click", () => {
                const htmlContent = document.getElementById("dropZone").innerHTML;
                const blob = new Blob([htmlContent], { type: "text/html" });
                const url = URL.createObjectURL(blob);

                const urlField = document.getElementById("portfolioUrl");
                urlField.value = url;

                document.getElementById("linkedinShare").href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                document.getElementById("twitterShare").href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check%20out%20my%20portfolio!`;
                document.getElementById("facebookShare").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                document.getElementById("emailShare").href = `mailto:?subject=My%20Portfolio&body=${encodeURIComponent(url)}`;

                modal.style.display = "block";
            });

            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });

            window.onclick = (e) => {
                if (e.target === modal) modal.style.display = "none";
            };

            // Theme Toggle
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                body.classList.add('dark-mode');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
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
        });

        // Global function for copy URL
        window.copyUrl = function () {
            const input = document.getElementById("portfolioUrl");
            input.select();
            document.execCommand("copy");
            alert("📋 Link copied to clipboard!");
        };