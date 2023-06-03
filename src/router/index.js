import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    // HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { Menu, Row, Col } from 'antd';

import Header from "../components/Header";

import UserInfoContext from '../store/userInfoContext';

import Login from '../routes/Login'

import Home from '../routes/Home'
// import Site from '../routes/Site'

import DialogueRecord from '../routes/Data/DialogueRecord'
import CreateRecord from '../routes/Data/CreateRecord'
import PayRecord from '../routes/Data/PayRecord'

import System from '../routes/System'

import Dialogue from '../routes/Dialogue'
import UserManage from '../routes/User/Manage'
import UserFeedback from '../routes/User/Feedback'
import UserBlack from '../routes/User/Black'

import Order from '../routes/Order'

import Retailer from '../routes/Retail/Retailer'
import RetailOrder from '../routes/Retail/RetailOrder'
import RetailSetting from '../routes/Retail/RetailSetting'
import Settle from '../routes/Retail/Settle'
import Cash from '../routes/Retail/Cash'

import styles from './index.module.scss'

import MenuRoute from './MenuRoute'

function RouterApp() {

    const { globalInfo } = useContext(UserInfoContext);

    return (
        <Router>
            {
                globalInfo?.loggedIn &&
                <Header />
            }
            <Row className={styles.app}>
                {
                    globalInfo?.loggedIn &&
                    <Col span={5} className={styles.menuWrap}>
                        <Route path="*" exact component={MenuRoute}></Route>
                    </Col>
                }
                <Col span={globalInfo?.id ? 19 : 24} className={styles.contentWrap}>
                    <Switch>
                        <Route path="/login" exact component={Login}></Route>
                        <Route path="/" exact>
                            {!globalInfo?.loggedIn ? <Redirect to="/login" /> : <Home />}
                        </Route>
                        {/* <Route path="/home" exact component={Home}></Route> */}
                        <Route path="/home" exact>
                            {!globalInfo?.loggedIn ? <Redirect to="/login" /> : <Home />}
                        </Route>
                        {/* 站点 */}
                        {/* <Route path="/site" exact component={Site}></Route> */}
                        {/* 数据 */}
                        {/* <Route path="/data" exact component={Data}></Route> */}
                        {/* <Route path="/data/dialogueRecord" exact component={DialogueRecord}></Route> */}
                        <Route path="/data/dialogueRecord" exact>
                            {!globalInfo?.loggedIn ? <Redirect to="/login" /> : <DialogueRecord />}
                        </Route>
                        {/* <Route path="/data/createRecord" exact component={CreateRecord}></Route> */}
                        {/* <Route path="/data/payRecord" exact component={PayRecord}></Route> */}
                        <Route path="/data/payRecord" exact>
                            {!globalInfo?.loggedIn ? <Redirect to="/login" /> : <PayRecord />}
                        </Route>
                        {/* 系统配置 */}
                        {/* <Route path="/system" exact component={System}></Route> */}
                        {/* 对话记录 */}
                        {/* <Route path="/dialogue" exact component={Dialogue}></Route> */}
                        {/* 用户 */}
                        <Route path="/user/manage" exact component={UserManage}></Route>
                        {/* <Route path="/user/feedback" exact component={UserFeedback}></Route> */}
                        {/* <Route path="/user/black" exact component={UserBlack}></Route> */}
                        {/* 订单 */}
                        {/* <Route path="/order" exact component={Order}></Route> */}
                        {/* 分销 */}
                        {/* <Route path="/retail/retailer" exact component={Retailer}></Route>
                        <Route path="/retail/retailOrder" exact component={RetailOrder}></Route>
                        <Route path="/retail/retailSetting" exact component={RetailSetting}></Route>
                        <Route path="/retail/settle" exact component={Settle}></Route>
                        <Route path="/retail/cash" exact component={Cash}></Route> */}
                    </Switch>
                </Col>
            </Row>
        </Router>
    )
}

export default RouterApp;