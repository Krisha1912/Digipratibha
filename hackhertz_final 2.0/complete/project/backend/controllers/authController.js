//  const bcrypt = require('bcrypt');
// const db = require('../models/db');

// exports.signup = (req, res) => {
//   const { name, email, password, role, bio, skills } = req.body;
  
//   // Check if user already exists
//   db.getUserByEmail(email, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }
    
//     if (results.length > 0) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
    
//     // Hash password
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error hashing password' });
//       }
      
//       // Create user
//       const userData = { name, email, password: hashedPassword, role, bio, skills };
//       db.createUser(userData, (err, results) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error creating user' });
//         }
        
//         res.status(201).json({ message: 'User created successfully' });
//       });
//     });
//   });
// };

// exports.login = (req, res) => {
//   const { email, password } = req.body;
  
//   // Find user by email
//   db.getUserByEmail(email, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }
    
//     if (results.length === 0) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
    
//     const user = results[0];
    
//     // Check password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error comparing passwords' });
//       }
      
//       if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//       }
      
//       // For institutes, check if approved
//       // if (user.role === 'institute' && !user.is_approved) {
//       //   return res.status(400).json({ error: 'Institute account pending approval' });
//       // }
      
//       // For students, check if approved (if needed)
//       // if (user.role === 'student' && !user.is_approved) {
//       //   return res.status(400).json({ error: 'Student account pending approval' });
//       // }
      
//       // Set session
//       req.session.user = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       };
      
//       res.json({ 
//         message: 'Login successful', 
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role
//         }
//       });
//     });
//   });
// };

// exports.logout = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error logging out' });
//     }
//     res.clearCookie('connect.sid');
//     res.json({ message: 'Logout successful' });
//   });
// };

const bcrypt = require('bcrypt');
const db = require('../models/db');

exports.signup = (req, res) => {
  const { name, email, password, role, bio, skills } = req.body;

  // Check if user already exists
  db.getUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }

      // Create user
      const userData = { name, email, password: hashedPassword, role, bio, skills };
      db.createUser(userData, (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error creating user' });
        }

        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  db.getUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // ✅ Removed pending approval checks (so no vanish issue)
      // If you want approval later, handle it differently.

      // ✅ Save user in session
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      // ✅ Explicitly save session before responding
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: 'Error saving session' });
        }

        res.json({
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      });
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};
