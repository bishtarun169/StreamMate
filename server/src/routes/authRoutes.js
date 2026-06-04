const express = require('express');

const router = express.Router();

const { 
     registerUser, 
     loginUser, 
     getCurrentUser, 
     updateUser, 
     deleteUser,
     verifyOTP,
     resendOTP,
     forgotPassword,
     resetPassword 
} = require('../controllers/authController');
const authMiddle = require('../middleware/authMiddleware');

// Authentication & Registration
router.post('/register', registerUser);
router.post('/login', loginUser);

// Verification (OTP)
router.post('/verify', verifyOTP);
router.post('/verify-otp', verifyOTP); // compat fallback
router.post('/resend-otp', resendOTP);

// Password Recovery
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// User Profile Actions
router.get('/me', authMiddle, getCurrentUser);
router.put('/update', authMiddle, updateUser);
router.delete('/delete', authMiddle, deleteUser);

module.exports = router;