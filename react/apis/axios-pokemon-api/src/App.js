import './App.css';
import Display from './components/Display';
import { useState } from 'react'

function App() {
  const [startFetch, setStartFetch] = useState(false);
  return (
    <div className="App">
      <button onClick={e => setStartFetch(true)}>Fetch Pokemons!</button>
      {startFetch ? <Display /> : ''}
    </div>
  );
}

export default App;
