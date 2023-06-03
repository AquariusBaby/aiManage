import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker } from 'antd';


const UserManage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onSearch() {

    }

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '禁言时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '用户ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '注册时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '头像昵称',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '手机号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '余额',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '会员',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '共消费',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '共提问',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '推荐人',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>解除禁言</Button>
                </Space>
            ),
        },
    ];

    return <div>
        <Row>
            <Col><Button>+ 新增禁言用户</Button></Col>
            <Col><Input.Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            /></Col>
        </Row>

        <Table dataSource={dataSource} columns={columns} />
        {/* <CreateSite isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </div>
}

export default UserManage;