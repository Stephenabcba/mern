import './App.css';
import ColorForm from './components/ColorForm';
import React, { useState } from 'react';
import ColorBox from './components/ColorBox';

function App() {
  // array of box properties to render
  const [box, setBox] = useState([]);

  // function makeNewBox(color) {
  //   setBox([...box, color])
  // }

  // updated setter function to receive new box properties from the form
  function makeNewBox(boxProperties) {
    setBox([...box, boxProperties])
  }

  return (
    <div className="App">
      {/* <ColorForm submitColor={makeNewBox} /> */}
      <ColorForm makeBox={makeNewBox} />
      {/* {box.map((color, index) => <ColorBox key={index} color={color} />)} */}
      {box.map((boxProperties, index) => <ColorBox key={index} boxProperties={boxProperties} />)}
    </div>
  );
}

export default App;
