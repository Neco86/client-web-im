import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import SendArea from './SendArea';

const FriendChat = ({ chats, recentChats, activeChat, myAvatar, sendMsg, loadMore, page }) => {
  const peer = recentChats.filter(
    chat => chat.type === activeChat[0] && chat.peer === activeChat[1],
  )[0];

  return peer ? (
    <div className={styles.friendChatWrapper}>
      <ChatHeader name={`${peer.name} (${peer.peer})`} />
      <Chats
        chats={chats.map(chat => ({
          ...chat,
          avatar: chat.self ? myAvatar : peer.avatar,
        }))}
        loadMore={loadMore}
        page={page}
        sendMsg={sendMsg}
      />
      <SendArea sendMsg={sendMsg} />
    </div>
  ) : (
    <></>
  );
};

export default connect(({ global, chat, userInfo }) => ({
  socket: global.socket,
  activeChat: chat.activeChat,
  recentChats: chat.recentChats,
  chats: chat.chats,
  myAvatar: userInfo.avatar,
}))(FriendChat);
