import React from "react";
import { Table, Col, Row, Button, Form, Modal, Input } from 'antd';

const SystemConfig = () => {
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
                label="系统名称"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="后台logo"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="ICP备案号"
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

export default SystemConfig;