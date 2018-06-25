import React from 'react';
import {observable, action} from "mobx";
import QueueApi from "../api/QueueApi";

class QueueStore {
    @observable queues = [];

    @observable isLoading = false;

    @observable queue = {};

    @observable messages = {};

    @action
    getQueues = async (page = 1) => {
        this.isLoading = true;
        try {
            const res = await QueueApi.getQueues(page);
            this.queues = res.data.queues;
        } catch (e) {
        } finally {
            this.isLoading = false;
        }
    };

    @action
    updateForm = (field, value) => {
        this.queue[field] = value;
    };

    @action
    saveQueue = async () => {
        try {
            this.isLoading = true;
            await QueueApi.saveQueue(this.queue);
            return true;
        } catch (e) {
            this.messages = e.response.data.messages;
            return false;
        } finally {
            this.isLoading = false;
        }
    };

    @action
    resetForm = () => {
        this.queue = {};
        this.messages = {}
    };

    @action
    loadQueue = async (id) => {
        this.isLoading = true;
        try {
            const res = await  QueueApi.getQueue(id);
            this.queue = res.data.queue;
        } catch (e) {
        } finally {
            this.isLoading = false;
        }
    }

    @action
    updateQueue = async () => {
        this.isLoading = true;
        try {
            await QueueApi.updateQueue(this.queue);
            return true;
        }catch (e) {
            this.messages = e.response.data.message;
            return false;
        }
        finally {

        }
    };

    @action
    deleteQueue = (id) => {
        QueueApi.deleteQueue(id);
        this.queues = this.queues.filter(queue => queue.id !== id);
    }
}

export default new QueueStore();