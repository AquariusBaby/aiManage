import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker, Tag } from 'antd';


const UserFeedback = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onSearch() { }

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
            title: 'ID',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '用户ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '留言时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '头像',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '昵称',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '联系方式',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '留言类型',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '留言内容',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '状态',
            // dataIndex: 'address',
            key: 'address',
            render: (_, record) => (
                <Tag color="red">未处理</Tag>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>删除</Button>
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

export default UserFeedback;