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
  const changeChat = order => () => {
    dispatch({
      type: 'home/changeChat',
      payload: order,
    });
  }
  const onCloseClick = order => e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'home/closeChat',
      payload: order,
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
            key={item.order}
            onClick={changeChat(item.order)}
            bodyStyle={{ backgroundColor: activeChat === item.order ? '#F0F0F0' : '' }}
            onMouseEnter={() => { setHoverChat(item.order) }}
            onMouseLeave={() => { setHoverChat(0) }}
          >
            {
              hoverChat === item.order && <CloseOutlined onClick={onCloseClick(item.order)} />
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