import React, { useState } from 'react';
import Header from './components/Header';
import Sider from './components/Sider';
import Content from './components/Content';
import styles from './index.less';

const Home = () => {
  // 聊天界面chat还是通讯录界面list
  const [currentMenu, setCurrentMenu] = useState('chat');
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.header}>
        <Header onMenuClick={({ key }) => setCurrentMenu(key)} />
      </div>
      <div className={styles.body}>
        <div className={styles.sider}>
          <Sider currentMenu={currentMenu} />
        </div>
        <div className={styles.content}>
          <Content currentMenu={currentMenu} />
        </div>
      </div>
    </div>
  )
}

export default Home;
