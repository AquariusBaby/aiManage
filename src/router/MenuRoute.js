import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Menu, } from 'antd';
import {
    // AppstoreOutlined,
    // DesktopOutlined,
    MailOutlined,
    // PieChartOutlined,
    HomeFilled,
    SignalFilled,
    ContactsFilled,
} from '@ant-design/icons';

import styles from './index.module.scss'

function getItem(
    label,
    key,
    icon,
    children,
    type,
) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('首页', '1', <HomeFilled />),
    // getItem('站点', '2', <DesktopOutlined />),
    getItem('数据', '3', <SignalFilled />, [
        getItem('对话记录', '31'),
        // getItem('创作记录', '32'),
        getItem('付费记录', '33'),
    ]),
    getItem('用户', '4', <ContactsFilled />, [
        getItem('用户管理', '41'),
        // getItem('用户反馈', '42'),
        // getItem('用户黑名单', '43'),
    ]),
    getItem('分销', '5', <MailOutlined />, [
        // getItem('分销商', '51'),
        getItem('分销订单', '52'),
        getItem('分销设置', '53'),
        // getItem('分销订单', '54'),
        getItem('提现', '55'),
    ]),
    // getItem('订单', '6', <DesktopOutlined />),
    getItem('系统', '7', <MailOutlined />, [
        getItem('系统配置', '71'),
        //   getItem('内容过滤', '72'),
        //   getItem('系统升级', '73'),
    ]),
    // getItem('系统配置', '7', <MailOutlined />),
];

const MenuRoute = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();

    function onMenuClick({ item, key, keyPath, domEvent }) {
        // console.log(item, key, keyPath, domEvent, 'sss');

        let path = '';

        switch (key) {
            case '1': path = '/home'
                break;
            case '2': path = '/site'
                break;
            case '31': path = '/data/dialogueRecord'
                break;
            case '32': path = '/data/createRecord'
                break;
            case '33': path = '/data/payRecord'
                break;
            case '41': path = '/user/manage'
                break;
            case '42': path = '/user/feedback'
                break;
            case '43': path = '/user/black'
                break;
            case '51': path = '/retail/retailer'
                break;
            case '52': path = '/retail/retailOrder'
                break;
            case '53': path = '/retail/retailSetting'
                break;
            case '54': path = '/retail/settle'
                break;
            case '55': path = '/retail/cash'
                break;
            case '6': path = '/order'
                break;
            case '71': path = '/system'
                break;
        }

        history.push(path);
    }

    return (
        <Menu
            className={styles.menuList}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={onMenuClick}
        />
    )
}

export default MenuRoute;