import axios from "axios";

const actions = {
    doLogin: ({commit}, data) => {
        const $promise = axios.post('/login', {...data});

        $promise.then(response => commit("authenticate", response.data));

        return $promise;
    },
    setToken: ({commit}) => {
        commit("authenticate", {
            temp_token_pres: localStorage.getItem("tempTokenPres") || '',
            temp_token_prov: localStorage.getItem("tempTokenProv") || ''
        });
    }
};

export default {actions};
