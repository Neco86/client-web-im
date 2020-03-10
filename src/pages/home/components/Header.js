import React from 'react';
import { Menu, Input, Button, Avatar, Badge } from 'antd';
import { MessageOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

const Header = ({ onMenuClick, currentMenu }) => {
  const statusColor = 'rgb(60,216,33)';
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.left}>
        <Input.Search />
        <Button
          shape='circle'
          icon={<PlusOutlined />}
          size='small'
        />
      </div>
      <div className={styles.middle}>
        <Menu
          mode="horizontal"
          selectedKeys={[currentMenu]}
          style={{
            lineHeight: '64px',
            display: 'inline-block',
            backgroundColor: '#EDF0F1',
          }}
          onClick={onMenuClick}
        >
          <Menu.Item key="chat">
            <MessageOutlined style={{ fontSize: '24px' }} />
          </Menu.Item>
          <Menu.Item key="list">
            <UserOutlined style={{ fontSize: '24px' }} />
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.right}>
        <Badge
          dot
          offset={[0, 26]}
          style={{ width: '12px', height: '12px', backgroundColor: `${statusColor}` }}
        >
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </div>
    </div>
  )
}

export default Header;
