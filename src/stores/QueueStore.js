import React from 'react';
import {computed, observable, action} from "mobx";
import AuthApi from "../api/AuthApi";
import {setToken, setUser, signOut} from "../utils/authHelper";
import QueueApi from "../api/QueueApi";

class QueueStore {
    @observable queues = [];

    @observable isLoading = false;

    getQueues = async (page = 1) => {
        this.isLoading = true;
        try {
            const res = await QueueApi.getQueues(page);
            this.queues = res.data.queues;
        } catch (e) {
        } finally {
            this.isLoading = false;
        }
    }
}

export default new QueueStore();