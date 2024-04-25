import React, { useEffect, useState } from 'react'
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

import { roomregus, updategus } from '@/services/modules/room';
import { PersonalWrapper } from './style'
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

const Personal = () => {

    const [form] = Form.useForm();

    const navigate = useNavigate()
    const [isBtn, setIsBtn] = useState(false)
    const [disabled, setDisabled] = useState(true)

    // 存在session中的客户数据
    let Suserinfo = null
    if (sessionStorage.getItem('userinfo')) {
        Suserinfo = JSON.parse(
            tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
        )
        // console.log(Suserinfo);
    }

    // 组件挂载时触发一次
    useEffect(() => {
        console.log('我被挂载了', Suserinfo);
        // 固定显示12位*号
        const stars = Array(12).fill('*').join('');
        // Suserinfo.Gus_password.length <= 12 ? Suserinfo.Gus_password.replace(/./g, '*') : stars
        form.setFieldsValue({
            name: Suserinfo.Gus_name,
            password: Suserinfo.Gus_password.length <= 12 ? Suserinfo.Gus_password.replace(/./g, '*') : stars,
            sex: Suserinfo.Gender,
            phone: Suserinfo.Phone,
            email: Suserinfo.Email,
            address: Suserinfo.Address
        })
    }, [Suserinfo]);

    // 修改或者保存
    const ChangeBtn = async (e) => {
        if (e === '修改') {
            console.log('修改');
            setIsBtn(true)
            setDisabled(false)
        } else if (e === "保存") {
            console.log('保存');
            const values = await form.validateFields()
            values.Gus_id = Suserinfo.Gus_id
            console.log('valuess', values);

            try {
                const ugus = await updategus(values)
                console.log(ugus);
                if (ugus && ugus.status === 200) {
                    console.log('存入session', ugus.results[0]);
                    sessionStorage.setItem(
                        "userinfo",
                        tools.compile(JSON.stringify(ugus?.results[0]))
                    );
                }
            } catch {
                message.error('出错了，请重试')
            }
            setDisabled(true)
            setIsBtn(false)
        } else {
            setIsBtn(false)
            setDisabled(true)
        }
    }

    // 点击确定
    // const onFinish = async (values) => {
    //     console.log('Received values of form: ', values);
    //     try {
    //         const regs = await roomregus(values)
    //         if (regs && regs.status === 200) {
    //             message.info('注册成功，请进行登录')
    //             navigate('/login')
    //         } else {
    //             message.error(regs?.message ?? "注册失败")
    //         }
    //         console.log(regs);
    //     } catch {
    //         // message.error('')
    //     }
    // };

    return (
        <PersonalWrapper>
            <div className='main'>
                <Form
                    className='form'
                    form={form}
                    disabled={disabled}
                // onFinish={onFinish}
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
                            { required: true, whitespace: false, message: "必填" },
                            { min: 6, message: "最少输入6位字符" },
                            { max: 18, message: "最多输入18位字符" },
                        ]}
                    >
                        <Input.Password
                            visibilityToggle={false}
                            placeholder="请输入密码"
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
                            placeholder="请添加邮箱地址"
                        />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                        {...formItemLayout}
                    >
                        <Input
                            placeholder="请添加居住地址"
                        />
                    </Form.Item>
                    {/* <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 6,
                        }}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item> */}
                </Form>
                <div className='btnmain'>
                    {!isBtn && <Button className='btn' type="primary" htmlType="submit" onClick={() => ChangeBtn('修改')}>
                        修改
                    </Button>}
                    {isBtn && <Button className='btn' type="primary" htmlType="submit" onClick={() => ChangeBtn('保存')}>
                        保存
                    </Button>}
                    {isBtn && <Button className='btn' type="primary" htmlType="submit" onClick={() => ChangeBtn('取消')}>
                        取消
                    </Button>}
                </div>
            </div>
        </PersonalWrapper>
    )
}

export default Personal
