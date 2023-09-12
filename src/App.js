import './App.css';
import { useState } from 'react';
import TreeView from './TreeView';
import axios from 'axios';
function App() {

  const [selectInputValue, setInputValue] = useState("");

  const inputCall = async(inputValue) => {
    try {
      const response = await axios.get(`http://localhost:3010/buildtree/${inputValue}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleInput = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    inputCall(inputValue);
  };
  return (
    <div className="App">
      <h3>Tree Structure GUI</h3> 
      <select value={selectInputValue} onChange={handleInput}>
        <option value="1">Input 1</option>
        <option value="2">Input 2</option>
        <option value="3">Input 3</option>
        <option value="4">Input 4</option>
      </select>
       <TreeView /> 
      <footer>Made by Aditya K</footer>
    </div>
  );
}

export default App;
