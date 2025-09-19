-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'institute') NOT NULL,
    bio TEXT,
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE
);

-- Create portfolios table
CREATE TABLE portfolios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO users (name, email, password, role, bio, skills, is_approved) VALUES
('John Student', 'john@example.com', '$2b$10$examplehashedpassword', 'student', 'Computer Science Student', 'JavaScript, Python, React', TRUE),
('Jane Institute', 'jane@example.com', '$2b$10$examplehashedpassword2', 'institute', 'Tech Institute Director', NULL, TRUE);

INSERT INTO portfolios (student_id, title, content) VALUES
(1, 'My First Project', 'This is a description of my first project'),
(1, 'Web Development Portfolio', 'A collection of my web development work');