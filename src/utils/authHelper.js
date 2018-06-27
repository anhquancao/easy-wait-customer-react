import React from 'react';
import AuthStore from "../stores/AuthStore";
import {Redirect} from "react-router-dom";

export const setToken = (token) => {
    token.time = (new Date).getTime();
    const tokenStr = JSON.stringify(token);
    localStorage.setItem("token", tokenStr);
};

export const getToken =  () => {
    const tokenStr = localStorage.getItem("token");
    return JSON.parse(tokenStr);
};

export const setUser = (user) => {
    const userStr = JSON.stringify(user);
    localStorage.setItem("user", userStr);
};

export const getUser =  () => {
    const userStr = localStorage.getItem("user");
    return JSON.parse(userStr);
};

export const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const checkAuth = (history) => {
    if (!AuthStore.isSignedIn) {
        history.push("/sign-in");
    }
};