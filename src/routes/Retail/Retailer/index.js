import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker } from 'antd';


const Retailer = () => {

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
            title: '用户ID',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '成为分销商时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '微信',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '姓名',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '手机号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '可提现/已获得总佣金',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '他的上级',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>下级分销商</Button>
                    <Button>推广的用户</Button>
                    <Button>分销订单</Button>
                </Space>
            ),
        },
    ];

    return <div>
        <Row>
            <Col><Input.Search
                placeholder="昵称/姓名/手机号"
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

export default Retailer;