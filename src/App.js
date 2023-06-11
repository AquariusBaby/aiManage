import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

import './style/github-markdown.scss';
import './style/highlight.scss';

import "dayjs/locale/zh-cn";

import { getUserInfo } from './api/loginService';
import UserInfoContext from './store/userInfoContext'

import RouterApp from './router';

function App() {

  const [globalInfo, setGlobalInfo] = useState({});

  // 获取登录
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res?.code === 200 && res?.message === null) {
        setGlobalInfo({
          loggedIn: true,
          finised: true,
          ...(res.data || {})
        });
        return;
      }

      setGlobalInfo({
        loggedIn: false,
        finised: true,
      })
    })
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <UserInfoContext.Provider value={{
        globalInfo,
        setGlobalInfo
      }}>
        {
          globalInfo?.finised && <RouterApp />
        }
      </UserInfoContext.Provider>
    </ConfigProvider>
  );
}

export default App;
