import React, {Component} from 'react';
import style from './styles/App.less';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AuthStore from "./stores/AuthStore";
import {getToken, getUser, signOut} from "./utils/authHelper";
import {createLoadableComponent} from "./utils/loadableHelper";

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
            <BrowserRouter>
                <div className={style.App}>
                    <Navbar/>
                    <Switch>
                        <Route path="/auth"
                               component={createLoadableComponent(() => import('./components/auth/Auth'))}/>

                        <Route path="/customer"
                               component={createLoadableComponent(() => import('./components/customer/Customer'))}
                        />

                        <Route path="/user"
                               component={createLoadableComponent(() => import('./components/user/User'))}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
