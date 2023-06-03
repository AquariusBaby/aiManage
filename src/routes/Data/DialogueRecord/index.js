import React, { useEffect, useState, useCallback } from "react";
import { Table, Col, Row, Button, Space, Modal, Radio, Input, DatePicker, InputNumber } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { getDialogueRecord, } from "../../../api/dataService";
import Spacing from '../../../components/Spacing'
import renderMarkdownToHTML from '../../../components/MarkdownRender'


const Dialogue = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
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
            const res = await getDialogueRecord({
                size,
                currentPage,
                ...filterOptions,
                // startCreateTime: dayjs(filterOptions.startCreateTime).valueOf(),
                // endCreateTime: dayjs(filterOptions.startCreateTime).valueOf(),
                // startCreateTime: dayjs(filterOptions.startCreateTime).format('YYYY-MM-dd HH:mm:ss'),
                // endCreateTime: dayjs(filterOptions.startCreateTime).format('YYYY-MM-DD'),
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
            size: pageOption.size,
            currentPage: pageOption.currentPage,
        })
    }, [handleSearch]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '用户ID',
            dataIndex: 'userChatId',
            key: 'userChatId',
        },
        {
            title: '用户提问',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'AI回复',
            dataIndex: 'context',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            setModalContent(record?.context);
                            setIsModalOpen(true);
                        }}
                    >查看回复</Button>
                </Space>
            ),
        },
        // {
        //     title: '消耗token',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Button>删除</Button>
        //         </Space>
        //     ),
        // },
    ];

    return <div>
        <Spacing />
        <Space direction="vertical" size="middle">
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>提问时间: </Col>
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
                    <InputNumber controls={false} style={{ width: 250 }} value={filterOptions?.userId} onChange={(value) => setFilterOptions(c => ({ ...c, userId: value }))} />
                </Col>
            </Row>
            <Row gutter={[30, 20]} align="middle">
                <Col style={{ width: 95 }}>关键词: </Col>
                <Col>
                    <Input style={{ width: 250 }} allowClear value={filterOptions?.questionKey} onChange={(e) => setFilterOptions(c => ({ ...c, questionKey: e.target.value }))} />
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
                // showTotal,
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
            title="回复内容"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            destroyOnClose
            maskClosable
            footer={
                <Button onClick={() => setIsModalOpen(false)}>关闭</Button>
            }
        >
            <div style={{ height: 500, overflowY: 'scroll' }} dangerouslySetInnerHTML={renderMarkdownToHTML(modalContent)} />
        </Modal>

    </div>
}

export default Dialogue;