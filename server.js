const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Enhanced CORS configuration for mobile compatibility
app.use(cors({
    origin: [
        'https://deep-ol-clean.web.app',
        'https://deep-ol-clean.firebaseapp.com',
        'https://deepolclean.com',
        'https://www.deepolclean.com',
        'http://localhost:3000',
        'http://localhost:5000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Add explicit OPTIONS handling for preflight requests
app.options('*', cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Gmail configuration with your app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'Deepolclean@gmail.com',
        pass: process.env.GMAIL_PASS || 'itbu hfkd ssod iyjn'
    }
});

// Test the connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Gmail SMTP server is ready to send emails');
    }
});

// Route to handle quote requests
app.post('/send-quote', async (req, res) => {
    console.log('Received quote request from:', req.ip);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    
    try {
        const {
            name,
            email,
            mobile,
            address,
            serviceType,
            propertySize,
            description,
            urgency
        } = req.body;

        // Validate required fields
        if (!name || !email || !mobile || !description) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Email to business owner
        const businessEmailOptions = {
            from: 'Deepolclean@gmail.com',
            to: 'Deepolclean@gmail.com',
            subject: `New Quote Request from ${name}`,
            html: `
                <h2>New Quote Request - Deep Ol Clean</h2>
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h3>Customer Information:</h3>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Mobile:</strong> ${mobile}</li>
                        <li><strong>Address:</strong> ${address || 'Not provided'}</li>
                        <li><strong>Service Type:</strong> ${serviceType || 'Not specified'}</li>
                        <li><strong>Property Size:</strong> ${propertySize || 'Not specified'}</li>
                        <li><strong>Urgency:</strong> ${urgency || 'Not specified'}</li>
                    </ul>
                    
                    <h3>Service Description:</h3>
                    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                        ${description}
                    </p>
                    
                    <hr>
                    <p><em>Please respond to the customer promptly!</em></p>
                </div>
            `
        };

        // Confirmation email to customer
        const customerEmailOptions = {
            from: 'Deepolclean@gmail.com',
            to: email,
            subject: 'Quote Request Received - Deep Ol Clean',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2>Thank you for your quote request!</h2>
                    <p>Dear ${name},</p>
                    
                    <p>We have received your quote request for <strong>${serviceType || 'cleaning services'}</strong> and will get back to you within 24 hours.</p>
                    
                    <h3>Your Request Details:</h3>
                    <ul>
                        <li><strong>Service Type:</strong> ${serviceType || 'Not specified'}</li>
                        <li><strong>Property Size:</strong> ${propertySize || 'Not specified'}</li>
                        <li><strong>Address:</strong> ${address || 'Not provided'}</li>
                        <li><strong>Urgency:</strong> ${urgency || 'Not specified'}</li>
                    </ul>
                    
                    <p><strong>Description:</strong> ${description}</p>
                    
                    <hr>
                    <p>If you have any urgent questions, please call us at <strong>(972) 672-8291</strong></p>
                    
                    <p>Best regards,<br>
                    Deep Ol Clean Team<br>
                    Deepolclean@gmail.com</p>
                </div>
            `
        };

        // Send emails
        await transporter.sendMail(businessEmailOptions);
        await transporter.sendMail(customerEmailOptions);

        res.json({
            success: true,
            message: 'Quote request sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        
        // Send more detailed error response
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Deep Ol Clean email server running on port ${PORT}`);
});

module.exports = app;