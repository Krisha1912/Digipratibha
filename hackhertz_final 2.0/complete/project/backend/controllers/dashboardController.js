 const db = require('../models/db');

exports.getStudentDashboard = (req, res) => {
  const userId = req.session.user.id;
  
  // Get user details
  db.getUserById(userId, (err, userResults) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResults[0];
    
    // Get user's portfolios
    db.getPortfoliosByStudentId(userId, (err, portfolioResults) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        user: user,
        portfolios: portfolioResults
      });
    });
  });
};

exports.getInstituteDashboard = (req, res) => {
  // Get all students
  db.getAllStudents((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    const totalStudents = results.length;
    const approvedStudents = results.filter(student => student.is_approved).length;
    
    res.json({
      students: results,
      stats: {
        totalStudents,
        approvedStudents
      }
    });
  });
};