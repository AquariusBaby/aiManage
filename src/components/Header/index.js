import React, { useContext } from 'react';
import { Row, Col, Popover, Image } from 'antd'

import UserInfoContext from '../../store/userInfoContext';

import styles from './index.module.scss';

const Header = () => {

    const { globalInfo } = useContext(UserInfoContext);

    function loginOut() {
        localStorage.removeItem("TOKEN");
        location.reload();
    }

    return (
        <div className={styles.headerWrap}>
            <Row justify="space-between" align="center" className={styles.headerConatiner}>
                <Col className={styles.logo}>
                    <Image src={"https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120"} />
                </Col>
                <Col className={styles.person}>
                    <Popover
                        content={
                            <>
                                <p onClick={loginOut}>退出登录</p>
                            </>
                        }
                        title="Title"
                        trigger="click">
                        <Button>{globalInfo?.name}</Button>
                    </Popover>
                </Col>
            </Row>
        </div>
    )
}

export default Header;