import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import report from "@/store/modules/report";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tempTokenPres: '',
        tempTokenProv: '',
    },
    mutations: {
        authenticate: (state, {temp_token_pres = '', temp_token_prov = ''}) => {
            state.tempTokenPres = temp_token_pres;
            state.tempTokenProv = temp_token_prov;
            localStorage.setItem("tempTokenPres", temp_token_pres);
            localStorage.setItem("tempTokenProv", temp_token_prov);
        },
    },
    actions: {},
    modules: {
        auth,
        report
    }
});
