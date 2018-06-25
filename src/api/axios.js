import axios from 'axios';
import {getToken} from "../utils/authHelper";

export const getAxios = () => {
    const token = getToken();
    let headers = {
        'Accept': 'application/json',
    };
    if (token) {
        headers = {
            ...headers,
            'Authorization': "Bearer " + token.access_token
        }
    }
    return axios.create({
        timeout: 30000,
        headers: headers
    });
};

