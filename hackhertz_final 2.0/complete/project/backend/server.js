//  const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend')));

// // Session configuration
// app.use(session({
//   secret: process.env.SESSION_SECRET || '5ab1bd3d9b6fd045ec870b75f830d2ef0193188f958d09c15e2e3bb833bd9b3f',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true if using HTTPS
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// // Routes
// app.use('/auth', require('./routes/auth'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/api', require('./routes/users'));

// // Serve HTML pages
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/login.html'));
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/login.html'));
// });

// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/signup.html'));
// });

// app.get('/student-dashboard', (req, res) => {
//   if (req.session.user && req.session.user.role === 'student') {
//     res.sendFile(path.join(__dirname, '../frontend/student-dashboard.html'));
//   } else {
//     res.redirect('/unauthorized.html');
//   }
// });

// app.get('/institute-dashboard', (req, res) => {
//   if (req.session.user && req.session.user.role === 'institute') {
//     res.sendFile(path.join(__dirname, '../frontend/institute-dashboard.html'));
//   } else {
//     res.redirect('/unauthorized.html');
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ Middleware ------------------
// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// ------------------ Session ------------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// ------------------ Routes ------------------
// Auth routes
app.use('/auth', require('./routes/auth'));

// Dashboard routes
app.use('/dashboard', require('./routes/dashboard'));

// API routes
app.use('/api', require('./routes/users'));

// ------------------ Page routes ------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});

app.get('/student-dashboard', (req, res) => {
  if (req.session.user && req.session.user.role === 'student') {
    res.sendFile(path.join(__dirname, '../frontend/student-dashboard.html'));
  } else {
    res.redirect('/unauthorized.html');
  }
});

app.get('/institute-dashboard', (req, res) => {
  if (req.session.user && req.session.user.role === 'institute') {
    res.sendFile(path.join(__dirname, '../frontend/institute-dashboard.html'));
  } else {
    res.redirect('/unauthorized.html');
  }
});

// Fallback route for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
});

// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
