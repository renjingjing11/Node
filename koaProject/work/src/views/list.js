import React, { Component } from 'react';
import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Button,
    Modal
} from 'antd';
/**
 * 1.withRouter是react-router-dom：一个方法,为了跳转路由
 * 2.axios:请求数据服务端数据的
 */
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

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

class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '',
            visible: false,
            shop: '',
            price: ''
        };
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: '25%',
                editable: true
            },
            {
                title: 'shop',
                dataIndex: 'shop',
                width: '15%',
                editable: true
            },
            {
                title: 'price',
                dataIndex: 'price',
                width: '40%',
                editable: true
            },
            {
                title: 'operation',
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
            },
            {
                title: 'operation1',
                dataIndex: 'operation1',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm
                            title='Sure to delete?'
                            onConfirm={() => this.handleDelete(record)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null
            }
        ];
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            /**
             * 1.'/edit':编辑接口
             * 2.row:是整个一行数据
             * 3.this.getList():调用初始化数据,重修渲染数据
             */
            Axios.post('/edit', row).then(res => {
                if (res.data.code === 1) {
                    this.getList();
                }
            });
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
        });
    }

    /**
     * 1.handleDelete:删除按钮方法
     * 2.record:删除这一整条数据
     * 3.'/del'：服务端接口
     * 4.this.getList():调用初始化数据，重修渲染页面
     */
    handleDelete(record) {
        Axios.post('/del', record).then(res => {
            if (res.data.code === 1) {
                this.getList();
            }
        });
    }
    edit(key) {
        this.setState({ editingKey: key });
    }

    //   ======
    /**
     * 1.showModal：弹框
     * 2.handleOk：弹框内的确定按钮
     * 3.'/add':添加接口
     * 4.shop:数据双向绑定,
     *    sub1:在input框上绑定onChange事件：onChange={this.changePrice.bind(this)} 
     *    sub2:设置value值：value={this.state.price}
     *    sub3:绑定的onChange事件中：changeShop：this.setState({shop:e.target.value})
     *                              changePrice：this.setState({shop:e.target.value})
     * 5.this.state.shop,this.state.price即可传到接口传给服务端
     */
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false
        });
        Axios.post('/add', {
            shop: this.state.shop,
            price: this.state.price
        }).then(res => {
            if (res.data.code === 1) {
                this.getList();
            }
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    changeShop(e) {
        this.setState({
            shop: e.target.value
        });
    }

    changePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

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
            <div className='list'>
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
                <Button type='primary' onClick={this.showModal.bind(this)}>
                    添加
                </Button>
                <div>
                    <Modal
                        title='Basic Modal'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        <p>
                            <Input
                                onChange={this.changeShop.bind(this)}
                                value={this.state.shop}
                                placeholder='请输入商品名'
                            />
                        </p>
                        <p>
                            <Input
                                onChange={this.changePrice.bind(this)}
                                value={this.state.price}
                                placeholder='请输入价格'
                            />
                        </p>
                    </Modal>
                </div>
            </div>
        );
    }


    /**
     * 1.getList：封装初始化函数,都可调用
     * 2.componentDidMount:在这里一般请求初始化函数
     */
    getList() {
        if (window.sessionStorage.getItem('token')) {
            Axios.get('/getList').then(res => {
                console.log(res.data.data);
                if (res.data.code === 1) {
                    this.setState({
                        data: res.data.data.map((item, index) => {
                            item['key'] = index;
                            return item;
                        })
                    });
                }
            });
        }
    }
    componentDidMount() {
        this.getList();
    }
}

const EditableFormTable = Form.create()(list);
export default withRouter(EditableFormTable);
