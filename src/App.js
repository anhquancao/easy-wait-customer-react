import React, {Component} from 'react';
import style from './styles/App.less';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthStore from "./stores/AuthStore";
import {getToken, getUser, signOut} from "./utils/authHelper";
import QueueStore from "./stores/QueueStore";
import CreateQueue from "./components/CreateQueue";
import Auth from './components/Auth';

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

    render() {
        return (
            <BrowserRouter basename="/customer">
                <div className={style.App}>
                    <Navbar authStore={AuthStore}/>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Auth component={
                                <Home
                                    queueStore={QueueStore}
                                    authStore={AuthStore}/>
                            }/>

                        )}/>
                        <Route exact path='/sign-in' render={() => <SignIn authStore={AuthStore}/>}/>
                        <Route exact path='/sign-up' render={() => <SignUp authStore={AuthStore}/>}/>
                        <Route exact path="/queue/create" render={(props) => (
                            <Auth component={<CreateQueue {...props} queueStore={QueueStore}/>}/>
                        )}/>
                        <Route exact path="/queue/:id/edit" render={(props) => (
                            <Auth component={<CreateQueue {...props} queueStore={QueueStore}/>}/>
                        )}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
