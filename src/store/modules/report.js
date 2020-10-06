import axios from "axios";

const state = {
    loading: false,
    percent: 0
}

const mutations = {
    updateState: (state, {percent, user}) => {
        console.log(user, percent);
        state.loading = percent !== 100;
        state.percent = percent;
    },
}

const actions = {
    saveAddressing: (event, data) => {
        const $promise = axios.post('/addressing', {...data});

        $promise.then(
            () => {
            },
            () => {
            }
        );

        return $promise;
    },
    getAddressing: (event, {startDate, endDate}) => {
        const $promise = axios.get(`/addressing?startDate=${startDate}&endDate=${endDate}`);

        $promise.then(
            () => {
            },
            () => {
            }
        );

        return $promise;
    },
};

export default {state, actions, mutations};
