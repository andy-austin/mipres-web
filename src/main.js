import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import VueLodash from "vue-lodash";

import store, {isAuthenticated} from "./store";
import router from "./router";
import first from "lodash/first";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

import {ValidationProvider, extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';

extend('required', {...required, message: 'This field is required'});

Vue.config.productionTip = false;

Vue.use(require('vue-moment'));
Vue.use(VueLodash, {lodash: {first, isEmpty, isNil}});

new Vue({
    store,
    router,
    render: h => h(App),
    components: {ValidationProvider}
}).$mount("#app");

axios.defaults.baseURL = 'http://157.245.7.224/api';

axios.interceptors.request.use(config => {
    if (isAuthenticated(store.state)) {
        return {...config, headers: {...config.headers, Authorization: `Bearer ${store.state.access_token}`}};
    }
    return config;
});


