const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');
const { log } = require('console');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak?model=aura-luna-en";
// const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak?model=aura-luna-hi";

const DEEPGRAM_API_KEY = "6fa713b27411f9bef12b4aacf3f95f3f20e33304"; // Replace with your actual Deepgram API key

app.post('/answer', async (req, res) => {
  const { answer } = req.body;
  console.log(answer);
  if (!answer) {
    res.status(400).send('No answer provided.');
    return;
  }

  const payload = JSON.stringify({ text: answer });

  const requestConfig = {
    method: "POST",
    headers: {
      Authorization: `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const deepgramReq = https.request(DEEPGRAM_URL, requestConfig, (deepgramRes) => {
      res.setHeader('Content-Type', 'audio/mpeg');
      deepgramRes.pipe(res); // Stream Deepgram response to client
    });

    deepgramReq.on('error', (error) => {
      console.error('Deepgram request error:', error);
      res.status(500).send('Error generating audio.');
    });

    deepgramReq.write(payload);
    deepgramReq.end();
  } catch (error) {
    console.error('Error initiating Deepgram request:', error);
    res.status(500).send('Error generating audio.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
