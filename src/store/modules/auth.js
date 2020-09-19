import axios from "axios";

const actions = {
    doLogin: (event, data) => {
        // const $promise = axios.post('/Auth/login', {...data});

        // $promise.then(response => commit("setToken", response.data));

        return axios.post('/login', {...data});
    },
    doLogout: () => {
        // commit("setToken", {});
        // Vue.notify({group: 'notifications', clean: true});
    },
    // setToken: ({commit}) => {
    //     commit("setToken", {token: localStorage.getItem("authToken"), userName: localStorage.getItem("userName")});
    // }
};

export default {actions};
