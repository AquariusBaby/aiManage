import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from 'antd';

import { getSystemPayConfig, saveSystemPayConfig } from "../../../../api/systemService";

const SystemConfig = () => {
    const [updateLoading, setUpdateLoading] = useState(false);

    const [form] = Form.useForm();


    useEffect(() => {
        getSystemPayConfig().then((res) => {

            // setSystemPayConfig(res?.data || {});
            const data = res?.data || {}
            form.setFieldsValue({
                appId: data?.appId,
                appPrivateKey: data?.appPrivateKey,
                publicKey: data?.publicKey,
                // id: data?.id,
            })
        })
    }, [])

    async function onFinish(values) {

        setUpdateLoading(true);
        try {
            // form.validateFields(async (errors, params) => {
            //     console.log(errors, params);
            //     if (errors) {
            //         return;
            //     }
            const res = await saveSystemPayConfig({
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

    return <div>
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 4, }}
            wrapperCol={{ span: 10, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="应用ID"
                name="appId"
            // rules={[
            //     {
            //         required: true,
            //         message: 'Please input your appId!',
            //     },
            // ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="应用私钥"
                name="appPrivateKey"
            // rules={[
            //     {
            //         required: true,
            //         message: 'Please input your appPrivateKey!',
            //     },
            // ]}
            >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>

            <Form.Item
                label="应用公钥"
                name="publicKey"
            // rules={[
            //     {
            //         required: true,
            //         message: 'Please input your publicKey!',
            //     },
            // ]}
            >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>

            {/* <Form.Item
                label="公网安备号"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input />
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

export default SystemConfig;