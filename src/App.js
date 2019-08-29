import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'semantic-ui-css/semantic.min.css';
import * as global from './helper/StringHelper.js'
import RegisterForm from './Register'
import Dashboard from './Dashboard'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      success: false,
      returns: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
      //const data = new FormData(event.target.value);
      fetch(global.api + '/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.state.userName,
          password: this.state.password
        })
      })
        .then(global.handleErrors)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('result',  JSON.stringify(data.results));
          localStorage.setItem('status', JSON.stringify(true));
          this.setState({ returns: data, success: true })
        })
        .catch(function (error) {
          toast({
            type: 'error',
            icon: 'x',
            title: 'Login failed',
            description: 'Wrong username or password!',
            animation: 'bounce',
            time: 1500,
          });
          console.log(error);
        })
      // if (this.state.returns.success) {

      //rehydrate token
      // if (localStorage.hasOwnProperty('token')) {
      //   let value = localStorage.getItem('token');
      // }
      // }
  }

  render() {
    if (this.state.success) return <Redirect to='/dashboard' />;
    return (
      <div>
        <SemanticToastContainer position="top-right" />
        <div className='login-form'>
          {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
        width:150%;
      }
    `}
          </style>
          <Grid textAlign='center'
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 400 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large'  onSubmit={() => this.handleSubmit()}>
                <Segment stacked>
                  <Form.Input
                    name='userName'
                    value={this.state.userName}
                    onChange={event => this.handleChange(event)}
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='Username' />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}
                  />
                  {<Button color='teal' fluid size='large'>
                    Login
                   </Button>}

                </Segment>
              </Form>
              <BrowserRouter>
                <Message>
                  New to us? <Link to='/register'>Register</Link>
                </Message>
                <Route path="/register" component={RegisterForm} />
                <Route path="/dashboard" component={Dashboard} />
              </BrowserRouter>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}



export default LoginForm


