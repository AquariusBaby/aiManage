import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker } from 'antd';


const RetailOrder = () => {

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
            title: '下单时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '客户ID',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '客户微信',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '订单号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '订单金额',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '支付状态',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '直接推荐人',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '间接推荐人',
            dataIndex: 'address',
            key: 'address',
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

export default RetailOrder;