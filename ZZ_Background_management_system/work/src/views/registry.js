import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import {withRouter} from "react-router-dom";
import "../style/registryStyle/registry.css"
import axios from "axios"

 class registry extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            axios.post("registry",{values}).then(res=>{
               if(res.data.code===1){
                   this.props.history.push("/login")
               }
            })
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="registryPage">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="phone"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(withRouter(registry));

export default WrappedNormalLoginForm;
