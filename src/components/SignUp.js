import React, {Component} from 'react';
import style from '../styles/SignUp.less';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';

@observer
class SignUp extends Component {
    authStore = this.props.authStore;

    updateForm = (e) => {
        this.authStore.updateUser(e.target.name, e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.authStore.isLoading)
            this.authStore.register();
    };

    render() {
        if (this.authStore.isSignedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div className={"card my-3 " + style.formSignUp}>
                <div className="card-body">
                    <div className="card-title">
                        Customer Sign Up
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={this.updateForm}
                                value={this.authStore.user.name || ""}
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter name"/>
                            {
                                this.authStore.messages["name"] && (
                                    <small className="text-danger form-text ">
                                        {this.authStore.messages["name"]}
                                    </small>
                                )
                            }

                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                onChange={this.updateForm}
                                value={this.authStore.user.email || ""}
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"/>
                            {
                                this.authStore.messages["email"] && (
                                    <small className="text-danger form-text ">
                                        {this.authStore.messages["email"]}
                                    </small>
                                )
                            }

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={this.updateForm}
                                id="password"
                                value={this.authStore.user.password || ""}
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"/>
                            {
                                this.authStore.messages["password"] && (
                                    <small className="text-danger form-text ">
                                        {this.authStore.messages["password"]}
                                    </small>
                                )
                            }

                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Confirm password</label>
                            <input
                                onChange={this.updateForm}
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={this.authStore.user.password_confirmation || ""}
                                className="form-control"
                                placeholder="Re-enter your password"/>

                        </div>
                        <button
                            type="submit"
                            className={(this.authStore.isLoading && "disabled ") + " btn btn-primary"}>
                            {
                                this.authStore.isLoading ? "Loading..." : "Submit"
                            }
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
