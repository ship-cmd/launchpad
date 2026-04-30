const express = require('express');
const fetch = require('node-fetch');
const { GoogleAuth } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 8080;
const auth = new GoogleAuth();

let simulationInterval = null;
let isRunning = false;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/start', async (req, res) => {
    if (isRunning) return res.status(400).send('Simulation already running.');
    
    const { rps, duration, targetUrl } = req.body;
    isRunning = true;
    
    const endTime = Date.now() + (duration * 1000);
    const intervalMs = 1000 / rps;

    // Fetch the target audience for the OIDC token
    const client = await auth.getIdTokenClient(targetUrl);

    console.log(`Starting simulation: ${rps} RPS for ${duration}s targeting ${targetUrl}`);

    simulationInterval = setInterval(async () => {
        if (Date.now() > endTime) {
            clearInterval(simulationInterval);
            isRunning = false;
            console.log('Simulation complete.');
            return;
        }

        try {
            // Send request with auto-injected OIDC token and Trace headers
            await client.request({
                url: `${targetUrl}/simulate`,
                method: 'POST'
            });
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    }, intervalMs);

    res.json({ status: 'started' });
});

app.post('/api/stop', (req, res) => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        isRunning = false;
    }
    res.json({ status: 'stopped' });
});

app.get('/api/status', (req, res) => {
    res.json({ isRunning });
});

app.listen(port, () => console.log(`Simulator listening on port ${port}`));
