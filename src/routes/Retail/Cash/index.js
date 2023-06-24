import React, { useEffect, useState, useCallback } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, InputNumber, DatePicker, Radio, message } from 'antd';
import dayjs from 'dayjs';
import {
    SearchOutlined
} from '@ant-design/icons';

import Spacing from "../../../components/Spacing";

import { getWithdrawalRecord, applyWithdrawal } from "../../../api/cashServcie";

const Settle = () => {

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
            const res = await getWithdrawalRecord({
                size,
                currentPage,
                ...filterOptions,
                startCreateTime: !filterOptions.startCreateTime ? undefined : dayjs(filterOptions.startCreateTime).format('YYYY-MM-DD HH:mm:ss'),
                endCreateTime: !filterOptions.endCreateTime ? undefined : dayjs(filterOptions.endCreateTime).format('YYYY-MM-DD HH:mm:ss'),
                startWithdrawalTime: !filterOptions.startWithdrawalTime ? undefined : dayjs(filterOptions.startWithdrawalTime).format('YYYY-MM-DD HH:mm:ss'),
                endWithdrawalTime: !filterOptions.endWithdrawalTime ? undefined : dayjs(filterOptions.endWithdrawalTime).format('YYYY-MM-DD HH:mm:ss'),
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

    // 申请提现
    // async function apply(record) {
    //     const res = await applyWithdrawal({
    //         userId
    //     })

    //     if (res.code === 200 && res.message === null) {
    //         message.success('提交申请成功！');
    //         return;
    //     }
    //     message.success(res.message);
    // }

    const columns = [
        {
            title: '用户ID',
            dataIndex: 'userId',
        },
        {
            title: '申请时间',
            dataIndex: 'createdDate',
        },
        // {
        //     title: '分销商微信',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        {
            title: '提现金额',
            dataIndex: 'money',
        },
        {
            title: '提现方式/姓名/账号',
            dataIndex: 'voucher',
        },
        // {
        //     title: '收款码',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        {
            title: '审核状态',
            dataIndex: 'status',
            render: (status) => status
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
            {/* <Row gutter={[30, 20]} align="middle">
                <Col>
                    <Radio.Group onChange={(value) => setFilterOptions(c => ({ ...c, status: value }))} value={filterOptions?.}>
                        <Radio.Button value="0">全部</Radio.Button>
                        <Radio.Button value="1">未审核</Radio.Button>
                        <Radio.Button value="2">已通过</Radio.Button>
                        <Radio.Button value="3">已驳回</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row> */}
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
                <Col style={{ width: 135 }}>提现生效时间: </Col>
                <Col>
                    <DatePicker.RangePicker
                        showTime
                        value={[filterOptions?.startWithdrawalTime, filterOptions?.endWithdrawalTime]}
                        onChange={(dates) => setFilterOptions(c => ({ ...c, startWithdrawalTime: dates?.[0] || null, endWithdrawalTime: dates?.[1] || null }))}
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

export default Settle;