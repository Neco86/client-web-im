import React from 'react';
import SelfChat from './SelfChat';
import GroupChat from './GroupChat';
import styles from './index.less';

// type 2普通聊天 1群聊天
const Chat = ({ type, chatKey }) => {
  return (
    <div className={styles.chatWrapper}>
      {type === '1' && <GroupChat chatKey={chatKey} />}
      {type === '2' && <SelfChat chatKey={chatKey} />}
    </div>
  )
}

export default Chat;
