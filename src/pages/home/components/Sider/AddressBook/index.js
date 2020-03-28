import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Divider, Menu } from 'antd';
import { FRIEND_TYPE } from '@/utils/const';
import SubMenuTitle from './SubMenuTitle';
import FriendCard from './FriendCard';
import GroupCard from './GroupCard';
import styles from './index.less';
import FriendApply from './FriendApply';

const AddressBook = ({ friendGroups, groupGroups, activeMenu, dispatch, socket }) => {
  const { SubMenu } = Menu;
  const setActiveMenu = (type, group, key) => {
    dispatch({
      type: 'addressBook/setActiveMenu',
      activeMenu: [type, group, key],
    });
  };
  const [friendApply, setFriendApply] = useState(false);
  return (
    <div className={styles.addressBookWrapper}>
      <Button
        className={styles.friendMessage}
        onClick={() => {
          setFriendApply(true);
        }}
      >
        好友通知
      </Button>
      <FriendApply
        visible={friendApply}
        onCancel={() => {
          setFriendApply(false);
        }}
        socket={socket}
      />
      <Divider />
      <div className={styles.groupsWrapper}>
        <div className={styles.title}>群聊</div>
        <Menu
          style={{ width: 256 }}
          mode="inline"
          selectedKeys={[activeMenu[0] === FRIEND_TYPE.GROUP ? activeMenu[2] : '']}
        >
          {groupGroups.map(groupGroup => (
            <SubMenu
              key={groupGroup.key}
              title={
                <SubMenuTitle
                  name={groupGroup.groupName}
                  number={groupGroup.groups.length}
                  titleKey={[FRIEND_TYPE.GROUP, groupGroup.key]}
                  group={groupGroups}
                  socket={socket}
                />
              }
            >
              {groupGroup.groups.map(group => (
                <Menu.Item
                  key={group.chatKey}
                  onClick={() => {
                    setActiveMenu(FRIEND_TYPE.GROUP, groupGroup.key, group.chatKey);
                  }}
                >
                  <GroupCard group={group} />
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
        <div className={styles.title}>好友</div>
        <Menu
          style={{ width: 256 }}
          mode="inline"
          selectedKeys={[activeMenu[0] === FRIEND_TYPE.FRIEND ? activeMenu[2] : '']}
        >
          {friendGroups.map(friendGroup => (
            <SubMenu
              key={friendGroup.key}
              title={
                <SubMenuTitle
                  name={friendGroup.groupName}
                  number={`${friendGroup.friends.filter(friend => friend.online).length}/${
                    friendGroup.friends.length
                  }`}
                  titleKey={[FRIEND_TYPE.FRIEND, friendGroup.key]}
                  group={friendGroups}
                  socket={socket}
                />
              }
            >
              {friendGroup.friends.map(friend => (
                <Menu.Item
                  key={friend.email}
                  onClick={() => {
                    setActiveMenu(FRIEND_TYPE.FRIEND, friendGroup.key, friend.email);
                  }}
                >
                  <FriendCard friend={friend} />
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default connect(({ global, userGroups, addressBook }) => ({
  socket: global.socket,
  friendGroups: userGroups.friendGroups,
  groupGroups: userGroups.groupGroups,
  activeMenu: addressBook.activeMenu,
}))(AddressBook);
