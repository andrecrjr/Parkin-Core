import React from 'react';
import Ws from '@adonisjs/websocket-client'

const io = Ws('ws://127.0.0.1:3333')
const channel = io.connect()
let subs = channel.subscribe("chat");


function App() {
  
  React.useEffect(()=>{
    subs.emit("MESSAGE", [{car_id:5}])

    subs.on("GIVE_MESSAGE", (message)=>{
      console.log(message)
    })
    }, [])

    function takeme(){
      subs.emit("ENTER", {id:6})
      return subs.on("WELCOME_MSG", (message)=>{
        console.log(message)
      })
    }
    

  return (
    <div className="App">
          <button onClick={takeme}>
            click aqui
          </button>
    </div>
  );
}

export default App;
