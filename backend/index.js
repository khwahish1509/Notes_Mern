require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString)

const User = require('./models/user.model');
const Note = require('./models/note.model')

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

app.post('/add-note', authenticateToken, async (req, res)=>{
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!user || !user._id) {
        return res.status(400).json({ error: true, message: 'User ID is missing or invalid' });
    }

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const note = new Note({
            title,
            content,
            tags,
            userId: user._id,
        });

        await note.save();
        return res.json({ 
            error: false,
            note,
            message: 'Note added successfully' 
        });
    } catch (error) {
        console.error('Error adding note:', error.message); // Log the error message
        console.error(error.stack); // Log the stack trace for more details

        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
            details: error.message, // Include the error message in the response
        });
    }
});

app.put('/edit-note/:noteId', authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId; // Note ID
    const { title, content, tags, isPinned } = req.body; // User data
    const { user } = req.user; // User

    if(!title && !content && !tags) {
        return res
            .status(400)
            .json({ message: 'No Changes Provided' });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id  });        
        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note not found" });

        }
        
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;
        
        await note.save();
        
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }catch (error){
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
    
});

app.get('/get-all-notes/', authenticateToken, async (req, res)=>{
    const { user } = req.user;
     try {
         const notes = await Note.find({ userId: user._id })
            .sort({ isPinned: -1 });

         return res.json({
             error: false,
             notes,
             message: "Notes fetched successfully",
         });
     } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
     }
});

app.delete('/delete-note/:noteId', authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note not found" });
        }
        
        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    }catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
});

app.put('/update-note-pinned/:noteId', authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId; // Note ID
    const { isPinned } = req.body; // User data
    const { user } = req.user; // User

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id  });        
        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note not found" });

        }

        if (isPinned) note.isPinned = isPinned || false;
        
        await note.save();
        
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }catch (error){
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
    
});

app.listen(8000);

module.exports = app;