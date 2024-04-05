import React, { useState } from 'react';
import axios from 'axios';
import AlgorithmResults from './AlgorithmResults'; // Import AlgorithmResults component

const AlgorithmForm = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send request to backend
      const response = await axios.post('http://localhost:5000/runPythonScript', { prompt });
      // Update result state with response data
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors
    }
  };

  return (
    <div className="form-container">
      <h3>Enter your prompt:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
        />
        <button type="submit">Submit</button>
      </form>
      <AlgorithmResults result={result} /> {/* Pass result as prop to AlgorithmResults */}
    </div>
  );
};

export default AlgorithmForm;
