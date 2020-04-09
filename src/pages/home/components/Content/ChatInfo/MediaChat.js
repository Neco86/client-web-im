/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Modal, Button, Avatar, Spin } from 'antd';
import { connect } from 'dva';
import { FRIEND_TYPE, DEFAULT_AVATAR } from '@/utils/const';
import styles from './MediaChat.less';

const MediaChat = ({
  activeChat: [type, peer],
  memberInfo,
  email,
  recentChats,
  dispatch,
  visible,
  video,
}) => {
  const peerInfo = recentChats.filter(chat => chat.type === type && chat.peer === peer)[0];
  return (
    <>
      {visible && (
        <Modal
          visible={visible}
          onCancel={() => {
            dispatch({
              type: 'mediaChat/setMediaChatConfig',
              payload: {
                visible: false,
                video: false,
              },
            });
          }}
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
                  <video className={styles.video} autoPlay id={email} />
                  <Spin tip="等待应答..." />
                </div>
                <div className={styles.videoWrapper}>
                  <video className={styles.video} autoPlay id={peer} />
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
                    <video className={styles.video} autoPlay id={m.email} />
                    <div className={styles.desc}>
                      <Avatar src={m.avatar || DEFAULT_AVATAR} /> {m.name}
                    </div>
                    <Spin tip="等待应答..." />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            type="danger"
            onClick={() => {
              dispatch({
                type: 'mediaChat/setMediaChatConfig',
                payload: {
                  visible: false,
                  video: false,
                },
              });
            }}
            className={styles.hangUpBtn}
          >
            挂断
          </Button>
        </Modal>
      )}
    </>
  );
};

export default connect(({ global, chat, userInfo, mediaChat }) => ({
  socket: global.socket,
  activeChat: chat.activeChat,
  memberInfo: chat.memberInfo,
  email: userInfo.email,
  recentChats: chat.recentChats,
  visible: mediaChat.visible,
  video: mediaChat.video,
}))(MediaChat);
