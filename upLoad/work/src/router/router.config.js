// 一级路由
import Home from "../views/home"
export const routes = [{
    path: "/home",
    component: Home
}, {
    path: "/",
    redirect: "/home"
}]