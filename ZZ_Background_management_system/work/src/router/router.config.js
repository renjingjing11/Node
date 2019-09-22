// 一级路由
import Home from "../views/home.js";
import Login from "../views/login.js";
import Registry from "../views/registry.js"
// 二级路由
import Page from "../views/home/page.js"
import Order from "../views/home/order.js"
import Finance from "../views/home/finance.js"
import Organization from "../views/home/organization.js"
import Data from "../views/home/data.js"
import Business from "../views/home/business.js"
// 三级路由
import Loans from "../views/order/loans.js";
import Transfer from "../views/order/transfer.js";
import Insurance from "../views/order/insurance.js";

const routes = [{
    mode: "hash",
    path: "/home",
    component: Home,
    children: [{
        path: "/home/page",
        component: Page

    }, {
        path: "/home/order",
        component: Order,
        children: [{
            path: "/home/order/loans",
            component: Loans
        }, {
            path: "/home/order/transfer",
            component: Transfer
        }, {
            path: "/home/order/insurance",
            component: Insurance
        }]
    }, {
        path: "/home/finance",
        component: Finance
    }, {
        path: "/home/organization",
        component: Organization
    }, {
        path: "/home/data",
        component: Data
    }, {
        path: "/home/business",
        component: Business
    }]
}, {
    path: "/login",
    component: Login
}, {
    path: "/registry",
    component: Registry
}, {
    path: "/",
    redirect: "/login"
}]


export default routes;