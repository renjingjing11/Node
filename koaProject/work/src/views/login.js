import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /**
                 * 0.'/login':登录接口
                 * 1.values是对象:{username,password}
                 * 2.token设置token值：判断是否登录过,
                 *                     是：初始化数据即可显示
                 *                     否：初始化数据不显示
                 * 3.window.sessionStorage.setItem("token",token):本地存储,{'token':名字,token:token值}
                 */
                Axios.post('/login', {
                    phone: values.username,
                    password: values.password
                }).then(res => {
                    if (res.data.code === 1) {
                        let token = res.data.token;
                        window.sessionStorage.setItem('token', token);
                        this.props.history.push('/list');
                    }
                });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className='login-form'>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type='user'
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder='Username'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type='lock'
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type='password'
                                placeholder='Password'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(login);

export default withRouter(WrappedNormalLoginForm);
