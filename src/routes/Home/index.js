import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row, Select, Space } from 'antd';
import * as echarts from 'echarts';

import Title from '../../components/Title'

import { getDataStatistics, getDialogueStatistics, getOrderStatistics } from "../../api/homeService";

import styles from './index.module.scss'

const Home = () => {

    const [dataStatistics, setDataStatistics] = useState({});
    const [dialogueStatistics, setDialogueStatistics] = useState([]);
    const [orderStatistics, setOrderStatistics] = useState([]);
    const dialogueDomRef = useRef(null);
    const orderDomRef = useRef(null);

    useEffect(() => {
        getDataStatistics().then(res => {
            setDataStatistics(res?.data || {});
        })
        getDialogueStatistics().then(res => {
            setDialogueStatistics(res?.data || []);
        })
        getOrderStatistics().then(res => {
            setOrderStatistics(res?.data || []);
        })
    }, []);

    useEffect(() => {
        let dateArr = [];
        let dataArr = [];

        for (const item of dialogueStatistics) {
            dateArr.push(item.questionDate);
            dataArr.push(item.questionCount);
        }

        if (dialogueDomRef?.current) {
            const dialogueChart = echarts.init(dialogueDomRef?.current);
            const option = {
                title: {
                    // text: '提问数 & 创作数'
                    text: '提问数'
                },
                xAxis: {
                    type: 'category',
                    data: dateArr
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    // data: ['提问数', '创作数']
                    data: ['提问数']
                },
                series: [
                    {
                        name: '提问数',
                        type: 'line',
                        stack: 'Total',
                        data: dataArr
                    },
                    // {
                    //     name: '创作数',
                    //     type: 'line',
                    //     stack: 'Total',
                    //     data: [220, 182, 191, 234, 290, 330, 310]
                    // },
                ]
            };
            dialogueChart.setOption(option);
        }

    }, [dialogueStatistics])

    useEffect(() => {
        let dateArr = [];
        let orderArr = [];
        let payArr = [];

        for (const item of orderStatistics) {
            dateArr.push(item.payDate);
            orderArr.push(item.orderCount);
            payArr.push(item.sumMoney);
        }

        if (orderDomRef?.current) {
            const orderChart = echarts.init(orderDomRef?.current);
            const option = {
                title: {
                    text: '交易笔数 & 收款金额'
                },
                xAxis: {
                    type: 'category',
                    data: dateArr
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    data: ['交易笔数', '收款金额']
                },
                series: [
                    {
                        name: '交易笔数',
                        type: 'line',
                        stack: 'Total',
                        data: orderArr
                    },
                    {
                        name: '收款金额',
                        type: 'line',
                        stack: 'Total',
                        data: payArr
                    },
                ]
            };
            orderChart.setOption(option);
        }
    }, [orderStatistics])

    return <div>
        <Title>
            <div style={{ fontWeight: 'bold', fontSize: 20 }}>数据统计</div>
            {/* <div>
                选择站点：
                <Select
                    style={{ width: 150 }}
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
            </div> */}
        </Title>
        <Row justify="start" gutter={[30, 20]}>
            <Col >
                <Card
                    title="今日新增用户"
                    bordered={false}
                >
                    <p>{dataStatistics?.newRegisterUserCount || 0}</p>
                    <p>总计用户数：{dataStatistics?.registerUserCount || 0}</p>
                </Card>
            </Col>
            <Col>
                <Card
                    title="今日提问数"
                    bordered={false}
                >
                    <p>{dataStatistics?.newQuestionCount || 0}</p>
                    <p>总提问数：{dataStatistics?.questionCount || 0}</p>
                </Card>
            </Col>
            {/* <Col>
                <Card
                    title="今日创作数"
                    bordered={false}
                >
                    <p>{dataStatistics?.newOrderCount || 0}</p>
                    <p>总计用户数：{dataStatistics?.orderCount || 0}</p>
                </Card>
            </Col> */}
            <Col>
                <Card
                    title="今日订单数"
                    bordered={false}
                >
                    <p>{dataStatistics?.newOrderCount || 0}</p>
                    <p>总订单数：{dataStatistics?.newOrderCount || 0}</p>
                </Card>
            </Col>
            <Col>
                <Card
                    title="今日收款金额"
                    bordered={false}
                >
                    <p>{dataStatistics?.newMoneyCount || 0}</p>
                    <p>总收款金额：{dataStatistics?.moneyCount || 0}</p>
                </Card>
            </Col>
        </Row>

        <Title>对话统计</Title>
        <div className={styles.dialogueChart} ref={dialogueDomRef} />

        <Title>订单统计</Title>
        <div className={styles.dialogueChart} ref={orderDomRef} />
    </div>
}

export default Home;