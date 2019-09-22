import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import axios from 'axios';
import Cookies from "js-cookie"
import { withRouter } from 'react-router-dom';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
    });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`
                                }
                            ],
                            initialValue: record[dataIndex]
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return (
            <EditableContext.Consumer>
                {this.renderCell}
            </EditableContext.Consumer>
        );
    }
}

class loans extends Component {
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '' };
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: '10%',
                editable: true
            },
            {
                title: 'date',
                dataIndex: 'date',
                width: '15%',
                editable: true
            },
            {
                title: 'customerName',
                dataIndex: 'customerName',
                width: '5%',
                editable: true
            },
            {
                title: 'phone',
                dataIndex: 'phone',
                width: '10%',
                editable: true
            },
            {
                title: 'type',
                dataIndex: 'type',
                width: '10%',
                editable: true
            },
            {
                title: 'money',
                dataIndex: 'money',
                width: '10%',
                editable: true
            },
            {
                title: 'handleState',
                dataIndex: 'handleState',
                width: '10%',
                editable: true
            },
            {
                title: 'serviceName',
                dataIndex: 'serviceName',
                width: '10%',
                editable: true
            },
            {
                title: 'operation',
                dataIndex: 'operation1',
                width: '10%',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm
                            title='Sure to delete?'
                            onConfirm={() => this.handleDelete(record)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null
            },
            {
                title: 'operation',
                width: '10%',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() =>
                                            this.save(form, record.key)
                                        }
                                        style={{ marginRight: 8 }}>
                                        Save
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm
                                title='Sure to cancel?'
                                onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <a
                            disabled={editingKey !== ''}
                            onClick={() => this.edit(record.key)}>
                            Edit
                        </a>
                    );
                }
            }
        ];
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    /**
     * 1.save:保存方法
     * 2.row:{customerName: "薛勇",
            date: "2017-12-8 20:59:38",
            handleState: 3,
            id: "1nklsoib6k0000",
            interestRate: 1,
            key: 0,
            money: 15,
            order: 1,
            phone: "13382421774",
            serviceName: "李家豪",
            type: "房乐贷"}
        3.axios.post('/edit',row):编辑接口
     */
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
            axios.post('/edit', { row }).then(res => {
                console.log(row);
            });
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    /**
     * 1.handleDelete：删除点击按钮
     * 2.const token = window.sessionStorage.getItem('token')： 获取token值,判断是否登陆过
     * 3.axios.post('/del')：删除接口
     * 4.axios.get('/getList')：再获取数据把页面重新渲染
     * 5.{headers: token ? { token } : {}} ==  header存储token，返回到后端中间件middleware(js文件可以打印ctx.request.header)
     */
    handleDelete = key => {
        let  token=Cookies.get('token')
        axios.post('/del',  key ).then(res => {
            if (res.data.code === 1) {
                axios
            .get('/getList', {
                headers: token ? { token } : {}
            })
            .then(res => {
                if (res.data.code === 1) {
                    this.setState({
                        // 必须往数据里添加一个字段key,已防止请求来的数据渲染不到页面上(因为antd里面必须含有一个字段key)
                        data: res.data.data.map((item, index) => {
                            item.key = index;
                            return item;
                        })
                    });
                } else if (res.data.code === 0) {
                    this.props.history.push('/login');
                }
            });
            }
        });
    };

    render() {
        const components = {
            body: {
                cell: EditableCell
            }
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            };
        });
        return (
            <div className='loans'>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName='editable-row'
                        pagination={{
                            onChange: this.cancel
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }

    /**
     * 1.componentDidMount：生命周期(一般axios请求在这里请求)
     * 2.const token = window.sessionStorage.getItem('token')： 获取token值,判断是否登陆过
     * 3.{headers: token ? { token } : {}} ==  header存储token，返回到后端中间件middleware(js文件可以打印ctx.request.header)
     */
    componentDidMount() {
       let token=Cookies.get('token')
        axios
            .get('/getList', {
                headers: token ? { token } : {}
            })
            .then(res => {
                console.log(res);
                if (res.data.code === 1) {
                    this.setState({
                        data: res.data.data.map((item, index) => {
                            item.key = index;
                            return item;
                        })
                    });
                } else if (res.data.code === 0) {
                    this.props.history.push('/login');
                }
            });
    }
}

const EditableFormTable = Form.create()(loans);

export default withRouter(EditableFormTable);
