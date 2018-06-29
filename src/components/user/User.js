import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {createLoadableComponent} from "../../utils/loadableHelper";

class User extends Component {
    componentWillMount() {

    }

    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={`${match.url}/sign-up`}
                       component={createLoadableComponent(() => import('./SignUp'))}/>
                <Route path={`${match.url}/home`}
                       component={createLoadableComponent(() => import("./Home"))}/>
            </Switch>
        );
    }
}

export default User;
