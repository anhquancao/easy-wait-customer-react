import {API_URL} from "../const/env";
import {getAxios} from "./axios";


export default {
    getQueues: (page = 1) => {
        const url = API_URL + "queue?page=" + page;
        return getAxios().get(url);
    },

}