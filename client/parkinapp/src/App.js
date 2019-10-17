import React from 'react';
import {isAuthenticated} from './components/HOCs/IsAuthenticated';
import Body from './components/Layout/Body';
import SignUpPage from './pages/SignUp/';
import './style/form.scss';

function App(props) {
  /*
  React.useEffect(()=>{
    props.subs.emit("MESSAGE", [{car_id:5}])

      props.subs.on("GIVE_MESSAGE", (message)=>{
        console.log(message)
      })

    }, [props.subs])

    function takeme(){
      props.subs.emit("ENTER", {id:6})
      return props.subs.on("WELCOME_MSG", (message)=>{
        console.log(message)
      })
    }
    */

  return (
    <Body>
      <SignUpPage/>
    </Body>
  );
}

export default isAuthenticated(App);
