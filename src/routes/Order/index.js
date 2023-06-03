import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker } from 'antd';


const Order = () => {

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
            title: '订单ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户ID',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '支付时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '订单金额',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '订单号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '数量/时长',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '订单状态',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>查看详情</Button>
                </Space>
            ),
        },
    ];

    return <div>
        <Row>
            <Col>支付时间: </Col>
            <Col>
                <DatePicker.RangePicker />
            </Col>
        </Row>
        <Row>
            <Col>订单号: </Col>
            <Col><Input /></Col>
        </Row>
        <Row>
            <Col><Button>筛选</Button></Col>
            <Col><Button>重置</Button></Col>
            <Col><Button>导出</Button></Col>
        </Row>

        <Table dataSource={dataSource} columns={columns} />
        {/* <CreateSite isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </div>
}

export default Order;