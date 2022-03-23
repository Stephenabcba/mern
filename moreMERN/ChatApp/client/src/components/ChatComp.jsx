import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';


const ChatComp = (props) => {
    const [socket] = useState(() => io(':8000'));
    const [messages, setMessages] = useState([])
    const [curMessage, setCurMessage] = useState("")
    const userName = props.name

    useEffect(() => {
        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => {
            console.log(data)
        });

        socket.on('newMessage', data => {
            console.log(data)
            // this syntax MUST be used for setting state for correct implementation
            setMessages(prevMessages => {
                return [...prevMessages, data]
            })
        });

        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(curMessage);
        socket.emit("message", { sender: userName, message: curMessage, senderId: socket.id })
        setCurMessage("")
    }

    return (
        <div>
            ChatComp
            {/* <p>{JSON.stringify(messages)}</p> */}
            <div className="scroll">
                <div>
                    {messages.map((message, idx) => {
                        return (
                            <div className={message.senderId === socket.id ? "message my-message" : "message"}>
                                <p>{message.senderId === socket.id ? "You" : message.sender} Said:</p>
                                <p>{message.message}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form onSubmit={e => sendMessage(e)}>
                <input type="text" value={curMessage} onChange={e => setCurMessage(e.target.value)} />
                <button>Send</button>
            </form>
        </div>
    )
}

export default ChatComp