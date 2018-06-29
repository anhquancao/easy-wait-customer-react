import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {createLoadableComponent} from "../../utils/loadableHelper";

class Auth extends Component {
    componentWillMount() {

    }

    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={`${match.url}/sign-in`}
                       component={createLoadableComponent(() => import("./SignIn"))}/>
            </Switch>
        );
    }
}

export default Auth;
