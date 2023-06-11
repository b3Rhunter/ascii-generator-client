import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [input, setInput] = useState('');
  const [font, setFont] = useState('Standard');
  const [output, setOutput] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleTextChange = (event) => {
    setInput(event.target.value);
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const generateAsciiArt = async () => {
    try {
      const response = await axios.post('https://ascii-generator-7xhu.onrender.com/ascii', { text: input, font: font });
      setOutput(response.data.ascii);
    } catch (error) {
      console.error('Error generating ASCII art: ', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(function () {
      console.log('Copying to clipboard was successful!');
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000); // hide after 2 seconds
    }, function (err) {
      console.error('Could not copy text: ', err);
    });
  };


  return (
    <div className="App">

      
      <div className='control-panel'>
      <pre>{output}</pre>
        <textarea type="text" value={input} onChange={handleTextChange} />
        <select value={font} onChange={handleFontChange}>
          <option value="Standard">Standard</option>
          <option value="Ghost">Ghost</option>
          <option value="Doom">Doom</option>
          <option value="doh">Moo</option>
        </select>
        <button onClick={generateAsciiArt}>Generate ASCII Art</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
      <CSSTransition in={showCopySuccess} timeout={2000} classNames="alert" unmountOnExit>
        <div className="alert">Copied!</div>
      </CSSTransition>
    </div>

  );
}

export default App;
