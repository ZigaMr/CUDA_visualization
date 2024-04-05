import React from 'react';

const AlgorithmResults = ({ result }) => {
  return (
    <div className="results-container">
      <h3>Algorithm Results</h3>
      <div>
        <h3>Output:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default AlgorithmResults;
