require('dotenv').config();

require('./tracing.js');

const express = require('express');
const toxicity = require('@tensorflow-models/toxicity');
const tf = require('@tensorflow/tfjs');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

const opentelemetry = require("@opentelemetry/api");

function handHostname(hostname) {
  let activeSpan = opentelemetry.trace.getActiveSpan();
  activeSpan.setAttribute("hostname_custom_attribute", hostname);
}

const tracer = opentelemetry.trace.getTracer("toxicity-api-tracer");


// Middleware to parse JSON bodies
app.use(express.json());

const authenticate = (req, res, next) => {
    const requestApiKey = req.header('x-api-key');
    if (!requestApiKey || requestApiKey !== apiKey) {
        return res.status(403).send('Forbidden: Invalid API Key!!!');
    }
    next();
};

app.post('/detect-toxicity', authenticate, async (req, res) => {
    const { sentences } = req.body;

    const hostname = req.hostname;

    tracer.startActiveSpan("hostname", (span) => {
        handHostname(hostname);
    span.end();
    });

    if (!sentences || !Array.isArray(sentences)) {
        return res.status(400).send('Invalid input');
    }

    try {
        const threshold = 0.7;
        const model = await toxicity.load(threshold);
        const predictions = await model.classify(sentences);

        res.json(predictions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error detecting toxicity');
    }
});

app.listen(port, () => {
    console.log(`Toxicity API listening at http://localhost:${port}`);
});

