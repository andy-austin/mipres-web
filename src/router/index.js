import Vue from "vue";
import store, { isAuthenticated } from "../store";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthLayout from "@/components/AuthLayout";
import AppLayout from "@/components/AppLayout";

Vue.use(VueRouter);

const routes = [
    {
        path: "",
        component: AppLayout,
        children: [
            {
                path: "/",
                name: "Home",
                component: Home
            }
        ],
    },
    {
        path: "",
        component: AuthLayout,
        children: [
            {
                path: "/login",
                name: "Login",
                component: () => import("../views/Login.vue")
            }
        ],
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    store.dispatch("setToken").then(() => {
        if (to.name !== 'Login' && !isAuthenticated(store.state)) {
            next({name: 'Login'});
        } else {
            next();
        }
    });
});

export default router;

