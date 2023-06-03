import React from "react";
import { Table, Col, Row, Button, Form, Modal, Input, Switch, Radio } from 'antd';

const RetailSetting = ({ isModalOpen, setIsModalOpen }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = () => {
        // setIsModalOpen(false);
    };
    const onFinishFailed = () => {
        // setIsModalOpen(false);
    };

    return <div>
        <Form
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
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
            </Form.Item>

            <Form.Item
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
            </Form.Item>

            <Form.Item
                label="分销层级"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Radio>2级</Radio>
            </Form.Item>

            <Form.Item
                name="直推分佣比例"

                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Input placeholder="maxLength is 6" />
            </Form.Item>

            <Form.Item
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
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default RetailSetting;