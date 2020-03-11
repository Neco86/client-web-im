import React from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const ContentChat = ({ activeChat, chats }) => {
  // activeChat 为聊天key的string
  const currentChat = chats.filter(item => item.key === activeChat)[0];
  return (
    <div className={styles.contentChatWrapper}>
      {
        activeChat
          ? `contentChat ${currentChat.nikeName} ${currentChat.type === '1' ? 'chat' : 'group chat'}`
          : <Empty description='' />
      }
    </div>
  )
}

export default connect(({ home }) => ({
  activeChat: home.activeChat,
  chats: home.chats,
}))(ContentChat);