import React from "react";
import { Card, Col, Row, Select } from 'antd';

import styles from './index.module.scss';

const Title = ({ children }) => {

    return <div className={styles.titleWrap}>
        {children}
    </div>
}

export default Title;