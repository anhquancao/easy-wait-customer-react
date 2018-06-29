import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import style from '../../styles/SignIn.less';
import AuthStore from "../../stores/AuthStore";

@observer
class SignIn extends Component {
    authStore = AuthStore;

    componentWillMount() {
        this.authStore.resetForm();
    }

    updateForm = (e) => {
        this.authStore.updateUser(e.target.name, e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.authStore.isLoading)
            this.authStore.signIn();
    };

    render() {
        if (this.authStore.isSignedIn) {
            if (this.authStore.user.type === "customer") {
                return <Redirect to="/customer/home"/>
            }
            if (this.authStore.user.type === "user") {
                return <Redirect to="/user/home"/>
            }
        }
        return (
            <div className={"card my-3 " + style.formSignIn}>
                <div className="card-body">
                    <div className="card-title">
                        Sign In
                    </div>
                    <form onSubmit={this.handleSubmit}>

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

export default SignIn;