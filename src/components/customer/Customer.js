import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {createLoadableComponent} from "../../utils/loadableHelper";

class Customer extends Component {
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
                <Route path={`${match.url}/queue/create`}
                       component={createLoadableComponent(() => import('./CreateQueue'))}/>
                <Route exact path={`${match.url}/queue/:id/edit`}
                       component={createLoadableComponent(() => import('./CreateQueue'))}/>
            </Switch>
        );
    }
}

export default Customer;
