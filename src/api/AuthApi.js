import {API_URL} from "../const/env";
import {getAxios} from "./axios";



export default {
    register: (user) => {
        return getAxios().post(API_URL + "auth/sign-up", user);
    },

    signIn: (user) => {
        return getAxios().post(API_URL + "auth/sign-in", user);
    },

    me: () => {
        return getAxios().get(API_URL + "auth/me");
    }
}