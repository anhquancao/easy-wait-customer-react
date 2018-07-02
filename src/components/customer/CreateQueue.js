import React, {Component} from 'react';
import {observer} from 'mobx-react';
import style from '../../styles/CreateQueue.less';
import QueueStore from "../../stores/QueueStore";
import {checkAuth} from '../../utils/authHelper';

@observer
class CreateQueue extends Component {
    queueStore = QueueStore;

    componentWillMount() {
        checkAuth(this.props.history);
        const {id} = this.props.match.params;
        if (id) {
            this.queueStore.loadQueue(id);
        }
    }

    updateForm = (e) => {
        this.queueStore.updateForm(e.target.name, e.target.value);
    };


    handleSubmit = async (e) => {
        e.preventDefault();
        let saved = false;
        if (this.queueStore.queue.id) {
            saved = await this.queueStore.updateQueue();
        } else {
            saved = await this.queueStore.saveQueue();
        }
        if (saved) {
            this.queueStore.resetForm();
            this.props.history.push("/customer/home");
        }
    };

    render() {
        return (
            <div className={"card my-3 " + style.formCreateQueue}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={this.updateForm}
                            value={this.queueStore.queue.name || ""}
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter name"/>
                        {
                            this.queueStore.messages["name"] && (
                                <small className="text-danger form-text ">
                                    {this.queueStore.messages["name"]}
                                </small>
                            )
                        }

                    </div>


                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            value={this.queueStore.queue.status}
                            name="status"
                            className="custom-select"
                            onChange={this.updateForm}>
                            <option value="">Choose a status</option>
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                        </select>
                        {
                            this.queueStore.messages["status"] && (
                                <small className="text-danger form-text ">
                                    {this.queueStore.messages["status"]}
                                </small>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="tini">Estimated initial wait time</label>
                        <div className="input-group">
                            <input
                                onChange={this.updateForm}
                                value={this.queueStore.queue.tini || ""}
                                type="number"
                                id="tini"
                                name="tini"
                                className="form-control"
                                placeholder="Enter minutes"/>
                            <div className="input-group-append">
                                <div className="input-group-text">Minutes</div>
                            </div>
                        </div>

                        {
                            this.queueStore.messages["tini"] && (
                                <small className="text-danger form-text ">
                                    {this.queueStore.messages["tini"]}
                                </small>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="tmoy">Average service time</label>
                        <div className="input-group">
                            <input
                                onChange={this.updateForm}
                                value={this.queueStore.queue.tmoy || ""}
                                type="number"
                                id="tmoy"
                                name="tmoy"
                                className="form-control"
                                placeholder="Enter minutes"/>
                            <div className="input-group-append">
                                <div className="input-group-text">Minutes</div>
                            </div>
                        </div>

                        {
                            this.queueStore.messages["tmoy"] && (
                                <small className="text-danger form-text ">
                                    {this.queueStore.messages["tmoy"]}
                                </small>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="trev">Time allow to return</label>
                        <div className="input-group">
                            <input
                                onChange={this.updateForm}
                                value={this.queueStore.queue.trev || ""}
                                type="number"
                                id="trev"
                                name="trev"
                                className="form-control"
                                placeholder="Enter minutes"/>
                            <div className="input-group-append">
                                <div className="input-group-text">Minutes</div>
                            </div>
                        </div>

                        {
                            this.queueStore.messages["trev"] && (
                                <small className="text-danger form-text ">
                                    {this.queueStore.messages["trev"]}
                                </small>
                            )
                        }
                    </div>


                    <button
                        type="submit"
                        className={(this.queueStore.isLoading && "disabled ") + " btn btn-primary"}>
                        {
                            this.queueStore.isLoading ? "Loading..." : "Submit"
                        }
                    </button>
                </form>
            </div>
        );
    }
}

export default CreateQueue;