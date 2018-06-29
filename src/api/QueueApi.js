import {API_URL} from "../const/env";
import {getAxios} from "./axios";


export default {
    getAllQueues: (page) => {
        const url = API_URL + "queue?page=" + page;
        return getAxios().get(url);
    },
    getQueues: (userId, page = 1) => {
        const url = API_URL + "queue/user/" + userId + "?page=" + page;
        return getAxios().get(url);
    },
    saveQueue: (queue) => {
        const url = API_URL + "queue";
        return getAxios().post(url, queue);
    },

    getQueue: (id) => {
        const url = API_URL + "queue/" + id;
        return getAxios().get(url);
    },
    updateQueue: (queue) => {
        const url = API_URL + "queue/" + queue.id;
        return getAxios().put(url, queue);
    },
    deleteQueue: (id) => {
        const url = API_URL + "queue/" + id;
        return getAxios().delete(url);
    },
    registerQueue: (queueId) => {
        const url = API_URL + `queue/${queueId}/user`;
        return getAxios().post(url);
    },
    unregisterQueue: (queueId) => {
        const url = API_URL + `queue/${queueId}/user`;
        return getAxios().delete(url);
    }
}