import React, { useRef, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import CoolText from './components/CoolText';


const TITLE_TEXT = 'Topix';
const COPY_RIGHT_TEXT = "This Site Is Brought To You By The Brain Of Dor Gross, All Rights Reserved To Dor Gross."


function _preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function App() {

  const ref = useRef(null);

  // Because we have drag and drop in the appplicaton
  // We want to cancel any weird default action the browser might come up with
  useEffect(() => {
    if(ref && ref.current){
      let element = ref.current;
      
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          element.addEventListener(eventName, _preventDefaults, false);
      });

      return () => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          element.removeEventListener(eventName, _preventDefaults, false);
        });
      };
    }
  },[ref]);



  return (
    <div className="App" ref={ref}>
      <title>
        <CoolText text={TITLE_TEXT} />
      </title>
      
      <div className="Header">
        <span className="Title">
          <CoolText text={TITLE_TEXT} />
        </span>
      </div>
      
      <div className="Body">
        <Main/>
      </div>

      <div className="Footer">
        <CoolText text={COPY_RIGHT_TEXT} delay={20000} typeTime={3000} />
      </div>
    </div>
  );
}

export default App;
