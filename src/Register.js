import React from 'react'
import { Button, Form, Icon, Message, Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import LoginForm from './App'
import * as global from './helper/StringHelper.js'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            errors: [],
            res: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validate(userName, email, password) {
        // we are going to store errors for all fields
        // in a signle array
        const errors = [];

        if (userName.length === 0) {
            errors.push("Name can't be empty");
        }

        if (email.length < 5) {
            errors.push("Email should be at least 5 charcters long");
        }
        if (email.split("").filter(x => x === "@").length !== 1) {
            errors.push("Email should contain a @");
        }
        if (email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot");
        }

        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }

        return errors;
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit() {
        var { userName, email, password } = this.state;
        console.log(userName, email, password)
        let errors = this.validate(userName, email, password);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
        fetch(global.api + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email,
                userName,
                password
            })
        })
            .then(global.handleErrors)
            .then(response => response.json())
            .then(data => {
                this.setState({ res: data })
                if (data.success) {
                    toast({
                        type: 'success',
                        icon: 'check',
                        title: 'Registration successful',
                        animation: 'bounce',
                        time: 2000,
                    })
                }
                else {
                    toast({
                        type: 'error',
                        icon: 'x',
                        title: 'Registeration failed try again',
                        animation: 'bounce',
                        time: 1500,
                    });
                }
            })
            .then(errors = [], this.setState({ errors }))
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (
            <div>
                <SemanticToastContainer position="top-right" />
                <Grid textAlign='center'
                    style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} verticalAlign='middle'>
                    <Grid.Column style={{ width: 800 }}>
                        <Message
                            attached
                            header='Welcome to our site!'
                            content='Fill out the form below to sign-up for a new account'
                        />
                        <Form className='attached fluid segment'>
                            {this.state.errors.map(error => (<p style={{ color: 'red' }} key={error}>Error: {error}</p>))}
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First Name' placeholder='First Name' type='text'
                                    name='firstName' onChange={event => this.handleChange(event)} />
                                <Form.Input fluid label='Last Name' placeholder='Last Name' type='text'
                                    name='lastName' onChange={event => this.handleChange(event)} />
                            </Form.Group>
                            <Form.Input label='Email' placeholder='Email' type='text'
                                name='email' onChange={event => this.handleChange(event)} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Username' placeholder='Username' type='text'
                                    name='userName' onChange={event => this.handleChange(event)} />
                                <Form.Input fluid label='Password' placeholder='Password' type='password'
                                    name='password' onChange={event => this.handleChange(event)} />
                            </Form.Group>
                            <Button color='blue' onClick={() => this.handleSubmit()}>Submit</Button>
                        </Form>
                        <Message attached='bottom' warning>
                            <Icon name='help' />
                            Already signed up? <Link to='/' >Login here</Link> instead.
                         </Message>
                    </Grid.Column>
                </Grid>
                <Router>
                    <Route exact path="/" component={LoginForm} />
                </Router>
            </div>
        )
    }
}
export default RegisterForm