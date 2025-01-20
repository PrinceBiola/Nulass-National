const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

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
    const { surname, name, email, password } = req.body;

    if (!surname || !name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        surname,
        name,
        email,
        password: hashedPassword,
    });

    // console.log("pass", hashedPassword)

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Hashed password:', user.password);
    console.log('Password to compare:', password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user });
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
router.use(authenticateJWT);
module.exports = router;

