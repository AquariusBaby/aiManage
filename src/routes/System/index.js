import React, { useState } from "react";
import { Table, Col, Row, Button, Space, Modal, Select, Input, DatePicker, Tabs } from 'antd';

import SystemConfig from './components/systemConfig'
import InterfaceConfig from './components/interfaceConfig'


const Data = () => {

    const items = [
        {
            key: '1',
            label: `系统配置`,
            children: <SystemConfig />,
        },
        {
            key: '2',
            label: `接口设置`,
            children: <InterfaceConfig />,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}

export default Data;