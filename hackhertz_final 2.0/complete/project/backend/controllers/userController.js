 const db = require('../models/db');

exports.updateProfile = (req, res) => {
  const userId = req.session.user.id;
  const { name, email, bio, skills } = req.body;
  
  db.updateUser(userId, { name, email, bio, skills }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ message: 'Profile updated successfully' });
  });
};

exports.approveStudent = (req, res) => {
  const { studentId } = req.params;
  
  db.approveStudent(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ message: 'Student approved successfully' });
  });
};

exports.rejectStudent = (req, res) => {
  const { studentId } = req.params;
  
  db.rejectStudent(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ message: 'Student rejected successfully' });
  });
};

exports.createPortfolio = (req, res) => {
  const studentId = req.session.user.id;
  const { title, content } = req.body;
  
  db.createPortfolio({ student_id: studentId, title, content }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ message: 'Portfolio created successfully' });
  });
};