import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)
const proTips = [
  'Be extremely specific!',
  'Add "Include a great quote from this company" to the end.',
  'Avoid overwhelming the model with large prompts!',
  'Be aware of the models limitations and do additional research as needed!',
  'Use the model for brainstorming and language practice, but be mindful of accuracy.',
  'Tailor the letter to the specific job and company.',
  'Use strong, actionable language!',
  'Be creative and have fun with your prompts!',
  'Use specific examples to illustrate your points.',
  'Proofread your text for spelling and grammar mistakes.',
  'Personalize the letter by addressing the recipient by name.',
  'Research the companys values and highlight how your skills and experiences align with them.',
'Use bullet points or numbered lists to make the letter more organized and easier to read.',
'Keep the letter concise and to the point, avoiding unnecessary information.',
'Use a professional tone and avoid slang or casual language.',
'Use active voice instead of passive voice.',
'End the letter with a call to action, such as asking for an interview or requesting further information.',

];

const getRandomProTip = () => {
  // Generate a random index between 0 and the length of the proTips array
  const index = Math.floor(Math.random() * proTips.length);

  // Return the pro tip at the random index
  return proTips[index];
};

console.log(getRandomProTip()); // Output: "Use specific examples from the company's history"
console.log(getRandomProTip()); // Output: "Be extremely specific"
console.log(getRandomProTip()); // Output: "Use strong, actionable language"

const [proTip, setProTip] = useState(getRandomProTip());

const [maxTokens, setMaxTokens] = useState(365); // default value for max_tokens

  const handleMaxTokensChange = (event) => {
    setMaxTokens(event.target.value);
  };

  const handleFileInputChange = () => {
   
  };
  const [theme, setTheme] = useState('light');

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); 
  }

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

const [userInput, setUserInput]= useState('');

const onUserChangedText = (event) => {
  setUserInput(event.target.value);
};




  return (
    <div className="root">
      <Head>
        <title>60 SECOND COVER LETTER</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Rapid Cover Letter </h1>
          </div>
          <div className={`page theme-${theme}`}>

    </div>
          <div className="header-subtitle">
            <h2> Generate a quick cover letter outline in 60 seconds or less by entering the following information below.  </h2>
          </div>
          <div className="header-subtitle">
            <h2> YOUR NAME - INTENDED EMPLOYER - EDUCATION - EXPERIENCE - QUALIFICATIONS </h2>
          </div>
          <div>
      <label htmlFor="max-tokens">Word Count: </label>
      <input
        type="number"
        id="max-tokens"
        value={maxTokens}
        onChange={handleMaxTokensChange}
      />
    </div>
        </div>

<div className="prompt-container">
          <textarea
  className="prompt-box"
  placeholder="This tool is so powerful you can copy and paste your entire resume right in! "
  value={userInput}
  onChange={onUserChangedText}/>
        </div>
      </div>
      <div className="header">
      <div className="header-subtitle">
        <h2>Pro Tip: {getRandomProTip()}</h2>
      </div>
    </div>
    
 <div className="prompt-buttons">
 <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>GENERATE</p>}
    </div>
  </a>
      </div>
      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Your Custom 60 Second Cover Letter</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
      <p>{apiOutput}</p>
  <button onClick={() => navigator.clipboard.writeText(apiOutput)}>Copy</button>

    </div>
  </div>
)}
    </div>
    
  );
};

export default Home;