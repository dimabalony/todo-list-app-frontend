import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import APIManager from "../../APIManager";

class UnauthenticatedApp extends React.Component {
    state = {
        isSignIn: true,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    constructor(props) {
        super(props);

        this.handleSwitchSignInUpClicked = this.handleSwitchSignInUpClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="text-center mb-4">
                        <h1>{this.state.isSignIn ? "Sign In" : "Sign Up"}</h1>
                    </div>
                    {!this.state.isSignIn ?
                        <div className="form-label-group">
                            <input
                                type="name"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={this.props.name}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        : ""
                    }
                    <div className="form-label-group">
                        <input
                            type="email"
                            id="inputEmail"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            value={this.props.email}
                            onChange={this.handleChange}
                            required autoFocus
                        />
                        <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-label-group">
                        <input
                            type="password"
                            id="inputPassword"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={this.props.password}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    {!this.state.isSignIn ?
                        <div className="form-label-group">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={this.props.confirmPassword}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        : ""
                    }
                    <input className="btn btn-lg btn-primary btn-block" type="submit" value={this.state.isSignIn ? "Login" : "Sign Up"} />
                </form>
                <br/>
                {this.state.isSignIn ?
                    <div>
                        <h5 className="text-center mb-4">No account?</h5>
                        <button className="btn btn-lg btn-outline-secondary btn-block"
                                onClick={this.handleSwitchSignInUpClicked}>Create one
                        </button>
                    </div> :
                    <button className="btn btn-lg btn-outline-secondary btn-block"
                            onClick={this.handleSwitchSignInUpClicked}>Sign In</button>
                }
            </div>
        )
    }

    handleSwitchSignInUpClicked() {
        this.setState(prevState => {
            return {
                isSignIn: !prevState.isSignIn
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isSignIn) {
            let credentials = {
                email: this.state.email,
                password: this.state.password
            }
            APIManager.signIn(credentials)
                .then((response) => {
                    this.props.setAuthenticated(true)
                })
        } else {
            let credentials = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.password
            }
            APIManager.signUp(credentials)
                .then((result) => {
                    this.props.setAuthenticated(true)
                })
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
}

export default UnauthenticatedApp