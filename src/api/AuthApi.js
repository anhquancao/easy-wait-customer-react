import {API_URL} from "../const/env";
import axios from 'axios';

export default {
    register: (user) => {
        return axios.post(API_URL + "auth/sign-up",user);
    }
}