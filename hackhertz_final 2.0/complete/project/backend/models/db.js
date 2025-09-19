 const db = require('../config/database');

// User model functions
exports.getUserByEmail = (email, callback) => {
  db.execute('SELECT * FROM users WHERE email = ?', [email], callback);
};

exports.createUser = (userData, callback) => {
  const { name, email, password, role, bio, skills } = userData;
  db.execute(
    'INSERT INTO users (name, email, password, role, bio, skills) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, password, role, bio, skills],
    callback
  );
};

exports.getUserById = (id, callback) => {
  db.execute('SELECT id, name, email, role, bio, skills, created_at FROM users WHERE id = ?', [id], callback);
};

exports.updateUser = (id, userData, callback) => {
  const { name, email, bio, skills } = userData;
  db.execute(
    'UPDATE users SET name = ?, email = ?, bio = ?, skills = ? WHERE id = ?',
    [name, email, bio, skills, id],
    callback
  );
};

exports.getAllStudents = (callback) => {
  db.execute('SELECT id, name, email, bio, skills, created_at, is_approved FROM users WHERE role = "student"', callback);
};

exports.approveStudent = (id, callback) => {
  db.execute('UPDATE users SET is_approved = TRUE WHERE id = ?', [id], callback);
};

exports.rejectStudent = (id, callback) => {
  db.execute('DELETE FROM users WHERE id = ?', [id], callback);
};

// Portfolio model functions
exports.getPortfoliosByStudentId = (studentId, callback) => {
  db.execute('SELECT * FROM portfolios WHERE student_id = ?', [studentId], callback);
};

exports.createPortfolio = (portfolioData, callback) => {
  const { student_id, title, content } = portfolioData;
  db.execute(
    'INSERT INTO portfolios (student_id, title, content) VALUES (?, ?, ?)',
    [student_id, title, content],
    callback
  );
};