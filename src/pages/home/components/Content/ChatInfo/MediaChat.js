/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
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
  caller,
  socket,
}) => {
  const peerInfo = recentChats.filter(chat => chat.type === type && chat.peer === peer)[0];
  const hangUp = () => {
    dispatch({
      type: 'mediaChat/setMediaChatConfig',
      payload: {
        visible: false,
        video: false,
        caller: false,
      },
    });
  };
  useEffect(() => {
    if (visible) {
      // 创建PeerConnection实例
      // TODO: 配置iceServer,未配置仅可局域网使用
      const peerConnection = new RTCPeerConnection();
      peerConnection.onicecandidate = event => {
        if (event.candidate !== null) {
          // 提供candidate
          socket.emit('newIceCandidate', {
            candidate: event.candidate,
            type,
            peer,
          });
        }
      };
      peerConnection.onaddstream = event => {
        document.getElementById(peer).srcObject = event.stream;
      };
      // 创建自己的视频
      navigator.mediaDevices.getUserMedia({ audio: true, video }).then(stream => {
        document.getElementById(email).srcObject = stream;
        peerConnection.addStream(stream);
        // 如果被叫,给所有人发offer
        if (!caller) {
          peerConnection.createOffer().then(offer => {
            socket.emit('videoOffer', { offer, type, peer });
            return peerConnection.setLocalDescription(offer);
          });
        }
      });
      // 收到offer
      socket.on('videoOffer', ({ offer }) => {
        peerConnection
          .setRemoteDescription(offer)
          .then(() => peerConnection.createAnswer())
          .then(answer => {
            socket.emit('videoAnswer', { answer, type, peer });
            return peerConnection.setLocalDescription(answer);
          });
      });
      // 收到answer
      socket.on('videoAnswer', ({ answer }) => {
        peerConnection.setRemoteDescription(answer);
      });
      // 收到ice
      socket.on('newIceCandidate', ({ candidate }) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onCancel={hangUp}
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
      <Button type="danger" onClick={hangUp} className={styles.hangUpBtn}>
        挂断
      </Button>
    </Modal>
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
  caller: mediaChat.caller,
}))(MediaChat);
