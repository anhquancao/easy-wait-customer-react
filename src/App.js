import React, {Component} from 'react';
import style from './styles/App.less';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import AuthStore from "./stores/AuthStore";
import {getToken, getUser, signOut} from "./utils/authHelper";
import QueueStore from "./stores/QueueStore";
import Loadable from 'react-loadable';
import Loading from "./components/Loading";

class App extends Component {
    componentWillMount() {
        const token = getToken();
        if (token) {
            const currentTime = (new Date).getTime();
            console.log(currentTime);
            // check if the token expired
            if (currentTime - token.time > (token.expires_in - 120) * 1000) {
                // sign out if the token expired
                signOut();
            } else {
                AuthStore.user = getUser();
                AuthStore.token = token;
                AuthStore.isSignedIn = true;
            }
        }
    }

    createLoadableComponent = (importModule) => {
        return Loadable({
            loader: importModule,
            loading: Loading,

        });
    };

    render() {
        return (
            <BrowserRouter basename="/customer">
                <div className={style.App}>
                    <Navbar authStore={AuthStore}/>
                    <Switch>
                        <Route exact path='/'
                               component={this.createLoadableComponent(() => import("./components/Home"))}/>
                        <Route exact path='/sign-in'
                               onEnter={() => console.log("test")}
                               component={this.createLoadableComponent(() => import("./components/SignIn"))}/>
                        <Route exact path='/sign-up'
                               component={this.createLoadableComponent(() => import('./components/SignUp'))}/>
                        <Route exact path="/queue/create"
                               component={this.createLoadableComponent(() => import('./components/CreateQueue'))}/>
                        {/*<Route exact path="/queue/:id/edit" render={(props) => (*/}
                        {/*<Auth >*/}
                        {/**/}
                        {/*</Auth>*/}
                        {/*)}/>*/}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
