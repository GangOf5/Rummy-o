import {useState, useRef, useEffect} from 'react'

export default function App() {
  const [rooms, setRooms] = useState([])
  const [roomNameInput, setRoomNameInput] = useState("")
  const [user, setUser] = useState({name: ""})
  const [connected, setConnected] = useState(false)
  const ws = useRef(null);

  useEffect(() => {console.log("use effect: " + rooms)}, [rooms])

  function sendMessage(room) {
    try {
      if (room.newMessage !== ""){
        ws.current.send(JSON.stringify({
          action: 'send-message',
          message: room.newMessage,
          target: room
        }))
        room.newMessage = "";
      }
    } catch (error) {
          console.log(error) // catch error
    }
  }

  function joinRoom(){
    ws.current.send(JSON.stringify({
      action: 'join-room',
      message: roomNameInput
    }))
    setRoomNameInput(() => "")
  }

  function leaveRoom(room){
    ws.current.send(JSON.stringify({
      action: 'leave-room',
      message: room.id
    }))
    setRooms(rooms => rooms.filter(r => r.id !== room.id))
  }

  const handleMessage = message => {
    console.log(message.action)
    if (message["action"] === "room-joined"){
      setRooms(rooms => [...rooms, {...message.target, messages:[], newMessage:""}])
    } else if (message.action === "send-message") {
      console.log("message received!")
      setRooms(rooms => rooms.map(r => (r.id === message.target.id ? {...r, messages: [...r.messages, message.message]}:r)))
    }
  }

  function connect(){
    ws.current = new WebSocket(`ws://localhost:8080/ws?name=${user.name}`)
    ws.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      setConnected(true)
      }
    ws.current.onmessage = evt => {
    // listen to data sent from the websocket server
    handleMessage(JSON.parse(evt.data))
    }
    ws.current.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss
    }
  }

if (!connected) {
  return <div className="App">
    <input value={user.name} onChange={e => setUser(user=>({...user, name: e.target.value}))}/>
    <button onClick={connect}>Connect</button>
  </div>
} else return (
    <div className="App">
      <div>
        <input value={roomNameInput} onChange={(e) => setRoomNameInput(() => e.target.value)}/>
        <button onClick={joinRoom}>Join room</button>
      </div>
      <hr/>
      <div>
        {rooms.map((room, index) => <div key={index}>
          <p>{room.name} | {room.id}</p>
          {room.messages.map((m, i) => <li key={i}>{m}</li>)}
          <input value={room.newMessage} onChange={(e) => setRooms(rooms.map((r, ri) => {
            if (ri === index){
              return {...r, newMessage: e.target.value}
            }
            else {
              return r
            }
          }))}/>
          <button onClick={() => sendMessage(room)}>Send message</button>
          <button onClick={() => leaveRoom(room)}>Leave room</button>
        </div>)}
      </div>
      </div>
  )
}

