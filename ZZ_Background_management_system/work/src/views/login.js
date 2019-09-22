import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import axios from "axios";
import Cookies from "js-cookie"
/** 
 * 路由跳转  
 * sub1 引入 react-router-dom 的 withRouter  
 * sub2 页面即可写打印this.props(包含很多方法)
*/
import {withRouter} from "react-router-dom";
import "../style/loginStyle/login.css";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

 class login extends Component {

    /**
     * 1.state:请求数据放在这里
     * 2.check:登陆方法
     * 3.registry:注册方法
     *  */

    //sub1
    state = {
        checkNick: false
      };

      /**
       * sub2
       * 1.values:{phone,password}==这是传给后台的注册过后的 phone 和 password
       * 2.window.sessionStorage.setItem("token",res.data.token) == 本地存储token,为了做请求拦截
       * 3.this.props.history.push("/home/page") == 跳转路由
       */
      check = () => {
        this.props.form.validateFields((err,values) => {
          if (!err) {
            // 登录接口
            axios.post("/login",values).then(res=>{
                // console.log(res)
                if(res.data.code===1){
                    // window.sessionStorage.setItem("token",res.data.token)
                    Cookies.set('token', res.data.token, { expires: 7 });
                    this.props.history.push("/home/page")
                }else{
                    alert("no user")
                }
            })
          }
        });
      };

      //sub3   注册页面
      registry=()=>{
            this.props.history.push("/registry")
      };

      handleChange = e => {
        this.setState(
          {
            checkNick: e.target.checked,
          },
          () => {
            this.props.form.validateFields(['nickname'], { force: true });
          },
        );
      };
      
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrap">
            <div className="login">
                {/* 电话验证 */}
                <Form.Item {...formItemLayout} label="phone">
                    {getFieldDecorator('phone', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your phone',
                        },
                        ],
                    })(<Input placeholder="Please input your phone" className="input"/>)}
                    </Form.Item>
                    {/* 密码验证 */}
                <Form.Item {...formItemLayout} label="password">
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: this.state.checkNick,
                            message: 'Please input your password',
                        },
                        ],
                    })(<Input placeholder="Please input your password" className="input"/>)}
                </Form.Item>
                <Form.Item {...formTailLayout}>
                <Button type="primary" onClick={this.check} className="check">
                    登录
                </Button>
                <Button type="primary" onClick={this.registry} className="registry">
                    注册
                </Button>
                </Form.Item>
            </div>
        </div>
        )
    }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(withRouter(login));

export default WrappedDynamicRule;
