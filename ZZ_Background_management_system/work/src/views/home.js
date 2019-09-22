import React, { Component } from 'react';
import RouterView from '../router/RouterView.js';
import '../style/homeStyle/home.css';
import '../fonts/iconfont.css';
import { NavLink, withRouter } from 'react-router-dom';
// antd排版样式
import { Layout, Menu, Icon, Button } from 'antd';
const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

class home extends Component {
    state = {
        collapsed: false,
        // 导航添加 路由 数组
        tabs: []
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <div className='home'>
                <Layout className='home-wrap'>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        className='home-left'>
                        <div className='message'>
                            <span></span>
                            <span>北京乐智慧代理</span>
                        </div>
                        <div className='logo' />
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={['1']}
                            mode='inline'>
                            <Menu.Item key='1'>
                                <Icon type='pie-chart' />
                                <span>首页</span>
                                <NavLink to='/home/page'></NavLink>
                            </Menu.Item>
                            <SubMenu
                                key='sub1'
                                title={
                                    <span>
                                        <Icon type='user' />
                                        <NavLink to='/home/order/loans'>
                                            订单管理
                                        </NavLink>
                                    </span>
                                }>
                                <Menu.Item key='3'>
                                    <span>贷款订单</span>
                                    <NavLink to='/home/order/loans'></NavLink>
                                </Menu.Item>
                                <Menu.Item key='4'>
                                    <span>转单订单</span>
                                    <NavLink to='/home/order/transfer'></NavLink>
                                </Menu.Item>
                                <Menu.Item key='5'>
                                    <span>保险订单</span>
                                    <NavLink to='/home/order/insurance'></NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key='sub2'
                                title={
                                    <span>
                                        <Icon type='team' />
                                        <NavLink to='/home/finance'>
                                            财务管理
                                        </NavLink>
                                    </span>
                                }></SubMenu>
                            <Menu.Item key='9'>
                                <Icon type='file' />
                                <span>组织架构</span>
                                <NavLink to='/home/organization'></NavLink>
                            </Menu.Item>
                            <Menu.Item key='10'>
                                数据统计<NavLink to='/home/data'></NavLink>
                            </Menu.Item>
                            <Menu.Item key='11'>
                                商务管理<NavLink to='/home/business'></NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className='page-right'>
                        <Header className='page-header'>
                            {/* 导航条添加路由 */}
                            {this.state.tabs.map((item, index) => {
                                return (
                                    <Button
                                        type={
                                            this.props.location.pathname ===
                                            item
                                                ? 'primary'
                                                : ''
                                        }
                                        key={index}
                                        onClick={() => {
                                            this.changeTabs(item);
                                        }}>
                                        {item}
                                    </Button>
                                );
                            })}
                        </Header>
                        <Content className='main'>
                            <RouterView routes={this.props.children} />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
    // 在首页 componentDidMount  实现原理是hash路由的onhashchange事件
    componentDidMount() {
        window.onhashchange = () => {
            console.log(window.location.href);
            let tabs = [...this.state.tabs];
            if (!tabs.find(item => item === window.location.hash.slice(1))) {
                tabs.push(window.location.hash.slice(1));
            }
            this.setState({
                tabs
            });
        };
    }
    changeTabs(path) {
        this.props.history.push(path);
    }
}

export default withRouter(home);
