import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Menu, Badge, Popover } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { MENU_KEY } from '@/utils/const';
import styles from './index.less';
import User from './User';
import Add from './Add';
import SearchResult from './SearchResult';

const Header = ({
  dispatch,
  menuKey,
  recentChats,
  activeChat,
  friendGroups,
  groupGroups,
  socket,
}) => {
  const changeMenu = ({ key }) => {
    dispatch({
      type: 'global/setMenuKey',
      menuKey: key,
    });
  };
  const [count, setCount] = useState(0);
  useEffect(() => {
    let total = 0;
    recentChats.forEach(chat => {
      if (chat.type !== activeChat[0] || chat.peer !== activeChat[1]) {
        total += Number(chat.unread);
      }
    });
    setCount(total);
  }, [recentChats]);
  const [friendResult, setFriendResult] = useState([]);
  const [groupResult, setGroupResult] = useState([]);
  const [search, setSearch] = useState('');
  const onSearch = e => {
    const v = e.target.value;
    setSearch(v);
    if (v !== '') {
      const tempFriendResult = [];
      friendGroups.forEach(group => {
        group.friends.forEach(friend => {
          if ((friend.remarkName && friend.remarkName.includes(v)) || friend.nickname.includes(v)) {
            tempFriendResult.push({
              avatar: friend.avatar,
              remarkName: friend.remarkName,
              nickname: friend.nickname,
              groupName: group.groupName,
              peer: friend.email,
            });
          }
        });
      });
      setFriendResult(tempFriendResult);
      const tempGroupResult = [];
      groupGroups.forEach(group => {
        group.groups.forEach(friend => {
          if ((friend.remarkName && friend.remarkName.includes(v)) || friend.nickname.includes(v)) {
            tempGroupResult.push({
              avatar: friend.avatar,
              remarkName: friend.remarkName,
              nickname: friend.nickname,
              groupName: group.groupName,
              peer: friend.chatKey,
            });
          }
        });
      });
      setGroupResult(tempGroupResult);
    } else {
      setFriendResult([]);
      setGroupResult([]);
    }
  };
  const onSearchItemClick = (type, peer) => {
    setSearch('');
    setFriendResult([]);
    setGroupResult([]);
    dispatch({
      type: 'global/setMenuKey',
      menuKey: MENU_KEY.CHAT_INFO,
    });
    dispatch({
      type: 'chat/setActiveChat',
      activeChat: [type, peer],
    });
    socket.emit('setRecentChat', { peer, type, unread: 0 });
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.left}>
        <div className={styles.search}>
          <Popover
            visible={!!(friendResult.length + groupResult.length)}
            placement="bottom"
            className={styles.searchResult}
            content={
              <SearchResult
                friendResult={friendResult}
                groupResult={groupResult}
                search={search}
                onSearchItemClick={onSearchItemClick}
              />
            }
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Input.Search className={styles.input} onChange={onSearch} value={search} />
          </Popover>
        </div>
        <div className={styles.addBtn}>
          <Add />
        </div>
      </div>
      <div className={styles.middle}>
        <Menu mode="horizontal" selectedKeys={[menuKey]} onClick={changeMenu}>
          <Menu.Item key={MENU_KEY.CHAT_INFO}>
            <Badge count={count}>
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

export default connect(({ global, chat, userGroups }) => ({
  menuKey: global.menuKey,
  socket: global.socket,
  recentChats: chat.recentChats,
  activeChat: chat.activeChat,
  friendGroups: userGroups.friendGroups,
  groupGroups: userGroups.groupGroups,
}))(Header);
