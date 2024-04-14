// backend/index.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const { exec } = require('child_process');
const app = express();
const fs = require('fs').promises;
const path = require('path');


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
      // Split the stdout into lines
    const lines = stdout.split('\n');
    // Join the lines, skipping the first two lines
    const modifiedOutput = lines.slice(2).join('\n');
    console.log(`Output: ${modifiedOutput}`);
    res.send(modifiedOutput);
  });
});


// Function to create a file if it doesn't exist
const createFileIfNotExists = async (filePath) => {
  try {
    await fs.access(filePath);
  } catch (error) {
    // File doesn't exist, so create directory and file
    const directory = path.dirname(filePath);
    await fs.mkdir(directory, { recursive: true }); // Create directory recursively
    await fs.writeFile(filePath, '');
  }
};


// Endpoint to handle saving code based on language
app.post('/save/:language', async (req, res) => {
  const { language } = req.params;
  const { result } = req.body; // Assuming the result data is sent in the request body

  // Assuming you have some logic to determine file paths based on the language
  let filePath;
  switch(language) {
    case 'rust':
      filePath = 'rust/file.rs'; // Replace 'path/to/rust/file' with the actual path for Rust
      break;
    case 'cuda':
      filePath = 'cuda/file.cu'; // Replace 'path/to/cuda/file' with the actual path for CUDA
      break;
    case 'python':
      filePath = 'python/file.py'; // Replace 'path/to/python/file' with the actual path for Python
      break;
    case 'golang':
      filePath = 'golang/file.go'; // Replace 'path/to/golang/file' with the actual path for GoLang
      break;
    default:
      return res.status(400).json({ error: 'Invalid language' });
  }

  try {
    // Create the file if it doesn't exist
    await createFileIfNotExists(filePath);
    // Write the 'result' data to the file specified by 'filePath'
    await fs.writeFile(filePath, result);
    // Respond with success message
    res.status(200).json({ message: `Code saved successfully for ${language}` });
  } catch (error) {
    // Handle error, such as showing an error message or logging
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to save code' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
