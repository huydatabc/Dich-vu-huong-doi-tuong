import React from 'react'
import {
    Container,
    Dropdown,
    Grid,
    List,
    Menu,
    Segment,
    Modal,
    Form,
    Icon,
    Button
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './App'
import * as global from './helper/StringHelper.js'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jar: [],
            user: [],
            res: [],
            addRes: [],
            activeItem: 'incomes',
            open: false,
            detail: '',
            amount: 0,
            date: new Date().toLocaleString(),
            jarId: '',
            token: '',
            userID: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit() {
        fetch(global.api + `/users/${this.state.userID}/jars/${this.state.jarId}/Incomes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${this.state.token}`,
            },
            body: JSON.stringify({
                detail: this.state.detail,
                amount: this.state.amount,
                date: this.state.date,

            })
        })
            .then(global.handleErrors)
            .then(response => response.json())
            .then(data => {
                this.setState({ addRes: data }) ; this.setState({ open: false })
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    openModal = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    componentDidMount() {
        let jar = localStorage.getItem('jars');
        jar = JSON.parse(jar);
        let value = localStorage.getItem('result');
        value = JSON.parse(value);
        var newArray = jar.filter(function (el) {
            return el.type === "Nhu cầu thiết yếu"
        });
        var jar2 = newArray[0]._id;
        this.setState({token:value.token})
        this.setState({userID:value._id})
        this.setState({jarId:jar2})
        fetch(global.api + `/users/${value._id}/jars/${jar2}/incomes`, {
            headers: {
                'accept': 'application/json',
                'token': `${value.token}`,
            },
        })
            .then(global.handleErrors)
            .then(response => response.json())
            .then(data => this.setState({ res: data.results })
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    logOut(e) {
        e.preventDefault();
        localStorage.setItem('status', false);
        this.props.history.push("/");
        console.log(localStorage.getItem('status'))
    }

    render() {
        const { activeItem } = this.state
        return (
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
                <div id="main" style={{ flex: '1' }}>
                    <Menu fixed='top' inverted>
                        <Container>
                            <Menu.Item as='a' header>
                                {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
                                Financial manager
                        </Menu.Item>
                            <Menu.Item as='a' >Home</Menu.Item>
                            <Dropdown item simple text='Dropdown'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header>Header Item</Dropdown.Header>
                                    <Dropdown.Item>
                                        <i className='dropdown icon' />
                                        <span className='text'>Submenu</span>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Item
                                name='addIncome'
                                active={activeItem === 'addIncome'}
                                onClick={this.openModal}
                            >
                                Add
                            </Menu.Item>
                            <Menu.Item as='a' position='right'><Button onClick={this.logOut}>Log out</Button></Menu.Item>
                        </Container>
                    </Menu>
                    <Modal open={this.state.open} onClose={this.close}>
                        <Modal.Header>Add</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input label='Memo' name='detail' onChange={event => this.handleChange(event)} >
                                </Form.Input>
                                <Form.Input label='Amount' type='number' min='0' name='amount' onChange={event => this.handleChange(event)}>
                                </Form.Input>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={this.close}>
                            <Icon name='remove' />Cancel
                            </Button>
                            <Button positive type='submit' onClick={() => this.handleSubmit()}>
                            <Icon name='checkmark'/> Submit 
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <div style={{ height: '100%', marginTop: '50px', padding: '0.1em 38em 0em' }} >
                        <Menu tabular >
                            <Menu.Item name='incomes' active={activeItem === 'incomes'} onClick={this.handleItemClick} />
                            <Menu.Item name='spendings' active={activeItem === 'spendings'} onClick={this.handleItemClick} />
                            <Menu.Item name='debts' active={activeItem === 'debts'} onClick={this.handleItemClick} />
                        </Menu>
                    </div>
                    <Segment text style={{ marginTop: '0px', padding: '0em 10em 0em' }}>
                        <ul style={{}}>
                            {this.state.res.map(res1 => <li key={res1._id}>{res1.detail}:   {res1.amount}<br></br>{res1.date}</li>)}
                            {this.state.res.map(res1 => <li key={res1._id}>{res1.detail}:   {res1.amount}<br></br>{res1.date}</li>)}
                            {this.state.res.map(res1 => <li key={res1._id}>{res1.detail}:   {res1.amount}<br></br>{res1.date}</li>)}
                            {this.state.res.map(res1 => <li key={res1._id}>{res1.detail}:   {res1.amount}<br></br>{res1.date}</li>)}
                            {this.state.res.map(res1 => <li key={res1._id}>{res1.detail}:   {res1.amount}<br></br>{res1.date}</li>)}

                        </ul>
                    </Segment>
                </div>

                <div style={{ position: 'static' }}>
                    <Segment inverted vertical style={{
                        bottom: '0px', width: '100%', height: '20px',
                        marginTop: '3px', padding: '1.5em 0em'
                    }}>
                        <Container textAlign='center'>
                            <Grid divided inverted stackable style={{ height: '5px', padding: '0em 0em' }}>
                            </Grid>
                            {/* <Image centered size='mini' src='/logo.png' /> */}
                            <List horizontal inverted divided link size='small'>
                                <List.Item as='a' href='#'>
                                    Site Map
                            </List.Item>
                                <List.Item as='a' href='#'>
                                    Contact Us
                            </List.Item>
                                <List.Item as='a' href='#'>
                                    Terms and Conditions
                            </List.Item>
                                <List.Item as='a' href='#'>
                                    Privacy Policy
                            </List.Item>
                            </List>
                        </Container>
                    </Segment>
                    <Router>
                        <Route exact path="/" component={LoginForm} />
                    </Router>
                </div>
            </div>
        )
    }
}
export default Basic