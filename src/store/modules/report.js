import axios from "axios";
import store from "@/store";

const state = {
    loading: localStorage.getItem('wasLoading') === 'Yes',
    percent: 0
}

const mutations = {
    updateState: (state, {percent, user}) => {
        if (store.state.nit === user) {
            state.loading = percent !== 100;
            state.percent = percent;

            if (!state.loading) {
                localStorage.removeItem('wasLoading');
            }
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
    scheduleAddressing: (event, data) => {
        return axios.post('/addressing-scheduler', {...data});
    },
};

export default {state, actions, mutations};
