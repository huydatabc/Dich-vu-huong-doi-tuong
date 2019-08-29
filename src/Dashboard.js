import React from 'react'
import {
    Container,
    Dropdown,
    Grid,
    Header,
    List,
    Menu,
    Image,
    Segment,
    Button
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './App'
import * as global from './helper/StringHelper.js'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: []
        }
        this.logOut = this.logOut.bind(this);
    }
    logOut(e) {
        e.preventDefault();
        localStorage.setItem('status', false);
        this.props.history.push("/");
        console.log(localStorage.getItem('status'))
    }
    componentDidMount() {
        let value = localStorage.getItem('result');
        value = JSON.parse(value);
        fetch(global.api + `/users/${value._id}/jars`, {
            headers: {
                'accept': 'application/json',
                'token': `${value.token}`,
            },
        })
            .then(global.handleErrors)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('jars', JSON.stringify(data.results))
                this.setState({ res: data.results });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
                <div id="dashboard" style={{ minHeight: '100%', flex: '1' }}>
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
                            <Menu.Item as='a' position='right'><Button onClick={this.logOut}>Log out</Button></Menu.Item>
                        </Container>
                    </Menu>
                    <Container style={{ marginTop: '7em', paddingBottom: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Header as='h1'>Website quản lý tài chính</Header>
                            <p>Công nghệ chính sử dụng là React.</p>
                            <p>
                                Under Construction.
                            </p>
                        </div>
                        <Grid columns={3} style={{ marginTop: '2em', marginLeft: '8em' }}>
                            <Grid.Column width={5} >
                                <Image
                                    as={Link} to='/basic'
                                    fluid
                                    label={{ as: 'a', color: 'green', content: 'Phí sinh hoạt', icon: 'arrow up', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>

                            <Grid.Column width={5}>
                                <Image
                                    fluid
                                    label={{ as: 'a', color: 'red', content: 'Giáo dục', icon: 'arrow down', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>

                            <Grid.Column width={5}>
                                <Image
                                    fluid
                                    label={{ as: 'a', color: 'blue', content: 'Cho đi', icon: 'spoon', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Image
                                    fluid
                                    label={{ as: 'a', color: 'blue', content: 'Tiền ngoài thu nhập', icon: 'spoon', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Image
                                    fluid
                                    label={{ as: 'a', color: 'blue', content: 'Tiết kiệm', icon: 'spoon', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Image
                                    fluid
                                    label={{ as: 'a', color: 'blue', content: 'Tiền tự do', icon: 'spoon', ribbon: true }}
                                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                                />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
                <div>
                    <Segment inverted vertical style={{
                        bottom: '0', width: '100%', height: '20px', padding: '1.5em 0em'
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
export default Dashboard