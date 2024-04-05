// import axios from 'axios';

const AlgorithmResults = ({ result }) => {

  const handleSave = async (language) => {
    try {
      // const response = await axios.post('http://localhost:5000/save/${language}', { result });
      const response = await fetch(`http://localhost:5000/save/${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result }), // Sending the 'result' data along with the language
      });

      // Handle response here, such as showing a success message or updating state
      const data = await response.json();
      console.log(data.message); // Logging the success message
    } catch (error) {
      // Handle error, such as showing an error message or logging
      console.error('Error:', error);
    }
  };

  return (
    <div className="results-container">
      <h3>Algorithm Results</h3>
      <button type="button" onClick={() => handleSave('rust')}>Save Code (Rust)</button>
      <button type="button" onClick={() => handleSave('cuda')}>Save Code (CUDA)</button>
      <button type="button" onClick={() => handleSave('python')}>Save Code (Python)</button>
      <button type="button" onClick={() => handleSave('golang')}>Save Code (GoLang)</button>
      <div>
        <h3>Output:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default AlgorithmResults;
