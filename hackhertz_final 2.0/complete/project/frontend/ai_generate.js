document.addEventListener('DOMContentLoaded', () => {
  // 🔐 Login Form
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html';
    });
  }

  // 📝 Signup Form
  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html';
    });
  }

  // 🚫 Navigation Access Control
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

  // 🌗 Theme Toggling (Sun/Moon)
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
    themeToggle.classList.remove('fa-moon');
    themeToggle.classList.add('fa-sun');
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


 const chatMessages = document.getElementById("chatMessages");
    const suggestions = document.getElementById("suggestions");
    const chatInput = document.getElementById("chatInput");

    function addMessage(text, isBot) {
      const msg = document.createElement("div");
      msg.className = "message " + (isBot ? "bot" : "user");
      msg.innerHTML = `<div class="bubble">${text}</div>`;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function clearSuggestions() {
      suggestions.innerHTML = "";
    }

    function showSuggestions(options) {
      clearSuggestions();
      options.forEach(opt => {
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = opt.label;
        chip.onclick = () => opt.action();
        suggestions.appendChild(chip);
      });
      
      // Add back button
      const backBtn = document.createElement("button");
      backBtn.className = "back-button";
      backBtn.textContent = "← Back to Main";
      backBtn.onclick = () => showMainMenu();
      suggestions.appendChild(backBtn);
    }

    function showMainMenu() {
      clearSuggestions();
      addMessage("👋 Back to main menu. What do you need help with?", true);
      const mainChips = [
        {label: "📚 Study Help", action: () => handleMainChoice('study help')},
        {label: "💼 Portfolio Builder", action: () => handleMainChoice('portfolio')},
        {label: "✍️ Content Generator", action: () => handleMainChoice('content generator')},
        {label: "🤖 Smart Assistant", action: () => handleMainChoice('assistant')}
      ];
      mainChips.forEach(opt => {
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = opt.label;
        chip.onclick = () => opt.action();
        suggestions.appendChild(chip);
      });
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        addMessage("✅ Copied to clipboard!", true);
      });
    }

    function generateContent(type) {
      let content = "";
      let title = "";
      
      switch(type) {
        case 'about':
          title = "📝 About Section Sample";
          content = `I am a passionate and dedicated professional with a strong background in [Your Field]. With [X years] of experience in [specific areas], I have developed expertise in [key skills]. I am committed to continuous learning and growth, always seeking new challenges that allow me to apply my knowledge and contribute meaningfully to projects. My goal is to leverage my skills in [specific domain] to drive innovation and create impactful solutions.

🎯 Customize this by:
• Replace [Your Field] with your domain (e.g., Software Development, Marketing, etc.)
• Add your actual experience years
• Include your specific skills and achievements
• Mention your career goals and aspirations`;
          break;
          
        case 'objective':
          title = "🎯 Career Objective Samples";
          content = `For Freshers:
"To secure a challenging position in a dynamic organization where I can utilize my skills in [Your Field] and contribute to the company's growth while advancing my career."

For Experienced:
"Seeking a senior position in [Your Domain] where I can apply my [X years] of experience to lead projects, mentor teams, and drive strategic initiatives."

For Career Change:
"To transition into [New Field] by leveraging my transferable skills from [Previous Field] and passion for [New Domain] to contribute effectively to organizational success."`;
          break;
          
        case 'skills':
          title = "💡 Skills Section Ideas";
          content = `Technical Skills:
• Programming: Python, JavaScript, Java, C++
• Web Development: HTML, CSS, React, Node.js
• Database: MySQL, MongoDB, PostgreSQL
• Tools: Git, Docker, AWS, VS Code

Soft Skills:
• Communication & Leadership
• Problem Solving & Critical Thinking
• Team Collaboration & Project Management
• Time Management & Adaptability

Domain-Specific:
• Data Analysis & Visualization
• UI/UX Design & Prototyping
• Digital Marketing & SEO
• Financial Analysis & Reporting

🔧 Customize based on your field and experience level!`;
          break;
          
        case 'experience':
          title = "💼 Experience Section Template";
          content = `[Job Title] at [Company Name]
[Start Date] - [End Date/Present]

Key Responsibilities:
• [Specific task or responsibility #1]
• [Specific task or responsibility #2]
• [Specific task or responsibility #3]

Achievements:
• [Quantifiable achievement with numbers/percentages]
• [Recognition, awards, or special projects]
• [Impact you made on the team/company]

For Freshers - Include:
• Internships, part-time jobs, freelance work
• Academic projects with real-world applications
• Volunteer work and leadership roles
• Relevant coursework and certifications`;
          break;
          
        case 'projects':
          title = "🚀 Project Description Template";
          content = `Project Name: [Your Project Title]
Duration: [Start - End Date]
Technologies Used: [List of tools/languages]

Description:
[Brief overview of what the project does and its purpose]

Key Features:
• [Feature 1 with technical details]
• [Feature 2 with user impact]
• [Feature 3 with innovation aspects]

Challenges & Solutions:
• Challenge: [What problem you faced]
  Solution: [How you solved it]

Results/Impact:
• [Quantifiable results if available]
• [User feedback or adoption metrics]
• [What you learned from this project]

GitHub/Demo: [Links if available]`;
          break;
      }
      
      const messageContent = `${title}<div class="generated-content">${content.replace(/\n/g, '<br>')}<br><button class="copy-button" onclick="copyToClipboard(\`${content.replace(/`/g, '\\`')}\`)">📋 Copy Text</button></div>`;
      addMessage(messageContent, true);
    }

    function handleMainChoice(choice) {
      if (choice === "study help") {
        addMessage("📚 You chose Study Help. What do you need?", true);
        showSuggestions([
          {label: "Assignment Assistance", action: () => addMessage("✍️ I can guide you with assignments. Break them into smaller tasks, research thoroughly, and create an outline before writing.", true)},
          {label: "Study Schedule", action: () => addMessage("📅 Let's create a study timetable. Allocate time for each subject, include breaks, and review weekly. Use the 80/20 rule: focus 80% on weak areas.", true)},
          {label: "Exam Prep Tips", action: () => addMessage("📖 Exam Preparation Strategy:<br>• Review past papers & question patterns<br>• Create summary notes for quick revision<br>• Practice time management<br>• Focus on weak areas first<br>• Group study for discussion", true)},
          {label: "Research Help", action: () => addMessage("🔍 Research Strategy:<br>• Start with reliable sources (academic databases)<br>• Take organized notes with citations<br>• Create an outline before writing<br>• Use citation management tools<br>• Fact-check information", true)},
          {label: "Time Management", action: () => addMessage("⏰ Time Management Tips:<br>• Use Pomodoro: 25 min study + 5 min break<br>• Prioritize tasks using Eisenhower Matrix<br>• Set specific, achievable daily goals<br>• Eliminate distractions during study time<br>• Review and adjust your schedule weekly", true)}
        ]);
      }
      else if (choice === "portfolio") {
        addMessage("💼 You chose Portfolio Builder.", true);
        showSuggestions([
          {label: "Open Portfolio Page", action: () => window.open("generate.html", "_blank")},
          {label: "Portfolio Structure Guide", action: () => addMessage("📋 Essential Portfolio Sections:<br>• Header (Name, Contact, Professional Photo)<br>• About/Summary<br>• Skills<br>• Experience/Projects<br>• Education<br>• Certifications<br>• Contact Information<br><br>💡 Tip: Keep it clean, professional, and mobile-friendly!", true)},
          {label: "Resume Tips", action: () => addMessage("📄 Resume Best Practices:<br>• Keep it 1-2 pages maximum<br>• Use action verbs (achieved, developed, managed)<br>• Quantify achievements with numbers<br>• Tailor for each job application<br>• Use consistent formatting<br>• Proofread for errors<br>• Include relevant keywords from job description", true)},
          {label: "Portfolio Showcase Ideas", action: () => addMessage("🎨 Portfolio Showcase Tips:<br>• Include 3-5 best projects<br>• Show process, not just results<br>• Add live demos and GitHub links<br>• Use high-quality screenshots<br>• Explain your role and impact<br>• Include client/user testimonials<br>• Keep loading time minimal", true)}
        ]);
      }
      else if (choice === "content generator") {
        addMessage("✍️ Content Generator - Let me help you create professional content!", true);
        showSuggestions([
          {label: "About Section Generator", action: () => generateContent('about')},
          {label: "Career Objective Samples", action: () => generateContent('objective')},
          {label: "Skills Section Ideas", action: () => generateContent('skills')},
          {label: "Experience Template", action: () => generateContent('experience')},
          {label: "Project Description Template", action: () => generateContent('projects')},
          {label: "Cover Letter Tips", action: () => addMessage("📝 Cover Letter Structure:<br>• Header with your contact info<br>• Employer's details<br>• Professional greeting<br>• Opening: mention specific position<br>• Body: highlight relevant skills & achievements<br>• Closing: call to action<br>• Professional signature<br><br>💡 Tip: Customize for each application!", true)},
          {label: "LinkedIn Summary Help", action: () => addMessage("💼 LinkedIn Summary Tips:<br>• Start with a strong hook<br>• Mention your current role/goal<br>• Highlight key achievements<br>• Include relevant keywords<br>• Add personality and passion<br>• End with a call-to-action<br>• Use 1st person, conversational tone<br>• Keep it 3-4 short paragraphs", true)}
        ]);
      }
      else if (choice === "assistant") {
        addMessage("🤖 Smart Assistant features:", true);
        showSuggestions([
          {label: "Course Selection", action: () => addMessage("📘 Course Selection Guide:<br>• Align with career goals<br>• Check industry demand<br>• Consider prerequisites<br>• Look at job market trends<br>• Read course reviews<br>• Check instructor credentials<br>• Consider time commitment", true)},
          {label: "Internship Tips", action: () => addMessage("💡 Internship Success Strategy:<br>• Apply early (2-3 months ahead)<br>• Network with professionals<br>• Build relevant projects<br>• Prepare for technical interviews<br>• Follow up after applications<br>• Leverage college career services<br>• Consider remote opportunities", true)},
          {label: "Interview Preparation", action: () => addMessage("🎯 Interview Prep Checklist:<br>• Research the company thoroughly<br>• Practice common questions<br>• Prepare STAR method examples<br>• Have questions ready to ask<br>• Plan your outfit & route<br>• Bring extra copies of resume<br>• Practice good body language<br>• Follow up with thank-you email", true)},
          {label: "Networking Tips", action: () => addMessage("🤝 Networking Strategies:<br>• Attend industry events & meetups<br>• Join professional associations<br>• Connect on LinkedIn thoughtfully<br>• Offer value before asking for help<br>• Maintain existing connections<br>• Follow up consistently<br>• Be authentic and genuine", true)},
          {label: "Scholarships", action: () => addMessage("🎓 Scholarship Search Tips:<br>• Start early, apply to multiple<br>• Use scholarship search engines<br>• Check with your college/university<br>• Look for industry-specific awards<br>• Meet all eligibility requirements<br>• Write compelling essays<br>• Get strong recommendation letters", true)},
          {label: "Goal Setting", action: () => addMessage("🎯 SMART Goal Setting:<br>• Specific: Clear and well-defined<br>• Measurable: Track progress<br>• Achievable: Realistic and attainable<br>• Relevant: Aligned with bigger picture<br>• Time-bound: Set deadlines<br><br>💡 Break big goals into small milestones and celebrate progress!", true)}
        ]);
      }
    }

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage(text, false);
      chatInput.value = "";

      const msg = text.toLowerCase();
      if (msg.includes("study") || msg.includes("assignment") || msg.includes("exam")) {
        handleMainChoice("study help");
      }
      else if (msg.includes("portfolio") || msg.includes("resume")) {
        handleMainChoice("portfolio");
      }
      else if (msg.includes("content") || msg.includes("about") || msg.includes("generate")) {
        handleMainChoice("content generator");
      }
      else if (msg.includes("assistant") || msg.includes("help")) {
        handleMainChoice("assistant");
      }
      else if (msg.includes("hello") || msg.includes("hi")) {
        addMessage("👋 Hello! I'm here to help you with studies and portfolio building. Choose from the options above!", true);
      }
      else {
        addMessage("🤔 I understand you're looking for help. Try selecting one of the options above, or type keywords like 'study', 'portfolio', 'content', or 'assistant' to get started!", true);
      }
    }

    function handleKey(e) {
      if (e.key === "Enter") sendMessage();
    }

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