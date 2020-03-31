import React from 'react';
import { connect } from 'dva';
import { Input, Menu, Badge } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { MENU_KEY } from '@/utils/const';
import styles from './index.less';
import User from './User';
import Add from './Add';

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
          <Add />
        </div>
      </div>
      <div className={styles.middle}>
        <Menu mode="horizontal" selectedKeys={[menuKey]} onClick={changeMenu}>
          <Menu.Item key={MENU_KEY.CHAT_INFO}>
            <Badge count={99}>
              <CommentOutlined className={styles.menuBtn} />
            </Badge>
          </Menu.Item>
          <Menu.Item key={MENU_KEY.USER_INFO}>
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

export default connect(({ global, chat }) => ({
  menuKey: global.menuKey,
  recentChats: chat.recentChats,
}))(Header);
