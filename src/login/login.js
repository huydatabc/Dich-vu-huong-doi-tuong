import React from 'react'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3333/api/users')
            .then(handleErrors)
            .then(response => response.json())
            .then(data => this.setState({users:data.results}))
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user => <li key={user._id}>{user.firstName}<br></br>{user.lastName}</li>)}
                </ul>
            </div>
        );
    }

}

export default Login
