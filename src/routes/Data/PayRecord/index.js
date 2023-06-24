import React, { useEffect, useState, useCallback } from "react";
import { Table, Col, Row, Button, Space, Modal, Radio, Input, DatePicker, InputNumber, Descriptions, Tag } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { getPayRecord, } from "../../../api/dataService";
import Spacing from '../../../components/Spacing'

const PayTypeEnum = {
    'ALIPAY_MOBILE': '支付宝-网站支付',
    'ALIPAY_PC': '支付宝-手机支付',
    'WX_NATIVE': '微信支付',
    'WX_JS': '微信支付',
    'WX_H5': '微信支付',
}

const PayStatusEnum = {
    'WAIT_PAY': '待支付',
    'PAY_SUCCESS': '支付成功',
    'PAY_FAIL': '支付失败',
}

const PayRecord = () => {

    // console.log(dayjs([2023, 5, 23, 17, 6, 44]).format('YYYY-MM-DD HH:mm:ss'), 'ss')

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
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
            const res = await getPayRecord({
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
            title: '订单ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '支付时间',
            dataIndex: 'payTime',
            key: 'payTime',
        },
        {
            title: '订单金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '订单号',
            dataIndex: 'orderNum',
            key: 'orderNum',
        },
        {
            title: '条数',
            dataIndex: 'tempNum',
            key: 'tempNum',
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.status === 'WAIT_PAY' ? 'processing' : record.status === 'PAY_SUCCESS' ? 'success' : 'error'}>{PayStatusEnum[record.status]}</Tag>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            setModalContent(record);
                            setIsModalOpen(true);
                        }}
                    >查看详情</Button>
                </Space>
            ),
        }
    ];

    return <div>
        <Spacing />
        <Space direction="vertical" size="middle">
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>支付时间: </Col>
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
                <Col style={{ width: 95 }}>订单号: </Col>
                <Col>
                    <InputNumber controls={false} style={{ width: 250 }} value={filterOptions?.orderNum} onChange={(value) => setFilterOptions(c => ({ ...c, orderNum: value }))} />
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
        <Modal
            // title="回复内容"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            destroyOnClose
            maskClosable
            footer={
                <Button onClick={() => setIsModalOpen(false)}>关闭</Button>
            }
        >
            <div style={{ height: 500, overflowY: 'scroll' }}>
                <Descriptions title="订单详情" bordered column={1}>
                    <Descriptions.Item label="订单号">{modalContent.orderNum}</Descriptions.Item>
                    <Descriptions.Item label="订单金额">{modalContent.money}</Descriptions.Item>
                    <Descriptions.Item label="支付方式">{PayTypeEnum[modalContent.payType]}</Descriptions.Item>
                    <Descriptions.Item label="支付状态">{PayStatusEnum[modalContent.status]}</Descriptions.Item>
                    <Descriptions.Item label="支付时间">{modalContent.payTime?.join('-')}</Descriptions.Item>
                    <Descriptions.Item label="客户use_id">{modalContent.userId}</Descriptions.Item>
                </Descriptions>
            </div>
        </Modal>

    </div>
}

export default PayRecord;