import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import VueLodash from "vue-lodash";

import store from "./store";
import router from "./router";
import first from "lodash/first";
import isEmpty from "lodash/isEmpty";

import {ValidationProvider, extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';

extend('required', {...required, message: 'This field is required'});

Vue.config.productionTip = false;

Vue.use(VueLodash, {lodash: {first, isEmpty}});

new Vue({
    store,
    router,
    render: h => h(App),
    components: {ValidationProvider}
}).$mount("#app");

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';


