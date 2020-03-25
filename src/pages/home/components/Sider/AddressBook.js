import React from 'react';
import { connect } from 'dva';
import { Button, Divider, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import styles from './AddressBook.less';

const AddressBook = () => {
  const { SubMenu } = Menu;
  return (
    <div className={styles.addressBookWrapper}>
      <Button className={styles.friendMessage}>好友通知</Button>
      <Divider />
      <div className={styles.groupsWrapper}>
        <div className={styles.title}>群聊</div>
        <Menu style={{ width: 256 }} mode="inline">
          <SubMenu
            key="group1"
            title={
              <div className="subMenuTitle">
                群聊分组1
                <EllipsisOutlined
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
              </div>
            }
          >
            <Menu.Item key="1">群聊 1</Menu.Item>
            <Menu.Item key="2">群聊 2</Menu.Item>
            <Menu.Item key="3">群聊 3</Menu.Item>
            <Menu.Item key="4">群聊 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="group2"
            title={
              <div className="subMenuTitle">
                群聊分组2
                <EllipsisOutlined
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
              </div>
            }
          >
            <Menu.Item key="5">群聊 5</Menu.Item>
            <Menu.Item key="6">群聊 6</Menu.Item>
            <Menu.Item key="7">群聊 7</Menu.Item>
            <Menu.Item key="8">群聊 8</Menu.Item>
          </SubMenu>
        </Menu>
        <div className={styles.title}>好友</div>
        <Menu style={{ width: 256 }} mode="inline">
          <SubMenu
            key="friend1"
            title={
              <div className="subMenuTitle">
                好友分组1
                <EllipsisOutlined
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
              </div>
            }
          >
            <Menu.Item key="1">好友 1</Menu.Item>
            <Menu.Item key="2">好友 2</Menu.Item>
            <Menu.Item key="3">好友 3</Menu.Item>
            <Menu.Item key="4">好友 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="friend2"
            title={
              <div className="subMenuTitle">
                好友分组2
                <EllipsisOutlined
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
              </div>
            }
          >
            <Menu.Item key="5">好友 5</Menu.Item>
            <Menu.Item key="6">好友 6</Menu.Item>
            <Menu.Item key="7">好友 7</Menu.Item>
            <Menu.Item key="8">好友 8</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default connect(({ global }) => ({
  socket: global.socket,
}))(AddressBook);
