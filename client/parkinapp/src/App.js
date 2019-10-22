import React from 'react';
import Body from './pages/components/Layout/Body';
import SignUpPage from './pages/SignUp/';
import Login from './pages/Login/';
import './styles/main.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
      <Router>
        <Body>
          <Switch>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/login" component={Login}/>
          </Switch>
          </Body>
      </Router>
  );
}

export default App;
