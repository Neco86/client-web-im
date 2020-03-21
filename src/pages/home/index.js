import React, { useState, useEffect } from 'react';
import { TOKEN_NAME } from '@/utils/const';
import { message } from 'antd';
import io from 'socket.io-client';
import { connect } from 'dva';
import router from 'umi/router';
import Header from './components/Header';
import Sider from './components/Sider';
import Content from './components/Content';
import styles from './index.less';

// 连接socket
function useSocket() {
  const token = sessionStorage.getItem(TOKEN_NAME) || localStorage.getItem(TOKEN_NAME);
  const [socket] = useState(io(`http://127.0.0.1:7001?token=${token}`));
  useEffect(() => {
    if (socket) {
      // 请求初始化
      socket.emit('init');
      // 初始化
      socket.on('init', ({ nickname }) => {
        message.success(`Welcome ${nickname}!`);
      });
      // 断开连接
      socket.on('disconnect', reason => {
        switch (reason) {
          // token过期, 服务器主动断开
          case 'transport close':
            message.error('用户令牌失效,请重新登录!');
            router.push('/login');
            break;
          // 用户选择离线, 客户端主动断开
          case 'io client disconnect':
            message.success('离线成功!');
            break;
          default:
            break;
        }
      });
    }
  }, [socket]);
  return socket;
}

const Home = ({ dispatch }) => {
  const socket = useSocket();
  dispatch({
    type: 'global/setSocket',
    socket,
  });
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.sider}>
          <Sider />
        </div>
        <div className={styles.content}>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default connect()(Home);
