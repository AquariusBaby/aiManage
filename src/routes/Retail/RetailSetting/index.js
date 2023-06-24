import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Radio, message } from 'antd';

import { getRetailSettingRecord, updateRetailSetting } from "../../../api/cashServcie";

const RetailSetting = () => {

    const [updateLoading, setUpdateLoading] = useState(false);
    const [form] = Form.useForm();

    async function onFinish(values) {
        // setIsModalOpen(false);
        setUpdateLoading(true);
        try {
            // form.validateFields(async (errors, params) => {
            //     console.log(errors, params);
            //     if (errors) {
            //         return;
            //     }
            const res = await updateRetailSetting({
                ...values
            });
            setUpdateLoading(false);

            if (res.code === 200 && res.message === null) {
                message.success('保存成功！');
                return;
            }
            message.success(res.message);

            // })
        } catch (error) {
            setUpdateLoading(false);
            console.log(error, 'error');
        }
    };

    useEffect(() => {
        getRetailSettingRecord({
            currentPage: 1,
            size: 10
        }).then((res) => {
            // console.log(res);
            const data = res?.data?.data?.[0] || {};

            // setDetail(data);
            form.setFieldsValue({
                type: data?.type || 'one',
                scale: data?.scale,
                id: data.id,
            })
        })
    }, []);

    return <div>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4, }}
            wrapperCol={{ span: 16, }}
            initialValues={{ type: 'one', }}
            onFinish={onFinish}
            autoComplete="off"
        >
            {/* <Form.Item
                label="分销开关"
                name="username"
                valuePropName="checked"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Switch />
            </Form.Item> */}

            {/* <Form.Item
                label="自动通过审核"
                name="username"
                valuePropName="checked"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Switch />
            </Form.Item> */}

            <Form.Item
                label="分销层级"
                name="type"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value={'ONE'}>一级</Radio>
                    <Radio value={'TWO'}>二级</Radio>
                    <Radio value={'STORY'}>店长级别</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="分佣比例"
                name="scale"
            >
                <Input placeholder="maxLength is 6" />
            </Form.Item>

            {/* <Form.Item
                name="间推分佣比例"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Input placeholder="maxLength is 6" />
            </Form.Item>

            <Form.Item
                name="分销协议"

                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Input.TextArea placeholder="maxLength is 6" />
            </Form.Item> */}

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" loading={updateLoading} htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default RetailSetting;