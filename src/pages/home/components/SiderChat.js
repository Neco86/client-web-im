import React, { useState } from 'react';
import { Card, Avatar, Badge } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import { connect } from 'dva';
import styles from './index.less';

const SiderChat = (
  {
    dispatch,
    chats,
    activeChat,
  }) => {
  const changeChat = key => () => {
    dispatch({
      type: 'home/changeChat',
      payload: key,
    });
  }
  const onCloseClick = key => e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'home/closeChat',
      payload: key,
    });
    return false
  }
  const [hoverChat, setHoverChat] = useState(0);
  return (
    <div className={styles.siderChatWrapper}>
      {
        chats.map(item => (
          <Card
            size='small'
            key={item.key}
            onClick={changeChat(item.key)}
            bodyStyle={{ backgroundColor: activeChat === item.key ? '#F0F0F0' : '' }}
            onMouseEnter={() => { setHoverChat(item.key) }}
            onMouseLeave={() => { setHoverChat(0) }}
          >
            {
              hoverChat === item.key && <CloseOutlined onClick={onCloseClick(item.key)} />
            }
            <Avatar src={item.avatar} />
            <div className={styles.nikeName}>
              {item.nikeName}
            </div>
            <div className={styles.latestChat}>
              {item.latestChat}
            </div>
            <div className={styles.latestTime}>
              {item.latestTime}
            </div>
            {
              !!item.unread && <Badge count={item.unread} />
            }
          </Card>
        ))
      }
    </div >
  )
}

export default connect(({ home }) => ({
  chats: home.chats,
  activeChat: home.activeChat
}))(SiderChat);