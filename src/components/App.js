import React from 'react';
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp/";
import GraphQLManager from "../GraphQLManager";

class App extends React.Component {
    state = {
        isAuthenticated: true
    };

    constructor(props) {
        super(props);

        this.setAuthenticated = this.setAuthenticated.bind(this);
        GraphQLManager.getInstance().setupClient(() => {
            this.setAuthenticated(false);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">TODO LIST</h1>
                </div>
                { this.state.isAuthenticated ?
                    <AuthenticatedApp setAuthenticated = { this.setAuthenticated } /> :
                    <UnauthenticatedApp setAuthenticated = { this.setAuthenticated } /> }
            </div>
            )
    }

    setAuthenticated(isAuth) {
        this.setState({
            isAuthenticated: isAuth
        })
    }
}

export default App