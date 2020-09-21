import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import report from "@/store/modules/report";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        access_token: '',
    },
    mutations: {
        authenticate: (state, {access_token}) => {
            state.access_token = access_token;
            localStorage.setItem('access_token', access_token);
        },
        logout: (state) => {
            state.access_token = '';
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