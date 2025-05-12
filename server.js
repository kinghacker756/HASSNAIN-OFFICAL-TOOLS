const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Twilio configuration (replace with your credentials)
const accountSid = 'AC791bc3f8ade573f12109484458d0c167';
const authToken = 'curl 'https://api.twilio.com/2010-04-01/Accounts/ACc85bfbd29c0894c9db2c2961dca5626b/Messages.json' -X POST \
--data-urlencode 'To=+18777804236' \
--data-urlencode 'MessagingServiceSid=MGd0dbd062663e46861ac3fb50292e7bb3' \
--data-urlencode 'Body=Ahoy 👋' \
-u ACc85bfbd29c0894c9db2c2961dca5626b:[AuthToken]


';
const client = new twilio(accountSid, authToken);
const adminWhatsAppNumber = 'whatsapp:+923000783620'; // Your WhatsApp number

// User data storage (in production, use a database)
let users = [];

// API endpoint to handle user registration
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    // Add user to "database"
    users.push({ name, email, password });
    
    // Send WhatsApp notification to admin
    client.messages.create({
        body: `New user registered:\nName: ${name}\nEmail: ${email}`,
        from: 'whatsapp:+923000783620', // Twilio WhatsApp sandbox number
        to: adminWhatsAppNumber
    });
    
    res.json({ success: true });
});

// API endpoint to handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Send WhatsApp notification to admin
    client.messages.create({
        body: `User logged in:\nEmail: ${email}`,
        from: 'whatsapp:+923000783620',
        to: adminWhatsAppNumber
    });
    
    res.json({ success: true, user });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});