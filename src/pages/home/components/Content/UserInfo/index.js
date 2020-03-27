import React from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import { FRIEND_TYPE } from '@/utils/const';
import styles from './index.less';
import BasicInfo from './BasicInfo';
import GroupInfo from './GroupInfo';
import FriendInfo from './FriendInfo';

const getInfo = (type, group, key, friendGroups, groupGroups) => {
  if (type === FRIEND_TYPE.FRIEND) {
    return friendGroups
      .filter(friendGroup => friendGroup.key === group)[0]
      .friends.filter(friend => friend.email === key)[0];
  }
  if (type === FRIEND_TYPE.GROUP) {
    return groupGroups
      .filter(groupGroup => groupGroup.key === group)[0]
      .groups.filter(groupInfo => groupInfo.chatKey === key)[0];
  }
  return false;
};
const UserInfo = ({ activeMenu, friendGroups, groupGroups, socket }) => {
  const [type, group, key] = activeMenu;
  const info = getInfo(type, group, key, friendGroups, groupGroups);
  return (
    <div className={styles.userInfoWrapper}>
      {info ? (
        <div className={styles.infoWrapper}>
          <BasicInfo info={info} type={type} />
          <div className={styles.info}>
            {activeMenu[0] === FRIEND_TYPE.GROUP && (
              <GroupInfo info={info} groupGroups={groupGroups} group={group} socket={socket} />
            )}
            {activeMenu[0] === FRIEND_TYPE.FRIEND && (
              <FriendInfo info={info} friendGroups={friendGroups} group={group} socket={socket} />
            )}
          </div>
        </div>
      ) : (
        <Empty description="" />
      )}
    </div>
  );
};

export default connect(({ global, addressBook, userGroups }) => ({
  socket: global.socket,
  activeMenu: addressBook.activeMenu,
  friendGroups: userGroups.friendGroups,
  groupGroups: userGroups.groupGroups,
}))(UserInfo);
