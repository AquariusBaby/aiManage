import React from "react";
import { Table, Col, Row, Button, Form, Modal, Input, Radio } from 'antd';

const InterfaceConfig = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        // setIsModalOpen(false);
    };
    const handleCancel = () => {
        // setIsModalOpen(false);
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
                label="内容输出方式"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Radio.Group defaultValue={2}>
                    <Radio value={1}>一次性完整输出</Radio>
                    <Radio value={2}>流式回复</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="接口通道"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Radio.Group defaultValue={3}>
                    <Radio value={1}>直连</Radio>
                    <Radio value={2}>使用接口文件转发</Radio>
                    <Radio value={3}>反向代理</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="反代域名"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input />
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

export default InterfaceConfig;