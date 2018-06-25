import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';

@observer
class Home extends Component {
    authStore = this.props.authStore;

    render() {
        if (!this.authStore.isSignedIn) {
            return <Redirect to="/sign-in"/>
        }
        return (
            <div className="home">
                Home <br/>
            </div>
        );
    }
}

export default Home;
