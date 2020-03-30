import React from 'react';
import { connect } from 'dva';
import { Empty, Menu } from 'antd';
import styles from './index.less';
import ChatCard from './ChatCard.js';

const ChatList = ({ recentChats, activeChat, dispatch, socket }) => {
  const handleClick = ({ key }) => {
    const { peer, type } = JSON.parse(key);
    dispatch({
      type: 'chat/setActiveChat',
      activeChat: [type, peer],
    });
    socket.emit('setRecentChat', { peer, type, unread: 0 });
  };
  const deleteCurrent = ({ type, peer }) => {
    dispatch({
      type: 'chat/setActiveChat',
      activeChat: [],
    });
    socket.emit('setRecentChat', { peer, type });
  };
  return (
    <div className={styles.chatListWrapper}>
      {recentChats.length > 0 ? (
        <Menu
          onClick={handleClick}
          mode="inline"
          className={styles.chatList}
          selectedKeys={[activeChat]}
        >
          {recentChats.map(chat => (
            <Menu.Item key={JSON.stringify({ type: chat.type, peer: chat.peer })}>
              <ChatCard chat={chat} deleteCurrent={deleteCurrent} />
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <Empty description="" className={styles.empty} />
      )}
    </div>
  );
};

export default connect(({ global, chat }) => ({
  socket: global.socket,
  recentChats: chat.recentChats,
  activeChat: JSON.stringify({ type: chat.activeChat[0], peer: chat.activeChat[1] }),
}))(ChatList);
