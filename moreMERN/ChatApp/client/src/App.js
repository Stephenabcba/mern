import React, { useState } from 'react';
import './App.css';
import ChatComp from './components/ChatComp';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [name, setName] = useState("")
  const [connected, setConnected] = useState(false)

  const connectToChat = (e) => {
    e.preventDefault()
    if (name.length === 0) {
      console.log("You need a name to start chatting!");
      return
    }
    setConnected(true)
  }

  return (
    <div className="App">
      <h1>MERN Chat</h1>
      {connected ? <ChatComp name={name} /> :
        <div>
          <h2>Get Started right now!</h2>
          <p>I want to start chatting with the name...</p>
          <form onSubmit={connectToChat}>
            <input name="name" value={name} onChange={e => setName(e.target.value)} />
            <button >Start Chatting</button>
          </form>
        </div>
      }

    </div>
  );
}

export default App;