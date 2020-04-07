/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import { Modal, Button, Avatar, Spin } from 'antd';
import { connect } from 'dva';
import { FRIEND_TYPE, DEFAULT_AVATAR } from '@/utils/const';
import styles from './MediaChat.less';

const invite = () => {};

const MediaChat = ({
  mediaChat: [audio, video],
  dispatch,
  activeChat: [type, peer],
  memberInfo,
  email,
  recentChats,
}) => {
  const onCancel = () => {
    dispatch({
      type: 'mediaChat/setMediaChat',
      mediaChat: [false, false],
    });
  };
  useEffect(() => {
    if (audio || video) {
      console.log('开启视频/音频聊天', type, peer);
      invite();
    }
  }, [audio, video]);
  const peerInfo = recentChats.filter(chat => chat.type === type && chat.peer === peer)[0];
  return (
    <Modal
      visible={audio || video}
      // visible
      onCancel={onCancel}
      className={styles.mediaChatModal}
      footer={null}
      maskClosable={false}
      title={
        <>
          <Avatar src={peerInfo.avatar || DEFAULT_AVATAR} /> {peerInfo.name}{' '}
          {video ? '视频' : '语音'}聊天
        </>
      }
    >
      <div className={styles.mediaChatWrapper}>
        {type === FRIEND_TYPE.FRIEND && (
          <div className={styles.friendMediaWrapper}>
            <div className={styles.videoWrapper}>
              <video className={styles.video} autoPlay />
              <Spin tip="等待应答..." />
            </div>
            <div className={styles.videoWrapper}>
              <video className={styles.video} autoPlay />
              <Spin tip="等待应答..." />
            </div>
          </div>
        )}
        {type === FRIEND_TYPE.GROUP && memberInfo.length > 0 && (
          <div className={styles.groupMediaWrapper}>
            {[
              memberInfo.find(member => member.email === email),
              ...memberInfo.filter(member => member.email !== email),
            ].map(m => (
              <div
                className={styles.videoWrapper}
                key={m.email}
                style={{ width: memberInfo.length > 4 ? '25%' : '50%' }}
              >
                <video className={styles.video} autoPlay />
                <div className={styles.desc}>
                  <Avatar src={m.avatar || DEFAULT_AVATAR} /> {m.name}
                </div>
                <Spin tip="等待应答..." />
              </div>
            ))}
          </div>
        )}
      </div>
      <Button type="danger" onClick={onCancel} className={styles.hangUpBtn}>
        挂断
      </Button>
    </Modal>
  );
};

export default connect(({ global, mediaChat, chat, userInfo }) => ({
  socket: global.socket,
  mediaChat: mediaChat.mediaChat,
  activeChat: chat.activeChat,
  memberInfo: chat.memberInfo,
  email: userInfo.email,
  recentChats: chat.recentChats,
}))(MediaChat);
