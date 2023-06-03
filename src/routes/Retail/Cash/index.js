import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker, Radio } from 'antd';


const Settle = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onChange() { }

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
            title: '申请时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '分销商微信',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '提现金额',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '提现方式/姓名/账号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '收款码',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '审核状态',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button>查看详情</Button> */}
                </Space>
            ),
        },
    ];

    return <div>
        <Row>
            <Col>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">全部</Radio.Button>
                    <Radio.Button value="b">未审核</Radio.Button>
                    <Radio.Button value="c">已通过</Radio.Button>
                    <Radio.Button value="d">已驳回</Radio.Button>
                </Radio.Group>
            </Col>
            {/* <Col><Search
                placeholder="姓名/联系方式"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            /></Col> */}
        </Row>

        <Table dataSource={dataSource} columns={columns} />
        {/* <CreateSite isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </div>
}

export default Settle;