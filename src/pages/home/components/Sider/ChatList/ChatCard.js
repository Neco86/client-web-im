import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR } from '@/utils/const';
import { Avatar, Badge } from 'antd';
import styles from './index.less';

const getDateDesc = timestamp => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const tDate = new Date();
  tDate.setTime(timestamp);
  const tYear = tDate.getFullYear();
  const tMonth = tDate.getMonth();
  const tDay = tDate.getDate();
  // 今天的消息
  if (year === tYear && month === tMonth && day === tDay) {
    return `${tDate.getHours()}:${tDate.getMinutes()}`;
  }
  // 昨天
  if (year === tYear && month === tMonth && day === tDay + 1) {
    return '昨天';
  }
  // 前天
  if (year === tYear && month === tMonth && day === tDay + 2) {
    return '前天';
  }
  // 今年
  if (year === tYear) {
    return `${tMonth + 1}-${tDay}`;
  }
  // 去年
  if (year === tYear - 1) {
    return '去年';
  }
  return '';
};

const ChatCard = ({ chat, deleteCurrent, activeChat, socket }) => {
  useEffect(() => {
    if (JSON.stringify({ type: chat.type, peer: chat.peer }) === activeChat && chat.unread > 0) {
      socket.emit('setRecentChat', { peer: chat.peer, type: chat.type, unread: 0 });
    }
  }, [chat.unread]);
  return (
    <div className={styles.chatCardWrapper}>
      <CloseOutlined
        className={styles.close}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          deleteCurrent(chat);
          return false;
        }}
      />
      <Avatar src={chat.avatar || DEFAULT_AVATAR} />
      <div className={styles.recentChatContent}>
        <div className={styles.top}>
          <div className={styles.name}>{chat.name}</div>
          <div className={styles.time}>{getDateDesc(chat.timestamp)}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.msg}>{chat.msg}</div>
          <div className={styles.unread}>
            <Badge
              count={
                JSON.stringify({ type: chat.type, peer: chat.peer }) === activeChat
                  ? 0
                  : chat.unread
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatCard;
