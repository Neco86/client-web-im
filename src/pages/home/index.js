import React, { useState, useEffect } from 'react';
import { TOKEN_NAME, USER_STATUS, FRIEND_TYPE, DEFAULT_AVATAR } from '@/utils/const';
import { message, notification, Avatar } from 'antd';
import io from 'socket.io-client';
import { connect } from 'dva';
import router from 'umi/router';
import Header from './components/Header';
import Sider from './components/Sider';
import Content from './components/Content';
import styles from './index.less';

// 连接socket
function useSocket(dispatch) {
  const token = sessionStorage.getItem(TOKEN_NAME) || localStorage.getItem(TOKEN_NAME);
  const [socket] = useState(io(`http://127.0.0.1:7001?token=${token}`));
  useEffect(() => {
    if (socket) {
      // 请求初始化
      socket.emit('init');
      // 初始化
      socket.on('init', ({ nickname }) => {
        message.success(`Welcome ${nickname}!`);
        dispatch({
          type: 'userInfo/setUserInfo',
          payload: { nickname },
        });
      });
      // 获取用户信息
      socket.on('getUserInfo', payload => {
        dispatch({
          type: 'userInfo/setUserInfo',
          payload,
        });
      });
      // 更改用户信息
      socket.on('setUserInfo', payload => {
        if (payload.status === USER_STATUS.OFFLINE) {
          socket.successReason = '离线成功!';
          socket.disconnect();
        }
        dispatch({
          type: 'userInfo/setUserInfo',
          payload,
        });
      });
      // 查询好友/群聊
      socket.on('searchInfo', payload => {
        dispatch({
          type: 'searchInfo/setSearchInfo',
          payload,
        });
      });
      // 添加好友
      socket.on('addFriend', ({ account, friendType, msg }) => {
        message.success(msg);
        dispatch({
          type: 'searchInfo/setAddFriendResult',
          payload: { account, friendType },
        });
      });
      // 申请加好友
      socket.on('applyFriend', ({ email, nickname, avatar, reason, type }) => {
        if (type === FRIEND_TYPE.FRIEND) {
          notification.open({
            message: (
              <>
                <Avatar src={avatar || DEFAULT_AVATAR} /> {nickname} ({email})
              </>
            ),
            description: (
              <>
                申请成为好友
                {reason && <div style={{ margin: '8px 0' }}>验证消息: {reason}</div>}
              </>
            ),
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }
        if (type === FRIEND_TYPE.GROUP) {
          console.log('群组消息');
        }
        // console.log(payload);
      });
      // 获取分组
      socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
      socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      socket.on('getMyGroup', ({ friendType, groups }) => {
        dispatch({
          type: 'userGroups/setUserGroups',
          payload: { friendType, groups },
        });
      });
      // 断开连接
      socket.on('disconnect', () => {
        if (socket.successReason) {
          message.success(socket.successReason);
          socket.successReason = '';
        } else {
          message.error('用户令牌失效,请重新登录!');
          router.push('/login');
        }
      });
    }
  }, [socket]);
  return socket;
}

const Home = ({ dispatch }) => {
  const socket = useSocket(dispatch);
  dispatch({
    type: 'global/setSocket',
    socket,
  });
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.sider}>
          <Sider />
        </div>
        <div className={styles.content}>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default connect()(Home);
