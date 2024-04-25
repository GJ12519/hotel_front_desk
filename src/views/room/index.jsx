import React, { useEffect, useState } from 'react'
import { RoomWrapper } from './style'
import RoomItem from '@/components/room-item'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHomeDataAction } from '@/store/modules/home'
import { isEmptyO } from '@/utils'
import { Modal, Form, DatePicker, Input, message } from 'antd'
import tools from '@/utils/tools'
import moment from "moment";

import { reserveAorder } from '@/services/modules/room'

const { RangePicker } = DatePicker
const formItemLayout = {
    labelCol: {
        xs: { span: 23 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 23 },
        sm: { span: 15 },
    },
};

const Room = () => {
    const [isModal, setIsModal] = useState(false)
    const dispath = useDispatch()
    const [form] = Form.useForm();
    const [roomtype, setRoomtype] = useState()

    // 存在session中的客户数据
    let Suserinfo = null
    if (sessionStorage.getItem('userinfo')) {
        Suserinfo = JSON.parse(
            tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
        )
        // console.log(Suserinfo);
    }

    useEffect(() => {
        dispath(fetchHomeDataAction())
    }, [dispath])

    const { roominfo } = useSelector((state) => ({
        roominfo: state.home.roominfo
    }))

    const Reserve = (e) => {
        setRoomtype(e.rt_id)
        console.log('sasasasa', Suserinfo.Gus_name);
        setTimeout(() => {
            // 设置表单信息
            form.setFieldsValue({
                name: Suserinfo.Gus_name,
                IDCard: Suserinfo.IDCard
            });
        });
        setIsModal(true);
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            // 处理时间
            const Atime = {
                stime: moment(values.btime[0]._d).format('YYYY-MM-DD HH:mm:ss'),
                etime: moment(values.btime[1]._d).format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(Atime, roomtype);

            const { btime, ...rest } = values
            Object.assign(rest, { ...Atime })
            rest.rt_id = roomtype
            rest.Gus_id = Suserinfo.Gus_id
            console.log('rest', rest);

            // 执行预订
            const reserveRes = await reserveAorder(rest)
            console.log('456456', reserveRes);
            if (reserveRes && reserveRes?.status == 200) {
                // 有客房
                console.log('有');
                message.info(`恭喜您预订${reserveRes.results}成功，请在规定时间内入住`)
            } else if (reserveRes && reserveRes?.status == 202) {
                // 无客房
                console.log('无');
                message.info(`恭喜您预订${reserveRes.results}成功，请在预计时间内入住`)
            } else {
                message.error('出错了，请联系客服')
            }
            console.log('reserveRes', reserveRes);
            handleCancel()
        } catch (error) {
            // console.error('表单验证失败:', error);
        }
    };
    const handleCancel = () => {
        // 重置表单
        form.resetFields()
        setIsModal(false);
    };

    return (
        <RoomWrapper>
            {
                isEmptyO(roominfo) && roominfo.map(item => {
                    // console.log('96999', item);
                    return <RoomItem itemmsg={item} key={item.rt_id} itemwidth="40%" itemClick={Reserve} />
                })
            }

            <Modal
                title={'预订'}
                visible={isModal}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <Form
                    form={form}
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        {...formItemLayout}
                        rules={[
                            { required: true, whitespace: true, message: "必填" },
                            { max: 12, message: "最多输入12位字符" },
                        ]}
                    >
                        <Input
                            placeholder="请输入姓名"
                            disabled={false}
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
                        label={'预订时间'}
                        name="btime"
                        {...formItemLayout}
                        rules={[{ required: true, message: "请选择状态" }]}
                    >
                        <RangePicker
                            disabled={false}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </RoomWrapper >
    )
}

export default Room
