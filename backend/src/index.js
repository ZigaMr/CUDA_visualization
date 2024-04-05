// backend/index.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/runPythonScript', (req, res) => {
  const { prompt } = req.body;

  exec(`poetry run python src/controllers/g4f_fetch_results.py ${prompt}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(error.message);
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send(stderr);
    }
    console.log(`Output: ${stdout}`);
    res.send(stdout);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
