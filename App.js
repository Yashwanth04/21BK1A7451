import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [numberType, setNumberType] = useState('p');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchNumbers = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/numbers/${type}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching data');
      setData(null);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={() => fetchNumbers(numberType)}>Fetch Numbers</button>
        {error && <p>{error}</p>}
        {data && (
          <div>
            <h2>Previous Window State</h2>
            <pre>{JSON.stringify(data.windowPrevState, null, 2)}</pre>
            <h2>Current Window State</h2>
            <pre>{JSON.stringify(data.windowCurrState, null, 2)}</pre>
            <h2>Numbers Fetched</h2>
            <pre>{JSON.stringify(data.numbers, null, 2)}</pre>
            <h2>Average</h2>
            <p>{data.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
};
export default App;
