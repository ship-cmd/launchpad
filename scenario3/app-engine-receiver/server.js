const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const client = new OAuth2Client();

app.use(express.static('public'));
app.use(express.json());

// Middleware to verify OIDC token from Cloud Run
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Missing Authorization header');
    
    const token = authHeader.split(' ')[1];
    try {
        // In a strict prod environment, you'd specify your expected audience (the Flex app URL)
        const ticket = await client.verifyIdToken({ idToken: token });
        req.user = ticket.getPayload();
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).send('Invalid token');
    }
}

// Secure Endpoint for the Simulator
app.post('/simulate', verifyToken, (req, res) => {
    // Random delay to simulate processing time for Cloud Trace visualization
    const delay = Math.floor(Math.random() * 200) + 50; 
    setTimeout(() => {
        res.status(200).json({ status: "success", processingTimeMs: delay });
    }, delay);
});

app.listen(port, () => console.log(`Receiver listening on port ${port}`));
