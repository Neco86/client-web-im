import React, { useState, useEffect } from 'react';
import { TOKEN_NAME, SUCCESS_CODE } from '@/utils/const';
import { message } from 'antd';
import { verifyToken } from '@/service/home';
import router from 'umi/router';
import styles from './index.less';

// 验证token
const useTokenVerify = () => {
  const [tokenVerify, setTokenVerify] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_NAME) || localStorage.getItem(TOKEN_NAME);
    (async () => {
      const result = await verifyToken({ token });
      const { code, msg, nickname } = result;
      if (code === SUCCESS_CODE) {
        message.success(`Welcome ${nickname}`);
        setTokenVerify(true);
      } else {
        router.push('/login');
        message.error(msg);
      }
    })();
  }, []);
  return tokenVerify;
};
const Home = () => {
  const tokenVerify = useTokenVerify();
  // 验证token成功, 初始化
  useEffect(() => {
    if (tokenVerify) {
      console.log('验证token成功, 初始化');
    }
  }, [tokenVerify]);
  return <div className={styles.homeWrapper}>Home</div>;
};

export default Home;
