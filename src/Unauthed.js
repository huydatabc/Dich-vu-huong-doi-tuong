import React from "react";
import LoginForm from "./App";
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import { Message } from 'semantic-ui-react'

 
class Unauthed extends  React.Component {
  render() {
    return (
        <div style={{  margin: '50px' , left: '50%' }}>
          <h1>UnAuthorized</h1>
            <p>
                You are not logged in
            </p>
                <Message>
                 Back to <Link to='/'>Login</Link>
                </Message>
                <Router>
                    <Route exact path="/" component={LoginForm}/>
                </Router>
        </div>

    );
  }
}
 
export default Unauthed;