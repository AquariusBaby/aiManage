import React, { useEffect, useState, useCallback } from "react";
import { Table, Col, Row, Button, Space, Modal, Radio, Input, DatePicker, InputNumber, Tag } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { getUserTableData, } from "../../../api/userService";
import Spacing from '../../../components/Spacing'


const PayRecord = () => {

    const [filterOptions, setFilterOptions] = useState({});
    const [dateType, setDateType] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [pageOption, setPageOption] = useState({
        size: 10,
        currentPage: 1,
        total: 0
    });

    const handleSearch = useCallback(async ({ size, currentPage, ...filterOptions }) => {
        setLoading(true);
        try {
            const res = await getUserTableData({
                size,
                currentPage,
                ...filterOptions,
                startCreateTime: !filterOptions.startCreateTime ? undefined : dayjs(filterOptions.startCreateTime).format('YYYY-MM-DD HH:mm:ss'),
                endCreateTime: !filterOptions.endCreateTime ? undefined : dayjs(filterOptions.endCreateTime).format('YYYY-MM-DD HH:mm:ss'),
            });
            setLoading(false);

            setTableData(res?.data?.data || []);
            setPageOption({
                size: res?.data?.size,
                currentPage: res?.data?.currentPage,
                total: res?.data?.total,
            })
        } catch (err) {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleSearch({
            size: 10,
            currentPage: 1,
        })
    }, [handleSearch]);

    const columns = [
        {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '注册时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '昵称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '余额',
            dataIndex: 'userCount',
            key: 'userCount',
        },
        {
            title: '是否会员',
            dataIndex: 'isVip',
            key: 'isVip',
            render: (_, record) => (
                <Tag color={record.isVip === 'PAY_SUCCESS' ? '#f50' : '#108ee9'}>{record.isVip === 'PAY_SUCCESS' ? '是' : '否'}</Tag>
            )
        },
        {
            title: '会员到期时间',
            dataIndex: 'vipEndTime',
            key: 'vipEndTime',
            render: (_, record) => (
                record.vipEndTime?.join('-')
            )
        },
        // {
        //     title: '共提问',
        //     dataIndex: 'isVip',
        //     key: 'isVip',
        //     render: (_, record) => (
        //         <Tag color={record.isVip === 'PAY_SUCCESS' ? 'success' : 'normal'}>{record.isVip ? '是' : '否'}</Tag>
        //     )
        // },
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Button
        //                 type="link"
        //                 onClick={() => {
        //                     setModalContent(record);
        //                     setIsModalOpen(true);
        //                 }}
        //             >查看详情</Button>
        //         </Space>
        //     ),
        // }
    ];

    return <div>
        <Spacing />
        <Space direction="vertical" size="middle">
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>注册时间: </Col>
                <Col>
                    <DatePicker.RangePicker
                        showTime
                        value={[filterOptions?.startCreateTime, filterOptions?.endCreateTime]}
                        onChange={(dates) => setFilterOptions(c => ({ ...c, startCreateTime: dates?.[0] || null, endCreateTime: dates?.[1] || null }))}
                    />
                </Col>
                <Col>
                    <Radio.Group value={dateType} onChange={(e) => {
                        const value = e.target.value;
                        setDateType(value);
                        let startCreateTime = null;
                        let endCreateTime = null;
                        if (value === 1) {
                            startCreateTime = dayjs().startOf('day');
                            endCreateTime = dayjs().endOf('day');
                        }
                        if (value === 2) {
                            startCreateTime = dayjs().add(-1, 'day').startOf('day');
                            endCreateTime = dayjs().add(-1, 'day').endOf('day');
                        }
                        if (value === 3) {
                            startCreateTime = dayjs().add(-2, 'day').startOf('day');
                            endCreateTime = dayjs().add(-2, 'day').endOf('day');
                        }
                        setFilterOptions(c => ({
                            ...c,
                            startCreateTime,
                            endCreateTime
                        }))
                    }}>
                        <Radio.Button value={1}>今天</Radio.Button>
                        <Radio.Button value={2}>昨天</Radio.Button>
                        <Radio.Button value={3}>前天</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>用户ID: </Col>
                <Col>
                    <InputNumber controls={false} style={{ width: 250 }} value={filterOptions?.id} onChange={(value) => setFilterOptions(c => ({ ...c, id: value }))} />
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>昵称: </Col>
                <Col>
                    <Input style={{ width: 250 }} allowClear value={filterOptions?.name} onChange={(e) => setFilterOptions(c => ({ ...c, name: e.target.value }))} />
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => handleSearch({
                            size: pageOption.size,
                            currentPage: 1,
                            ...filterOptions,
                        })}
                    >筛选</Button>
                </Col>
                <Col><Button onClick={() => {
                    setFilterOptions({});
                    setDateType(-1);
                }}>重置</Button></Col>
                {/* <Col><Button type="link">查看已归档对话</Button></Col> */}
            </Row>
        </Space>

        <Spacing h={30} />
        <Table
            loading={loading}
            rowKey="id"
            dataSource={tableData}
            columns={columns}
            pagination={{
                current: pageOption.currentPage,
                pageSize: pageOption.size,
                total: pageOption.total,
                showSizeChanger: true,
                // showTotal: true,
                onChange: (page, pageSize) => handleSearch({
                    size: pageSize,
                    currentPage: page,
                    ...filterOptions
                }),
                onShowSizeChange: (current, size) => handleSearch({
                    size: size,
                    currentPage: current,
                    ...filterOptions
                })
            }}
        />
    </div>
}

export default PayRecord;