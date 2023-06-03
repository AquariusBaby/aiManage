import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal } from 'antd';

import CreateSite from "./components/CreateSite";

const Site = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
            title: '站点ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '站点名称',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '登录账号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '最后登录时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '是否启用',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '到期时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '创建时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>进入管理</Button>
                    <Button>编辑</Button>
                    <Button>删除</Button>
                </Space>
            ),
        },
    ];

    return <div>
        <Row>
            <Col>
                <Button onClick={() => setIsModalOpen(true)}>新建站点</Button>
            </Col>
        </Row>
        <Table dataSource={dataSource} columns={columns} />
        <CreateSite isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
}

export default Site;