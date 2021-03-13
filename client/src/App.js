import {useEffect, useState, useRef} from 'react'

export default function App() {
  const [message, setMessage] = useState("Idle")
  const ws = useRef(null);

  function sendMessage() {
    try {
      ws.current.send("hello!") //send data to the server
      } catch (error) {
          console.log(error) // catch error
      }
  }

  useEffect(()=> {
    ws.current = new WebSocket('ws://localhost:8080/ws')
    ws.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      setMessage("Connected")
      }
      ws.current.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({dataFromServer: message})
      console.log(message)
      setMessage("Message")
      }
      ws.current.onclose = () => {
      console.log('disconnected')
      setMessage("Disconnected")
      // automatically try to reconnect on connection loss
      }
},[])

  return (
    <div className="App">
      {message}
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}

