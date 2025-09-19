 // Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Redirect based on role
      if (data.user.role === 'student') {
        window.location.href = '/student-dashboard';
      } else if (data.user.role === 'institute') {
        window.location.href = '/institute-dashboard.html';
      }
    } else {
      showError(data.error);
    }
  } catch (error) {
    showError('An error occurred. Please try again.');
  }
});

// Handle signup form submission
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const bio = document.getElementById('bio')?.value || '';
  const skills = document.getElementById('skills')?.value || '';
  
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role, bio, skills })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showSuccess('Account created successfully! Please login.');
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      showError(data.error);
    }
  } catch (error) {
    showError('An error occurred. Please try again.');
  }
});

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

// Toggle additional fields based on role
document.getElementById('role')?.addEventListener('change', function() {
  const studentFields = document.getElementById('studentFields');
  const instituteFields = document.getElementById('instituteFields');
  
  if (this.value === 'student') {
    studentFields.style.display = 'block';
    instituteFields.style.display = 'none';
  } else if (this.value === 'institute') {
    studentFields.style.display = 'none';
    instituteFields.style.display = 'block';
  } else {
    studentFields.style.display = 'none';
    instituteFields.style.display = 'none';
  }
});