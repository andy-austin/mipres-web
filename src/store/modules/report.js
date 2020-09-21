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
    getAddressing: (event, {startDate, endDate}) => {
        return axios.get(`/addressing?startDate=${startDate}&endDate=${endDate}`);
    },
};

export default {actions};
