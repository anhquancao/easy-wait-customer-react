import React, {Component} from 'react';
import {observer} from 'mobx-react';
import style from '../styles/CreateQueue.less';

@observer
class CreateQueue extends Component {
    queueStore = this.props.queueStore;

    componentWillMount() {
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
            this.props.history.push("/");
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