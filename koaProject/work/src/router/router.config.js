import Login from "../views/login"
import List from "../views/list"
import Registry from "../views/registry"
export const routes = [{
    path: "/login",
    component: Login
}, {
    path: "/list",
    component: List
}, {
    path: "/registry",
    component: Registry
}, {
    path: "/",
    redirect: "/login"
}]