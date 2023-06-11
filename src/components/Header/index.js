import React, { useContext } from 'react';
import { Row, Col, Popover, Image, Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons';

import UserInfoContext from '../../store/userInfoContext';

import styles from './index.module.scss';

const Header = () => {

    const { globalInfo } = useContext(UserInfoContext);

    function loginOut() {
        localStorage.removeItem("TOKEN");
        window.location.reload();
    }

    return (
        <div className={styles.headerWrap}>
            <Row justify="space-between" align="center" className={styles.headerConatiner}>
                <Col className={styles.logo}>
                    <Image className={styles.logoImage} src={"https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120"} />
                    Cn-Gpt
                </Col>
                <Col className={styles.person}>
                    <Popover
                        content={
                            <>
                                <p onClick={loginOut} style={{ cursor: 'pointer' }}>退出登录</p>
                            </>
                        }
                        trigger="click">
                        <Button type="primary" icon={<SettingOutlined />}>用户{globalInfo?.name}</Button>
                    </Popover>
                </Col>
            </Row>
        </div>
    )
}

export default Header;