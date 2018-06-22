import React from 'react';
import {computed, observable, action} from "mobx";

class AuthStore {
    @observable user = {
        name: "test"
    };

    @observable isSignedIn = false;

    @computed get userName() {
        return this.user.name;
    }

    toggleSignIn = () => {
        this.isSignedIn = !this.isSignedIn;
        this.user.name = new Date().getMilliseconds();
    }
}

export default new AuthStore();