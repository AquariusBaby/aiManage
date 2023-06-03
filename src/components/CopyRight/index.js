import React from 'react';


import styles from './index.module.scss';

const CopyRightWrap = () => {

    return (
        <div className={styles.copyRightWrap} onClick={() => window.location.href = "https://beian.miit.gov.cn/"}>粤ICP备20000589号-5</div>
    )
}

export default CopyRightWrap;