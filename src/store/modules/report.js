import axios from "axios";

const actions = {
    saveAddressing: ({commit}, data) => {
        const $promise = axios.post('/addressing', {...data});

        $promise.then(
            () => {
            },
            () => commit("logout")
        );

        return $promise;
    },
    getAddressing: ({commit}, {startDate, endDate}) => {
        const $promise = axios.get(`/addressing?startDate=${startDate}&endDate=${endDate}`);

        $promise.then(
            () => {
            },
            () => commit("logout")
        );

        return $promise;
    },
};

export default {actions};
