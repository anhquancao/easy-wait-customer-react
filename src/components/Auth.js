import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import AuthStore from "../stores/AuthStore";

@observer
class Auth extends Component {

    render() {
        if (!AuthStore.isSignedIn) {
            return <Redirect to="/sign-in"/>
        }
        return this.props.component;
    }
}

export default Auth;