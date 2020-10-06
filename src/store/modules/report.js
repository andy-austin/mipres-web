import axios from "axios";
import store from "@/store";

const state = {
    loading: false,
    percent: 0
}

const mutations = {
    updateState: (state, {percent, user}) => {
        if (store.state.nit === user) {
            state.loading = percent !== 100;
            state.percent = percent;
        }
    },
}

const actions = {
    saveAddressing: (event, data) => {
        return axios.post('/addressing', {...data});
    },
    getAddressing: (event, {startDate, endDate}) => {
        return axios.get(`/addressing?startDate=${startDate}&endDate=${endDate}`);
    },
};

export default {state, actions, mutations};
