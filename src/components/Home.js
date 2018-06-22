import React, {Component} from 'react';
import AuthStore from '../stores/AuthStore';
import {observer} from 'mobx-react';

@observer
class Home extends Component {
    render() {
        console.log(AuthStore);
        console.log(AuthStore.isSignedIn);
        return (
            <div className="home">
                Home <br/>
                {AuthStore.isSignedIn ? "Signed in" : "Signed out"}
                <button onClick={AuthStore.toggleSignIn}>{AuthStore.user.name}</button>
                {AuthStore.userName}
            </div>
        );
    }
}

export default Home;
