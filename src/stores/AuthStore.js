import React from 'react';
import {computed, observable, action} from "mobx";
import AuthApi from "../api/AuthApi";

class AuthStore {
    @observable user = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    };

    @observable messages = {};

    @observable isSignedIn = false;

    @computed get userName() {
        return this.user.name;
    }

    updateUser = (field, value) => {
        this.user[field] = value;
    };

    register = async () => {
        try {
            const res = await AuthApi.register(this.user);
            console.log(res);
        } catch (e) {
            console.log(e.response.data.messages);
            this.messages = e.response.data.messages;
        }
    };
}

export default new AuthStore();