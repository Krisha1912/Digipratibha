 // Global variables
let userData = null;
let dashboardData = null;

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in
  try {
    const response = await fetch('/dashboard/student');
    
    if (response.ok) {
      dashboardData = await response.json();
      userData = dashboardData.user;
      initializeStudentDashboard();
    } else {
      // Try institute dashboard
      const instituteResponse = await fetch('/dashboard/institute');
      
      if (instituteResponse.ok) {
        dashboardData = await instituteResponse.json();
        initializeInstituteDashboard();
      } else {
        window.location.href = '/login.html';
      }
    }
  } catch (error) {
    window.location.href = '/login.html';
  }
  
  // Set up event listeners
  setupEventListeners();
});

// Initialize student dashboard
function initializeStudentDashboard() {
  if (!userData) return;
  
  // Display user info
  document.getElementById('userName').textContent = userData.name;
  document.getElementById('userEmail').textContent = userData.email;
  
  // Display profile data
  document.getElementById('profileName').value = userData.name;
  document.getElementById('profileEmail').value = userData.email;
  document.getElementById('profileBio').value = userData.bio || '';
  document.getElementById('profileSkills').value = userData.skills || '';
  
  // Display portfolios
  displayPortfolios();
  
  // Show dashboard section
  showSection('dashboard');
}

// Initialize institute dashboard
function initializeInstituteDashboard() {
  // Display user info
  document.getElementById('userName').textContent = 'Institute User';
  document.getElementById('userEmail').textContent = 'institute@example.com';
  
  // Display students and stats
  displayStudents();
  displayStats();
  
  // Show dashboard section
  showSection('dashboard');
}

// Display portfolios for student
function displayPortfolios() {
  const portfolioList = document.getElementById('portfolioList');
  
  if (!dashboardData.portfolios || dashboardData.portfolios.length === 0) {
    portfolioList.innerHTML = '<p>No portfolios yet. Upload your first portfolio!</p>';
    return;
  }
  
  portfolioList.innerHTML = dashboardData.portfolios.map(portfolio => `
    <div class="portfolio-item">
      <h4>${portfolio.title}</h4>
      <p>${portfolio.content}</p>
      <small>Created: ${new Date(portfolio.created_at).toLocaleDateString()}</small>
    </div>
  `).join('');
}

// Display students for institute
function displayStudents() {
  const studentsList = document.getElementById('studentsList');
  
  if (!dashboardData.students || dashboardData.students.length === 0) {
    studentsList.innerHTML = '<p>No students registered yet.</p>';
    return;
  }
  
  studentsList.innerHTML = dashboardData.students.map(student => `
    <div class="student-card">
      <h4>${student.name} <span class="badge ${student.is_approved ? 'badge-success' : 'badge-warning'}">${student.is_approved ? 'Approved' : 'Pending'}</span></h4>
      <p>Email: ${student.email}</p>
      <p>Skills: ${student.skills || 'Not specified'}</p>
      <p>Joined: ${new Date(student.created_at).toLocaleDateString()}</p>
      <div class="student-actions">
        ${!student.is_approved ? `
          <button class="btn btn-success btn-sm" onclick="approveStudent(${student.id})">Approve</button>
          <button class="btn btn-danger btn-sm" onclick="rejectStudent(${student.id})">Reject</button>
        ` : ''}
        <button class="btn btn-secondary btn-sm" onclick="viewPortfolio(${student.id})">View Portfolio</button>
      </div>
    </div>
  `).join('');
}

// Display stats for institute
function displayStats() {
  document.getElementById('totalStudents').textContent = dashboardData.stats.totalStudents;
  document.getElementById('approvedStudents').textContent = dashboardData.stats.approvedStudents;
}

// Set up event listeners
function setupEventListeners() {
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Profile form submission
  document.getElementById('profileForm')?.addEventListener('submit', updateProfile);
  
  // Portfolio form submission
  document.getElementById('portfolioForm')?.addEventListener('submit', uploadPortfolio);
  
  // PDF Export button
  document.getElementById('exportPdf')?.addEventListener('click', exportPdf);
}

// Show specific section
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Update profile
async function updateProfile(e) {
  e.preventDefault();
  
  const name = document.getElementById('profileName').value;
  const email = document.getElementById('profileEmail').value;
  const bio = document.getElementById('profileBio').value;
  const skills = document.getElementById('profileSkills').value;
  
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, bio, skills })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Profile updated successfully!');
      userData.name = name;
      userData.email = email;
      userData.bio = bio;
      userData.skills = skills;
      document.getElementById('userName').textContent = name;
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// Upload portfolio
async function uploadPortfolio(e) {
  e.preventDefault();
  
  const title = document.getElementById('portfolioTitle').value;
  const content = document.getElementById('portfolioContent').value;
  
  try {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Portfolio uploaded successfully!');
      document.getElementById('portfolioForm').reset();
      
      // Refresh portfolios
      const portfolioResponse = await fetch('/dashboard/student');
      if (portfolioResponse.ok) {
        dashboardData = await portfolioResponse.json();
        displayPortfolios();
      }
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// Approve student (for institute)
async function approveStudent(studentId) {
  try {
    const response = await fetch(`/api/approve-student/${studentId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Student approved successfully!');
      // Refresh students list
      const instituteResponse = await fetch('/dashboard/institute');
      if (instituteResponse.ok) {
        dashboardData = await instituteResponse.json();
        displayStudents();
        displayStats();
      }
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// Reject student (for institute)
async function rejectStudent(studentId) {
  if (!confirm('Are you sure you want to reject this student? This action cannot be undone.')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/reject-student/${studentId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Student rejected successfully!');
      // Refresh students list
      const instituteResponse = await fetch('/dashboard/institute');
      if (instituteResponse.ok) {
        dashboardData = await instituteResponse.json();
        displayStudents();
        displayStats();
      }
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// View portfolio (placeholder)
function viewPortfolio(studentId) {
  alert(`View portfolio for student ID: ${studentId}\n(This is a placeholder feature)`);
}

// Export PDF (placeholder)
function exportPdf() {
  alert('PDF export functionality would be implemented here.\n(This is a placeholder feature)');
}

// Logout
async function logout() {
  try {
    await fetch('/auth/logout');
    window.location.href = '/login.html';
  } catch (error) {
    window.location.href = '/login.html';
  }
}