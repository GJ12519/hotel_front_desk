import React, { useEffect } from 'react'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    message
} from 'antd';
import { useNavigate } from 'react-router-dom'
import tools from '@/utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserinfoAction } from '@/store/modules/home'

import { roomregus, roomlogin } from '@/services/modules/room';
import { RegWrapper } from './style';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 5,
        },
    },
    wrapperCol: {
        xs: {
            span: 10,
        },
        sm: {
            span: 16,
        },
    },
};

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userinfo = useSelector((state) => state.home.userinfo)
    console.log('12121212', userinfo);

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const logins = await roomlogin(values)
            console.log('1111', logins);

            if (logins && logins.status === 200) {
                // 存入store
                await dispatch(changeUserinfoAction(logins.users))
                // 存入secsssion
                console.log('2121');
                sessionStorage.setItem(
                    "userinfo",
                    tools.compile(JSON.stringify(logins.users))
                );
                navigate('/home')
                message.info('登录成功')
            } else {
                message.error(logins?.message ?? "登录失败")
            }
            // console.log(regs);
        } catch {
            // message.error('')
        }

    };

    return (
        <RegWrapper>
            <div className='main'>
                <Form
                    className='form'
                    form={form}
                    disabled={false}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        {...formItemLayout}
                        rules={[
                            { required: true, whitespace: true, message: "必填" },
                            { max: 12, message: "最多输入12位字符" },
                        ]}
                    >
                        <Input
                            placeholder="请输入用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        {...formItemLayout}
                        rules={[
                            { required: true, whitespace: true, message: "必填" },
                            { min: 6, message: "最少输入6位字符" },
                            { max: 18, message: "最多输入18位字符" },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 6,
                        }}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </RegWrapper>
    )
}

export default Login
