const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// 1. Registration API
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const user = {
        id: users.length + 1,
        username,
        password,
        email
    };

    users.push(user);

    res.json({
        message: 'User registered successfully',
        user
    });
});

// 2. Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.json({
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }
});

// 3. Search API
app.get('/search/:username', (req, res) => {
    const username = req.params.username;

    const user = users.find(u => u.username === username);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

// 4. Update Profile API
app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;

    const user = users.find(u => u.id === id);

    if (user) {
        user.email = email;
        res.json({
            message: 'Profile updated',
            user
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

// 5. Delete User API
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index !== -1) {
        users.splice(index, 1);

        res.json({
            message: 'User deleted'
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});