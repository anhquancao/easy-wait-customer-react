import React, {Component} from 'react';
import style from './App.css';
import Navbar from "./components/Navbar";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthStore from "./stores/AuthStore";

class App extends Component {
    render() {
        return (
            <div className={style.App}>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/sign-in' render={() => <SignIn authStore={AuthStore}/>} />
                    <Route exact path='/sign-up' render={() => <SignUp authStore={AuthStore} />} />
                </Switch>
            </div>
        );
    }
}

export default App;
