import React, {Component} from 'react';
import style from './App.css';
import Navbar from "./components/Navbar";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

class App extends Component {
    render() {
        return (
            <div className={style.App}>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/sign-in' component={SignIn} />
                    <Route exact path='/sign-up' component={SignUp} />
                </Switch>
            </div>
        );
    }
}

export default App;
