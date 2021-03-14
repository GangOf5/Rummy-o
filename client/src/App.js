import {useEffect, useState, useRef} from 'react'

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const ws = useRef(null);

  function sendMessage() {
    try {
      ws.current.send(newMessage) //send data to the server
      setNewMessage("")
      } catch (error) {
          console.log(error) // catch error
      }
  }

  useEffect(()=> {
    ws.current = new WebSocket('ws://localhost:8080/ws')
    ws.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      }
      ws.current.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = evt.data
      setMessages(ms => [...ms, message])
      console.log(message)
      }
      ws.current.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      }
},[])

  return (
    <div className="App">
             <textarea name="message"
                       placeholder="Type your message..."
                       value={newMessage}
                       onChange={(e)=>setNewMessage(e.target.value)}
                       ></textarea>
            <div>
              <h1>Messages:</h1>
              <ul>
                {messages.map((m, index) => <li key={index}>{m}</li>)}
              </ul>
            </div>
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}

