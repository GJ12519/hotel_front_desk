import React from 'react'
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

import { roomregus } from '@/services/modules/room';
import { RegWrapper } from './style';
import tools from '@/utils/tools';
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
// 性别校验
const validateGender = (rule, value) => {
    if (!value || ['男', '女'].includes(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('请输入男或女'));
};

const Reg = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate()


    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const regs = await roomregus(values)
            if (regs && regs.status === 200) {
                message.info('注册成功，请进行登录')
                navigate('/login')
            } else {
                message.error(regs?.message ?? "注册失败")
            }
            console.log(regs);
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
                            {
                                pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                                message: "用户名只能由字母、数字和下划线组成，且必须以字母开头。不得出现特殊字符（包括连字符“-”）",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        {...formItemLayout}
                        rules={[
                            { validator: validateGender },
                        ]}
                    >
                        <Input
                            placeholder="请输入性别"
                        />
                    </Form.Item>
                    <Form.Item
                        label="身份证"
                        name="IDCard"
                        {...formItemLayout}
                        rules={[
                            { required: true, whitespace: true, message: "必填" },
                            { max: 18 },
                            () => ({
                                validator: (rule, value) => {
                                    const v = value;
                                    if (v) {
                                        if (!tools.checkIDCard(v)) {
                                            return Promise.reject("请输入有效的身份证号码");
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input
                            placeholder="请输入身份证号码"
                        />
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        name="phone"
                        {...formItemLayout}
                        rules={[
                            { required: true, whitespace: true, message: "必填" },
                            () => ({
                                validator: (rule, value) => {
                                    const v = value;
                                    if (v) {
                                        if (!tools.checkPhone(v)) {
                                            return Promise.reject("请输入有效的手机号码");
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input
                            placeholder="请输入手机号"
                            maxLength={11}
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
                        label="邮箱"
                        name="email"
                        {...formItemLayout}
                        rules={[
                            () => ({
                                validator: (rule, value) => {
                                    const v = value;
                                    if (v) {
                                        if (!tools.checkEmail(v)) {
                                            return Promise.reject("请输入有效的邮箱地址");
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input
                            placeholder="请输入邮箱地址"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 6,
                        }}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </RegWrapper>
    )
}
// onClick={() => form.resetFields()}
export default Reg
