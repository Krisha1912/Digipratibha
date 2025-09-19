 // General utility functions
function togglePasswordVisibility(inputId, toggleId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  
  toggle.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = 'Hide';
    } else {
      input.type = 'password';
      toggle.textContent = 'Show';
    }
  });
}

// Initialize password toggles
document.addEventListener('DOMContentLoaded', () => {
  togglePasswordVisibility('password', 'togglePassword');
  togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
});