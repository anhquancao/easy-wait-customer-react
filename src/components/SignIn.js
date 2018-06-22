import React, {Component} from 'react';

class SignIn extends Component {
    authStore = this.props.authStore;

    render() {
        return (
            <div className="home">
                Sign In
            </div>
        );
    }
}

export default SignIn;