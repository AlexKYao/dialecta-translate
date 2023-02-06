// @ts-nocheck
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import React from 'react';

const Home = () => {
  // Single Language Selection
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  // User input from the textbox
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput , selectedLanguage }), 
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    
    setIsGenerating(false);
  }
  
  

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const parseTable = (input) => {
    const rows = input.split('\n').slice(1);
    const header = rows.shift().split('|').slice(1, 3).map(h => h.trim());
    const data = rows.map(row => row.split('|').slice(1, 3).map(cell => cell.trim()));
  
    return (
      <table>
        <thead>
          <tr>
            <th>{header[0]}</th>
            <th>{header[1]}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Translate anything into your target language</h1>
          </div>
        </div>
        

        <div className="prompt-container">

        <div className="header-subtitle">
            <h2>1. Choose your Target Language</h2>
          </div>
        <div className='dropdown-container'>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
          {/* <p>Selected Language: {selectedLanguage}</p> */}
        </div>
           <div className="header-subtitle">
            <h2>2. Input the sentence or paragraph(s)</h2>
          </div>
          <textarea placeholder="start typing here" className="prompt-box" value={userInput}
          onChange={onUserChangedText}/>
          <div className="prompt-buttons">
          <a className="generate-button" className={isGenerating ? 'generate-button loading' : 'generate-button'} 
            onClick={callGenerateEndpoint}
          >
            <div className="generate"> 
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              
              <div className='output-table'>
                {parseTable(apiOutput)}
              </div>

              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
