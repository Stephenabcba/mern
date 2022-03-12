import './App.css';
import React, { useState } from 'react';
import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import FormWrapper from './components/FormWrapper';

function App() {
  return (
    <Wrapper>
      <Navbar />
      <FormWrapper />
    </Wrapper>
  );
}

export default App;
