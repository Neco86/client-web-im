import React from 'react';
import { Avatar } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const ChatBubble = ({ chat }) => (
  <div
    className={styles.chatBubbleWrapper}
    style={{ flexDirection: `${chat.self ? 'row-reverse' : 'row'}` }}
  >
    <div>
      <Avatar src={chat.avatar || DEFAULT_AVATAR} size="small" />
    </div>
    <div className={`${styles.msg} ${chat.self ? styles.self : styles.peer}`}>{chat.msg}</div>
  </div>
);

export default ChatBubble;
