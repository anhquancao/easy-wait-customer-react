import React from 'react';
import {computed, observable, action} from "mobx";

class AuthStore {
    @observable user = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    };

    @observable isSignedIn = false;

    @computed get userName() {
        return this.user.name;
    }

    updateUser = (field, value) => {
        this.user[field] = value;
    }
}

export default new AuthStore();