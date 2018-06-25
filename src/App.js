import React, {Component} from 'react';
import style from './App.css';
import Navbar from "./components/Navbar";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthStore from "./stores/AuthStore";
import {getToken, getUser} from "./utils/authHelper";
import QueueStore from "./stores/QueueStore";
import CreateQueue from "./components/CreateQueue";

class App extends Component {
    componentDidMount() {
        const token = getToken();
        if (token) {
            AuthStore.user = getUser();
            AuthStore.token = token;
            AuthStore.isSignedIn = true;
        }
    }

    render() {
        return (
            <div className={style.App}>
                <Navbar authStore={AuthStore}/>
                <Switch>
                    <Route exact path='/' render={() => (
                        <Home
                            queueStore={QueueStore}
                            authStore={AuthStore}/>
                    )}/>
                    <Route exact path='/sign-in' render={() => <SignIn authStore={AuthStore}/>}/>
                    <Route exact path='/sign-up' render={() => <SignUp authStore={AuthStore}/>}/>
                    <Route exact path="/queue/create" render={() => <CreateQueue queueStore={QueueStore}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
