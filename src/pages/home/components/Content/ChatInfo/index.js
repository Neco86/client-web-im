import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import { FRIEND_TYPE, MSG_TYPE } from '@/utils/const';
import styles from './index.less';
import FriendChat from './FriendChat';
import GroupChat from './GroupChat';

const ChatInfo = ({ activeChat: [type, peer], socket }) => {
  const [page, setPage] = useState(0);
  const sendMsg = (msg, msgType) => {
    socket.emit('sendMsg', { msg, type, peer, msgType });
    if (msgType === MSG_TYPE.COMMON_CHAT) {
      socket.emit('setRecentChat', { msg, type, peer });
    }
    if (msgType === MSG_TYPE.PICTURE) {
      socket.emit('setRecentChat', { msg: '[图片]', type, peer });
    }
    if (msgType === MSG_TYPE.FILE) {
      socket.emit('setRecentChat', { msg: `[文件]${msg.name}`, type, peer });
    }
  };
  useEffect(() => {
    setPage(0);
    if (type && peer) {
      socket.emit('getChats', { type, peer, page: 0 });
    }
  }, [type, peer]);
  const loadMore = () => {
    socket.emit('getChats', { type, peer, page: page + 1 });
    setPage(page + 1);
  };
  return (
    <div className={styles.chatInfoWrapper}>
      {type && peer ? (
        <>
          {type === FRIEND_TYPE.FRIEND && (
            <FriendChat sendMsg={sendMsg} loadMore={loadMore} page={page} />
          )}
          {type === FRIEND_TYPE.GROUP && (
            <GroupChat sendMsg={sendMsg} loadMore={loadMore} page={page} />
          )}
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
