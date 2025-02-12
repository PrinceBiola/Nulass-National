const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { sendWelcomeEmail, sendVerificationEmail } = require('../utils/email');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });


router.post('/register', async (req, res) => {
    try {
        const { email, password, surname, name } = req.body;
        console.log('Received register request:', { email, password, surname, name });
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            name,
            surname,
            email,
            password,
            role: 'member'
        });

        await user.save();
        console.log('User created successfully:', user);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
        sendWelcomeEmail(user.email, user.name);
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ error: error.message });
    }
});







router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'User doesnt exixt' 
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Login plain password:', password);
        console.log('Hashed password in DB:', user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }
        const token = generateToken(user);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        });

        console.log('Token generated:', token);
    } catch (error) {
        console.error('Login error:', error.message);

        res.status(500).json({ 
            success: false,
            message: 'Server error during login',
            error: error.message,
        });
    }
});





router.put('/profile', upload.single('profilePicture'), async (req, res) => {
    const { username } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    if (req.file) user.profilePicture = req.file.path;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
});

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    await sendVerificationEmail(email, otp);
    await transporter.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
});


router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
});

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


const generateToken = (user) => {
    const payload = {
        id: user._id,
        role: user.role,
        email: user.email
    };
    
    console.log('Generating token with payload:', {
        id: payload.id,
        role: payload.role,
        email: payload.email
    });
    
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};


// user managemebt


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.use(authenticateJWT);
module.exports = router;

