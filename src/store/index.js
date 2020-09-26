import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import report from "@/store/modules/report";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        nit: '',
        access_token: ''
    },
    mutations: {
        authenticate: (state, {access_token, nit}) => {
            state.nit = nit;
            state.access_token = access_token;
            localStorage.setItem('nit', nit);
            localStorage.setItem('access_token', access_token);
        },
        logout: (state) => {
            state.nit = '';
            state.access_token = '';
            localStorage.removeItem('nit');
            localStorage.removeItem('access_token');
            router.push("/login").then(() => {
            });
        }
    },
    actions: {},
    modules: {
        auth,
        report
    }
});

export const isAuthenticated = ({access_token}) => !(Vue.lodash.isEmpty(access_token));