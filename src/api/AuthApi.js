import {AUTH_API_URL} from "../const/env";
import {getAxios} from "./axios";



export default {
    register: (user) => {
        return getAxios().post(AUTH_API_URL + "sign-up", user);
    },

    signIn: (user) => {
        return getAxios().post(AUTH_API_URL + "sign-in", user);
    },

    me: () => {
        return getAxios().get(AUTH_API_URL + "me");
    }
}