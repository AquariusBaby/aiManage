import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker } from 'antd';


const Data = () => {

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
            title: 'ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '用户ID',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '用户提问',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'AI回复',
            dataIndex: 'address',
            render: (_, record) => (
                <Space size="middle">
                    <Button>查看回复</Button>
                </Space>
            ),
        },
        {
            title: '消耗token',
            dataIndex: 'address',
            key: 'address',
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
            <Col>选择站点: </Col>
            <Col>
                <Select
                    options={[
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
            </Col>
        </Row>
        <Row>
            <Col>提问时间: </Col>
            <Col>
                <DatePicker.RangePicker />
            </Col>
        </Row>
        <Row>
            <Col>用户ID: </Col>
            <Col><Input /></Col>
        </Row>
        <Row>
            <Col>关键词: </Col>
            <Col><Input /></Col>
        </Row>
        <Row>
            <Col><Button>筛选</Button></Col>
            <Col><Button>重置</Button></Col>
            <Col><Button>查看已归档对话</Button></Col>
        </Row>

        <Table dataSource={dataSource} columns={columns} />
        {/* <CreateSite isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </div>
}

export default Data;