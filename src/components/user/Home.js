import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import AuthStore from "../../stores/AuthStore";
import QueueStore from "../../stores/QueueStore";
import {checkAuth} from "../../utils/authHelper";
import Pagination from "../common/Pagination";
import Loading from "../Loading";

@observer
class Home extends Component {
    queueStore = QueueStore;

    componentWillMount() {
        checkAuth(this.props.history);
    }

    componentDidMount() {
        this.loadQueues();
    };

    loadQueues = (page = 1) => {
        this.queueStore.getAllQueues(page);
    };

    deleteQueue(id) {
        this.queueStore.deleteQueue(id);
    }

    render() {
        return (
            <div className="container">
                {
                    this.queueStore.isLoading && <Loading/>
                }
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Responsible</th>
                        <th scope="col">Status</th>
                        <th scope="col">Number of waiting people</th>
                        <th scope="col">Estimate waiting time</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.queueStore.queues && this.queueStore.queues.map((queue) => {
                            return (
                                <tr key={queue.id}>
                                    <td>{queue.name}</td>
                                    <td>{queue.user.name}</td>
                                    <td>{queue.status}</td>
                                    <td>{queue.number_waiting_people}</td>
                                    <td>{queue.estimate_waiting_time}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button
                                                onClick={() => this.deleteQueue(queue.id)}
                                                className="btn btn-primary">register
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
                <Pagination
                    currentPage={this.queueStore.currentPage}
                    lastPage={this.queueStore.lastPage}
                    loadPage={(page) => this.loadQueues(page)}
                />
            </div>
        );
    }
}

export default Home;
