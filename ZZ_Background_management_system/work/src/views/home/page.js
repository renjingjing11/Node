import React, { Component } from 'react'
import "../../style/pageStyle/page.css"
import "../../fonts/iconfont.css"
import Line from "../../components/Line.js"
import Circle from "../../components/circle.js"

// antd排版样式
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

export default class page extends Component {
    render() {
        return (
            <div className="page">
                 <Layout className="page-wrap">
                    <Layout className="page-right">
                        <Header className="header">
                            <ul className="search">
                                 <li><i className="iconfont icon-angle-left"></i></li>
                                 <li><i className="iconfont icon-angle-right"></i></li>
                                 <li><input type="text" placeholder="搜索"/></li>
                            </ul>
                        </Header>
                        <Content className="main">
                            <div className="navLine">
                                <Line/>
                            </div>
                            <div className="mainBox">
                                <div className="main-left">
                                    <Circle/>
                                </div>
                                <div className="main-right">
                                    导航条
                                </div>
                            </div>
                           
                        </Content>
                        <Footer className="footer">Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
