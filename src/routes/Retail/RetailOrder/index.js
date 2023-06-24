import React, { useEffect, useState, useCallback } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, InputNumber, DatePicker, Radio, message } from 'antd';
import dayjs from 'dayjs';
import {
    SearchOutlined
} from '@ant-design/icons';

import Spacing from "../../../components/Spacing";

import { getCommissionRecord, getCommissionRecordById } from "../../../api/cashServcie";

const RetailOrder = () => {

    const [filterOptions, setFilterOptions] = useState({});
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
            const res = await getCommissionRecord({
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
            dataIndex: 'userId',
        },
        {
            title: '订单ID',
            dataIndex: 'orderId',
        },
        {
            title: '佣金',
            dataIndex: 'money',
        },
        {
            title: '提现金额',
            dataIndex: 'money',
        },
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Button onClick={() => apply(record)}>申请提现</Button>
        //         </Space>
        //     ),
        // },
    ];

    return <div>
        <Spacing />
        <Space direction="vertical" size="middle">
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 135 }}>创建时间: </Col>
                <Col>
                    <DatePicker.RangePicker
                        showTime
                        value={[filterOptions?.startCreateTime, filterOptions?.endCreateTime]}
                        onChange={(dates) => setFilterOptions(c => ({ ...c, startCreateTime: dates?.[0] || null, endCreateTime: dates?.[1] || null }))}
                    />
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 135 }}>用户ID: </Col>
                <Col>
                    <InputNumber controls={false} style={{ width: 250 }} value={filterOptions?.userId} onChange={(value) => setFilterOptions(c => ({ ...c, userId: value }))} />
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 135 }}>订单ID: </Col>
                <Col>
                    <InputNumber controls={false} style={{ width: 250 }} value={filterOptions?.orderId} onChange={(value) => setFilterOptions(c => ({ ...c, orderId: value }))} />
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
                }}>重置</Button></Col>
            </Row>
        </Space>

        <Spacing h={30} />

        <Table
            loading={loading}
            dataSource={tableData}
            columns={columns}
            rowKey="id"
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

export default RetailOrder;