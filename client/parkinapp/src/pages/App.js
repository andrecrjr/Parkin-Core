import React from 'react';
import withAccount from '../components/HOCs/withAccount';
import Body from '../components/Layout/Body';
import SignUpPage from './SignUp';
import Login from './Login';
import Main from './Main';
import {PrivateRoute} from '../components/Layout/PrivateRoute';
import RegisterCar from './UserCars/';
import Profile from './ProfileUser';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../reducers/'

import {
  BrowserRouter as Router,
  Switch,
  Route,
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
  const store = createStore(rootReducer)
  return (
    <Provider store={store}>
      <Router>
        <Body>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute path="/user_car" component={RegisterCar}/>
            <PrivateRoute path="user/:id" component={Profile}/>
          </Switch>
        </Body>
      </Router>
      </Provider>
  );
}

export default withAccount(App);
