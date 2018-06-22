import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
class Home extends Component {
    render() {
        return (
            <div className="home">
                Home <br/>
            </div>
        );
    }
}

export default Home;
