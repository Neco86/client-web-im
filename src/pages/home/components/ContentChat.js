import React from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import Chat from './Chat';
import styles from './index.less';

const ContentChat = ({ activeChat, chats }) => {
  // activeChat 为聊天key的string
  const currentChat = chats.filter(item => item.key === activeChat)[0];
  return (
    <div className={styles.contentChatWrapper}>
      {
        activeChat
          ? <Chat
            // type 2普通聊天 1群聊天
            type={currentChat.chat}
            key={activeChat}
          />
          : <Empty description='' />
      }
    </div>
  )
}

export default connect(({ home }) => ({
  activeChat: home.activeChat,
  chats: home.chats,
}))(ContentChat);