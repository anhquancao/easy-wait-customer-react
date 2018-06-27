import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
class Loading extends Component {

    render() {
        return (
            <div style={{position: "fixed", top: 5, right: 5}}>Loading...</div>
        );
    }
}

export default Loading;