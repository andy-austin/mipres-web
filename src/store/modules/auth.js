import axios from "axios";

const actions = {
    doLogin: ({commit}, data) => {
        const $promise = axios.post('/login', {...data});

        $promise.then(response => commit("authenticate", {...response.data, nit: data.nit}));

        return $promise;
    },
    setToken: ({commit}) => {
        commit("authenticate", {
            access_token: localStorage.getItem("access_token") || '',
            nit: localStorage.getItem("nit") || ''
        });
    }
};

export default {actions};
