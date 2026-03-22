const express = require('express');
const router = express.Router();

// Mock user data 
let users = [];

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    users.push({ username, password }); // In a real application, the password should be hashed
    res.status(201).json({ message: 'User registered successfully.' });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.status(200).json({ message: 'Login successful.' });
});

// Profile Management
router.get('/profile', (req, res) => {
    // Sample implementation: Returns the list of registered users for demo purposes
    res.status(200).json(users);
});

// Change Password
router.put('/change-password', (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = users.find(user => user.username === username && user.password === oldPassword);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    user.password = newPassword; // In a real application, the password should be hashed
    res.status(200).json({ message: 'Password changed successfully.' });
});

module.exports = router;