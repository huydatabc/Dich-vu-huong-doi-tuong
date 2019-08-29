import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './index.css';
import LoginForm from './App';
import RegisterForm from './Register'
import * as serviceWorker from './serviceWorker';
import Login from './login/login';
import Dashboard from './Dashboard';
import Unauthed from './Unauthed';
import Basic from './BasicNecessities';

let isAuthenticated = false;

function auth() {
  if ( localStorage.hasOwnProperty('status')){
    let value = localStorage.getItem('status');
    value = JSON.parse(value);
    isAuthenticated = value;
 }
 console.log(isAuthenticated)
 return isAuthenticated
}
// const PrivateRoute = ({ trueComponent: Component, falseComponent, ...rest }) => (
//   <Route {...rest} component={
//         auth() === true
//         ? Component
//         : falseComponent
//     }
//   />
// )

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/unauthed",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const routing = (
    <Router>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/user" component={Login} />
        <PrivateRoute  path="/dashboard" component={Dashboard} />
        <Route path="/unauthed" component={Unauthed} />
        <Route path="/basic" component={Basic} />
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
