import React from 'react';
import { connect } from 'dva';
import { Input, Avatar, Badge, Menu } from 'antd';
import { PlusOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { USER_STATUS, USER_STATUS_COLOR } from '@/utils/const';
import styles from './index.less';

const Header = ({ dispatch, menuKey }) => {
  const changeMenu = ({ key }) => {
    dispatch({
      type: 'global/setMenuKey',
      menuKey: key,
    });
  };
  const status = USER_STATUS.ONLINE;
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
        <Badge dot offset={[-2, 22]} style={{ backgroundColor: `${USER_STATUS_COLOR[status]}` }}>
          <Avatar size="small" />
        </Badge>
      </div>
    </div>
  );
};

export default connect(({ global }) => ({
  socket: global.socket,
  menuKey: global.menuKey,
}))(Header);
