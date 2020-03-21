import React from 'react';
import { connect } from 'dva';
import { Input, Menu } from 'antd';
import { PlusOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import User from './User';

const Header = ({ dispatch, menuKey }) => {
  const changeMenu = ({ key }) => {
    dispatch({
      type: 'global/setMenuKey',
      menuKey: key,
    });
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.left}>
        <div className={styles.search}>
          <Input.Search className={styles.input} />
        </div>
        <div className={styles.addBtn}>
          <PlusOutlined className={styles.btn} />
        </div>
      </div>
      <div className={styles.middle}>
        <Menu mode="horizontal" selectedKeys={[menuKey]} onClick={changeMenu}>
          <Menu.Item key="1">
            <CommentOutlined className={styles.menuBtn} />
          </Menu.Item>
          <Menu.Item key="2">
            <UserOutlined className={styles.menuBtn} />
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.right}>
        <User />
      </div>
    </div>
  );
};

export default connect(({ global }) => ({
  menuKey: global.menuKey,
}))(Header);
