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
  socket,
}) => {
  const peerInfo = recentChats.filter(chat => chat.type === type && chat.peer === peer)[0];
  let localStream;
  const peerList = {};
  const getIndex = (email1, email2) => [email1, email2].sort().join('-');
  const hangUp = () => {
    socket.emit('hangUp', { account: email, type, peer });
    const localVideo = document.getElementById(getIndex(email, email));
    localVideo.srcObject.getTracks().forEach(track => track.stop());
    Object.keys(peerList).forEach(index => {
      peerList[index].close();
      peerList[index] = null;
    });
    dispatch({
      type: 'mediaChat/setMediaChatConfig',
      payload: {
        visible: false,
        video: false,
      },
    });
  };
  const getUserMedia = () =>
    new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video,
        })
        .then(stream => {
          document.getElementById(getIndex(email, email)).srcObject = stream;
          document.getElementById(`loading_${getIndex(email, email)}`).style.display = 'none';
          localStream = stream;
          resolve();
        })
        .catch(reject);
    });
  const getPeerConnection = index => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.addStream(localStream);
    peerConnection.onaddstream = event => {
      document.getElementById(index).srcObject = event.stream;
      document.getElementById(`loading_${index}`).style.display = 'none';
    };
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('newIceCandidate', {
          candidate: event.candidate,
          index,
          type,
          peer,
        });
      }
    };
    peerList[index] = peerConnection;
  };
  const createOffer = (index, peerConnection) => {
    peerConnection.createOffer().then(offer => {
      peerConnection.setLocalDescription(offer, () => {
        socket.emit('videoOffer', {
          offer,
          index,
          type,
          peer,
        });
      });
    });
  };
  const socketInit = () => {
    socket.on('videoOffer', ({ index, offer }) => {
      if (peerList[index]) {
        peerList[index].setRemoteDescription(offer, () => {
          peerList[index].createAnswer().then(answer => {
            peerList[index].setLocalDescription(answer, () => {
              socket.emit('videoAnswer', {
                answer,
                index,
                type,
                peer,
              });
            });
          });
        });
      }
    });
    socket.on('videoAnswer', ({ answer, index }) => {
      if (peerList[index]) {
        peerList[index].setRemoteDescription(answer);
      }
    });
    socket.on('newIceCandidate', ({ candidate, index }) => {
      if (candidate && peerList[index]) {
        peerList[index].addIceCandidate(candidate);
      }
    });
  };
  useEffect(() => {
    if (visible) {
      getUserMedia().then(() => {
        socket.emit('getUserMediaFinish', {
          account: email,
          type,
          peer,
        });
      });
      socketInit();
      const memberInfos = type === FRIEND_TYPE.FRIEND ? [{ email }, { email: peer }] : memberInfo;
      socket.on('getUserMediaFinish', ({ account }) => {
        if (memberInfos.length > 1) {
          memberInfos.forEach(info => {
            if (!peerList[getIndex(info.email, email)] && info.email !== email) {
              getPeerConnection(getIndex(info.email, email));
            }
          });
          if (account === email) {
            Object.keys(peerList).forEach(index => {
              createOffer(index, peerList[index]);
            });
          }
        }
      });
      socket.on('hangUp', ({ account }) => {
        document.getElementById(`loading_${getIndex(email, account)}`).style.display = 'inherit';
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
      destroyOnClose
    >
      <div className={styles.mediaChatWrapper}>
        {type === FRIEND_TYPE.FRIEND && (
          <div className={styles.friendMediaWrapper}>
            <div className={styles.videoWrapper}>
              <video className={styles.video} autoPlay id={getIndex(email, email)} />
              <Spin tip="载入中..." id={`loading_${getIndex(email, email)}`} />
            </div>
            <div className={styles.videoWrapper}>
              <video className={styles.video} autoPlay id={getIndex(peer, email)} />
              <Spin tip="等待应答..." id={`loading_${getIndex(peer, email)}`} />
            </div>
          </div>
        )}
        {type === FRIEND_TYPE.GROUP && memberInfo.length > 0 && (
          <div className={styles.groupMediaWrapper}>
            <div className={styles.chosenMediaChat} />
            <div className={styles.otherMediaChat}>
              {[
                memberInfo.find(member => member.email === email),
                ...memberInfo.filter(member => member.email !== email),
              ].map(m => (
                <div
                  className={`${styles.videoWrapper} ${m.email === email ? styles.big : ''}`}
                  key={m.email}
                  onClick={() => {
                    const clickedWrapper = document.getElementById(getIndex(email, m.email))
                      .parentElement;
                    const allWrappers = document.getElementsByClassName(styles.videoWrapper);
                    for (let i = 0; i < allWrappers.length; i += 1) {
                      const videoWrapper = allWrappers[i];
                      videoWrapper.classList.remove(styles.big);
                    }
                    clickedWrapper.classList.add(styles.big);
                  }}
                >
                  <video className={styles.video} autoPlay id={getIndex(email, m.email)} />
                  <div className={styles.desc}>
                    <Avatar src={m.avatar || DEFAULT_AVATAR} /> {m.name}
                  </div>
                  <Spin id={`loading_${getIndex(email, m.email)}`} />
                </div>
              ))}
            </div>
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
}))(MediaChat);
