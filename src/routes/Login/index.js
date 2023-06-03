import React, { useContext, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import md5 from 'blueimp-md5';

import CopyRightWrap from '../../components/CopyRight'

import { loginIn, getUserInfo } from '../../api/loginService';

import userInfoContext from '../../store/userInfoContext';


import styles from './index.module.scss';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { setGlobalInfo } = useContext(userInfoContext);
    const history = useHistory();

    async function onFinish(values) {

        setLoading(true);
        const res = await loginIn({
            phone: values.phone,
            passWord: md5(values.password),
        });



        // 登录成功
        if (res?.code === 200 && res?.message === null) {
            messageApi.open({
                type: 'success',
                content: '登录成功',
            });
            localStorage.setItem('TOKEN', res?.data?.jwtToken);
            // setLoginVisible(false);

            // 获取用户信息，并存入store
            getUserInfo().then((res) => {
                setLoading(false);
                if (res.code !== 200 || res.message !== null) {
                    setGlobalInfo?.({
                        loggedIn: false,
                        finised: true,
                        // ...(res.data || {})
                    });
                    return;
                }
                setGlobalInfo?.({
                    loggedIn: true,
                    finised: true,
                    ...(res.data || {})
                });

                history.replace('/')
            })
        }
        setLoading(false);

        messageApi.open({
            type: 'error',
            content: res?.message || '网络错误',
        });

    }

    // function onFinishFailed() {

    // }

    return (
        <div className={styles.loginWrap}>
            <div className={styles.loginContainer}>
                <p className={styles.title}>管理中心登录</p>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} size='large' placeholder="请输入账号" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} size='large' placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" size='large' className={styles.submitBtn}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <CopyRightWrap />
            {contextHolder}
        </div>
    )
}

export default Login;