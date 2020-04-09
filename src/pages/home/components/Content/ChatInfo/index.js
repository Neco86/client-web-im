import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import { FRIEND_TYPE, MSG_TYPE, PREFIX_MSG_TYPE } from '@/utils/const';
import styles from './index.less';
import FriendChat from './FriendChat';
import GroupChat from './GroupChat';

const ChatInfo = ({ activeChat: [type, peer], socket }) => {
  const [page, setPage] = useState(0);
  const sendMsg = (msg, msgType, noSetRecentChat) => {
    socket.emit('sendMsg', { msg, type, peer, msgType });
    // noSetRecentChat默认不传为undefined,修改侧边数据
    // 同意文件传输后传输文件的时候传true
    if (!noSetRecentChat) {
      const pre = PREFIX_MSG_TYPE[msgType];
      let endName = '';
      switch (msgType) {
        case MSG_TYPE.COMMON_CHAT:
          endName = msg;
          break;
        case MSG_TYPE.FILE:
          endName = msg.name;
          break;
        case MSG_TYPE.FOLDER:
          endName = msg.folderName;
          break;
        case MSG_TYPE.ONLINE_FILE:
          endName = msg;
          break;
        case MSG_TYPE.ONLINE_FOLDER:
          endName = msg;
          break;
        default:
          endName = msg.msg;
          break;
      }
      if (
        [
          MSG_TYPE.PICTURE,
          MSG_TYPE.START_AUDIO_CHAT,
          MSG_TYPE.START_VIDEO_CHAT,
          MSG_TYPE.JOIN_AUDIO_CHAT,
          MSG_TYPE.JOIN_VIDEO_CHAT,
          MSG_TYPE.REJECT_AUDIO_CHAT,
          MSG_TYPE.REJECT_VIDEO_CHAT,
        ].includes(msgType)
      ) {
        endName = '';
      }
      endName = `${pre}${endName}`;
      socket.emit('setRecentChat', { msg: endName, type, peer, msgType });
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
