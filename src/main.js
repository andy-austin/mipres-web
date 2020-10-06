import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import VueLodash from "vue-lodash";
import VueSocketIOExt from 'vue-socket.io-extended';

import store, {isAuthenticated} from "./store";
import router from "./router";
import isEqual from "lodash/isEqual";
import io from 'socket.io-client';

import {ValidationProvider, extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';

/**
 * Socket.io connection
 **/
const socket = io(process.env.VUE_APP_BASE_URL, {transports: ['polling']});

/**
 * Error messages configuration
 **/
extend('required', {...required, message: 'This field is required'});

/**
 * Vue configuration
 **/
Vue.config.productionTip = false;

Vue.use(require('vue-moment'));
Vue.use(VueLodash, {lodash: {isEqual}});
Vue.use(VueSocketIOExt, socket, {store});

new Vue({store, router, render: h => h(App), components: {ValidationProvider}}).$mount("#app");


/**
 * Axios configuration
 **/
axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`;

axios.interceptors.request.use(config => {
    if (isAuthenticated(store.state)) {
        return {...config, headers: {...config.headers, Authorization: `Bearer ${store.state.access_token}`}};
    }
    return config;
});


