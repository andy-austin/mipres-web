import axios from "axios";

const actions = {
    doLogin: ({commit}, data) => {
        const $promise = axios.post('/login', {...data});

        $promise.then(response => commit("authenticate", {...response.data, nit: data.nit}));

        return $promise;
    },
    setToken: ({commit}) => {
        const nit = localStorage.getItem("nit");
        const access_token = localStorage.getItem("access_token");

        commit("authenticate", {access_token, nit});
    }
};

export default {actions};
