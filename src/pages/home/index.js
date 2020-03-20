import React, { useState, useEffect } from 'react';
import { TOKEN_NAME } from '@/utils/const';
import { message } from 'antd';
import io from 'socket.io-client';
import router from 'umi/router';
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
      // token过期
      socket.on('disconnect', () => {
        message.error('用户令牌失效,请重新登录!');
        router.push('/login');
      });
    }
  }, [socket]);
  return socket;
}

const Home = () => {
  useSocket();
  return <div className={styles.homeWrapper}>welcome</div>;
};

export default Home;
