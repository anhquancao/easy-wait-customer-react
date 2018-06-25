import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import style from '../styles/CreateQueue.css';

@observer
class CreateQueue extends Component {
    render() {
        return (
            <div className={"card my-3 " + style.formCreateQueue}>
                Create Queue
            </div>
        );
    }
}

export default CreateQueue;