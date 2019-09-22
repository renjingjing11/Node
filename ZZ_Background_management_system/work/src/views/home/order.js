import React, { Component } from 'react'
import RouterView from "../../router/RouterView.js";
import "../../style/orderStyle/order.css"

import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default class order extends Component {
    render() {
        return (
            <div className="order">
                    <Layout className="order-wrap">
                        <Content className="order-main">
                            <RouterView routes={this.props.children}/>
                        </Content>
                        <Footer className="order-footer">Footer</Footer>
                    </Layout>
            </div>
        )
    }
}
