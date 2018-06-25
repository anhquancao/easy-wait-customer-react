import React from 'react';
import {computed, observable, action} from "mobx";
import AuthApi from "../api/AuthApi";
import {setToken, setUser, signOut} from "../utils/authHelper";

class AuthStore {
    @observable user = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    };

    @observable token = {};

    @observable messages = {};

    @observable isSignedIn = false;

    @observable isLoading = false;

    @computed get userName() {
        return this.user.name;
    }

    updateUser = (field, value) => {
        this.user[field] = value;
    };

    signInSuccess(token, user) {
        setToken(token);
        setUser(user);
        this.user = user;
        this.isSignedIn = true;
    }

    register = async () => {
        this.isLoading = true;
        try {
            const res = await AuthApi.register(this.user);
            // console.log(res);
            const {user, token} = res.data;
            this.signInSuccess(token, user);

        } catch (e) {
            this.messages = e.response.data.messages;
        } finally {
            this.isLoading = false;
        }
    };

    signIn = async () => {
        this.isLoading = true;
        try {
            const res = await AuthApi.signIn(this.user);
            const {token} = res.data;
            setToken(token);
            const resMe = await AuthApi.me();
            const {user} = resMe.data;
            this.signInSuccess(token, user);
        } catch (e) {
            this.messages["email"] = e.response.data.message;
        } finally {
            this.isLoading = false;
        }
    };

    signOut = () => {
        signOut();
        this.user = {};
        this.token = {};
        this.isSignedIn = false;
    }
}

export default new AuthStore();