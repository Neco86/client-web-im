import React from 'react';
import { connect } from 'dva';
import { Button, Empty } from 'antd';
import styles from './index.less';

const ChatInfo = ({ activeChat: [type, peer], socket }) => {
  const sendMsg = msg => {
    socket.emit('sendMsg', { msg, type, peer });
    socket.emit('setRecentChat', { peer, type, msg });
  };
  return (
    <div className={styles.chatInfoWrapper}>
      {type && peer ? (
        <>
          {/* TODO: 获取聊天信息 */}
          <Button
            onClick={() => {
              sendMsg(`test${Math.random()}`);
            }}
          >
            send
          </Button>
          {type}:{peer}
        </>
      ) : (
        <Empty description="" className={styles.empty} />
      )}
    </div>
  );
};

export default connect(({ global, chat }) => ({
  socket: global.socket,
  activeChat: chat.activeChat,
}))(ChatInfo);
