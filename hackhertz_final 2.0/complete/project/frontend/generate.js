
        // Store uploaded images
        let certificateImages = [];

        // Handle file upload
        document.getElementById('certificateImages').addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            const previewDiv = document.getElementById('imagePreview');
            
            files.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imageData = e.target.result;
                        certificateImages.push(imageData);
                        
                        // Create preview element
                        const previewItem = document.createElement('div');
                        previewItem.className = 'certificate-preview';
                        previewItem.innerHTML = `
                            <img src="${imageData}" alt="Certificate ${certificateImages.length}">
                            <button class="remove-image" onclick="removeImage(${certificateImages.length - 1})">Remove</button>
                        `;
                        previewDiv.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Remove image function
        function removeImage(index) {
            certificateImages.splice(index, 1);
            updateImagePreview();
        }

        // Update image preview
        function updateImagePreview() {
            const previewDiv = document.getElementById('imagePreview');
            previewDiv.innerHTML = '';
            certificateImages.forEach((imageData, index) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'certificate-preview';
                previewItem.innerHTML = `
                    <img src="${imageData}" alt="Certificate ${index + 1}">
                    <button class="remove-image" onclick="removeImage(${index})">Remove</button>
                `;
                previewDiv.appendChild(previewItem);
            });
        }

        function generatePortfolio() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const about = document.getElementById("about").value;
            const skills = document.getElementById("skills").value.split(",");
            const template = document.getElementById("template").value;

            const resume = document.getElementById("resume").value;
            const bio = document.getElementById("bio").value;
            const certificate = document.getElementById("certificate").value;
            const education = document.getElementById("education").value;
            const projects = document.getElementById("projects").value;
            const experience = document.getElementById("experience").value;
            const contact = document.getElementById("contact").value;
            const hobbies = document.getElementById("hobbies").value;

            let skillsList = "<ul>";
            skills.forEach(skill => {
                if (skill.trim()) skillsList += `<li>${skill.trim()}</li>`;
            });
            skillsList += "</ul>";

            // Generate certificate section with images
            let certificateSection = '';
            if (certificate || certificateImages.length > 0) {
                certificateSection = '<h2>Certificate</h2>';
                if (certificate) {
                    certificateSection += `<p>${certificate}</p>`;
                }
                if (certificateImages.length > 0) {
                    certificateSection += '<div class="certificate-display">';
                    certificateImages.forEach((imageData, index) => {
                        certificateSection += `<img src="${imageData}" alt="Certificate ${index + 1}">`;
                    });
                    certificateSection += '</div>';
                }
            }

            const portfolioHTML = `
                <div class="portfolio ${template}">
                    <h1>${name}</h1>
                    <p><b>Email:</b> ${email}</p>
                    <h2>About Me</h2>
                    <p>${about}</p>
                    <h2>Skills</h2>
                    ${skillsList}
                    ${resume ? `<h2>Resume</h2><p>${resume}</p>` : ""}
                    ${bio ? `<h2>Bio</h2><p>${bio}</p>` : ""}
                    ${certificateSection}
                    ${education ? `<h2>Education</h2><p>${education}</p>` : ""}
                    ${projects ? `<h2>Projects</h2><p>${projects}</p>` : ""}
                    ${experience ? `<h2>Experience / Fresher</h2><p>${experience}</p>` : ""}
                    ${contact ? `<h2>Contact</h2><p>${contact}</p>` : ""}
                    ${hobbies ? `<h2>Hobbies</h2><p>${hobbies}</p>` : ""}
                </div>
            `;

            document.getElementById("portfolioOutput").innerHTML = portfolioHTML;
        }

        function downloadHTML() {
            const content = document.getElementById("portfolioOutput").innerHTML;
            const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .modern { background: #e3f2fd; color: #0d47a1; font-family: 'Segoe UI', sans-serif; }
        .classic { background: #fffaf0; color: #3e2723; font-family: 'Times New Roman', serif; border: 2px solid #8d6e63; }
        .minimal { background: #ffffff; color: #212121; font-family: Arial, sans-serif; border-left: 5px solid #9e9e9e; }
        .portfolio { padding: 20px; border-radius: 8px; }
        .certificate-display img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); margin: 10px 0; }
        ul { padding-left: 20px; }
        li { margin: 5px 0; }
    </style>
</head>
<body>${content}</body>
</html>`;
            
            const blob = new Blob([fullHTML], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "portfolio.html";
            link.click();
        }

        function downloadPDF() {
            const element = document.getElementById("portfolioOutput");
            const opt = {
                margin: 1,
                filename: 'portfolio.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }

        function shareLink() {
            const content = document.getElementById("portfolioOutput").innerHTML;
            const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .modern { background: #e3f2fd; color: #0d47a1; font-family: 'Segoe UI', sans-serif; }
        .classic { background: #fffaf0; color: #3e2723; font-family: 'Times New Roman', serif; border: 2px solid #8d6e63; }
        .minimal { background: #ffffff; color: #212121; font-family: Arial, sans-serif; border-left: 5px solid #9e9e9e; }
        .portfolio { padding: 20px; border-radius: 8px; }
        .certificate-display img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); margin: 10px 0; }
        ul { padding-left: 20px; }
        li { margin: 5px 0; }
    </style>
</head>
<body>${content}</body>
</html>`;
            
            const blob = new Blob([fullHTML], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            prompt("Here is your sharable link (valid until page refresh):", url);
        }

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
