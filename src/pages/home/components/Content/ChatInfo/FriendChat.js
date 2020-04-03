import React from 'react';
import { connect } from 'dva';
import { MSG_TYPE } from '@/utils/const';
import styles from './index.less';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import SendArea from './SendArea';

const FriendChat = ({
  chats,
  recentChats,
  activeChat,
  myAvatar,
  sendMsg,
  loadMore,
  hasMore,
  page,
}) => {
  const peer = recentChats.filter(
    chat => chat.type === activeChat[0] && chat.peer === activeChat[1],
  )[0];

  return peer ? (
    <div className={styles.friendChatWrapper}>
      <ChatHeader name={peer.name} />
      <Chats
        chats={chats.map(chat => ({
          ...chat,
          avatar: chat.self ? myAvatar : peer.avatar,
        }))}
        loadMore={loadMore}
        hasMore={hasMore}
        page={page}
      />
      <SendArea sendMsg={msg => sendMsg(msg, MSG_TYPE.COMMON_CHAT)} activeChat={activeChat} />
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
  hasMore: chat.hasMore,
}))(FriendChat);
