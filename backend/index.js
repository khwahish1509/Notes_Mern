require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString)

const User = require('./models/user.model');
const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities'); // Import the authenticateToken function

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

// Routes
app.get('/', (req, res) => {
    res.json({data: 'Hello World'});

});

// Create a new user account
app.post('/create-account', async (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({message: 'fullName is required'});
    }

    if (!email) {
        return res
            .status(400)
            .json({message: 'email is required'});
    }

    if (!password) {
        return res
            .status(400)
            .json({message: 'password is required'});
    }

    const isUser = await User.findOne({email: email});
    
    if (isUser) {
        return res.json({
            error: true,
            message: 'User already exists',
        });
    }
    // Create a new user
    const user = new User({
        fullName,
        email,
        password,
    });
    // Save the user
    await user.save();
    // Generate an access token
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '300000m'
    });

    // Respond with the user details and access token
    return res.json({
        error: false,
        user,
        accessToken,
        message: 'User Registered Successfully',
    }); 
});

// Log in a user
app.post('/login', async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({message: 'email is required'});
    }

    if (!password) {
        return res
            .status(400)
            .json({message: 'password is required'});
    }
    // Find the user with the provided email
    const userInfo = await User.findOne({email: email});
    // If the user is not found, return an error
    if (!userInfo) {
        return res.status(400).json({
            message: 'User not found'
        });
    }
    // If the user is found, compare the password
    if (userInfo.email == email && userInfo.password == password) {
        // Generate an access token for the user as the user is found
        // we generate an access token as it is required for the user to access protected routes
        const user ={user: userInfo};
        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '300000m'
        });
        // Respond with the user details and access token
        return res.json({
            error: false,
            email,
            accessToken,
            message: 'User LogIn Successfully',
        });
        // If the password is incorrect, return an error
    }else{
        return res.status(400).json({
            error: true,
            message: 'Invalid Credentials'
        });
    }
});



app.listen(8000);

module.exports = app;