import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import report from "@/store/modules/report";
import router from "@/router";
import {setCookies} from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {
        authenticate: (state, {access_token, nit}) => {
            setCookies(state, access_token, nit);
        },
        logout: (state) => {
            setCookies(state);
            router.push("/login").then(() => {
            });
        }
    },
    actions: {
        socket_addressing({commit}, message) {
            commit('updateState', message);
        }
    },
    modules: {auth, report}
});

export const isAuthenticated = ({access_token}) => access_token && !Vue.lodash.isEqual(access_token, 'null');