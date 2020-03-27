import React, { useState, useEffect } from 'react';
import {
  TOKEN_NAME,
  USER_STATUS,
  FRIEND_TYPE,
  DEFAULT_AVATAR,
  SUCCESS_CODE,
  EDIT_GROUP,
} from '@/utils/const';
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
        if (payload.status === USER_STATUS.ONLINE) {
          socket.emit('online');
        }
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
      // 申请添加好友结果
      socket.on('addFriend', ({ account, friendType, msg }) => {
        message.success(msg);
        dispatch({
          type: 'searchInfo/setAddFriendResult',
          payload: { account, friendType },
        });
      });
      // 申请加好友
      socket.on(
        'applyFriend',
        ({ email, nickname, avatar, reason, type, chatKey, groupAvatar, groupName }) => {
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
                console.log('TODO: 申请加好友!');
              },
            });
          }
          if (type === FRIEND_TYPE.GROUP) {
            notification.open({
              message: (
                <>
                  <Avatar src={avatar || DEFAULT_AVATAR} /> {nickname} ({email})
                </>
              ),
              description: (
                <>
                  申请加入群组: <Avatar src={groupAvatar || DEFAULT_AVATAR} size="small" />{' '}
                  {groupName} ({chatKey})
                  <br />
                  {reason && <div style={{ margin: '8px 0' }}>验证消息: {reason}</div>}
                </>
              ),
              onClick: () => {
                console.log('TODO: 申请加群组!');
              },
            });
          }
          // console.log(payload);
        },
      );
      // 获取好友分组
      socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
      // 获取群聊分组
      socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      // 设置分组
      socket.on('getMyGroup', ({ friendType, groups }) => {
        dispatch({
          type: 'userGroups/setUserGroups',
          payload: { friendType, groups },
        });
      });
      // 好友上线通知
      socket.on('online', ({ email, nickname, avatar, groupKey }) => {
        dispatch({
          type: 'userGroups/setOnline',
          payload: { email, groupKey },
        });
        notification.open({
          message: (
            <>
              <Avatar src={avatar || DEFAULT_AVATAR} /> {nickname} ({email})
            </>
          ),
          description: '好友上线了',
          onClick: () => {
            console.log('TODO: 好友上线!');
          },
        });
      });
      // 好友离线
      socket.on('offline', ({ email, groupKey }) => {
        dispatch({
          type: 'userGroups/setOffline',
          payload: { email, groupKey },
        });
      });
      // 更改好友信息
      socket.on('changeFriendInfo', ({ email, value, type }) => {
        message.success('更改成功!');
        socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
        if (type === 'groupKey') {
          dispatch({
            type: 'addressBook/setActiveMenu',
            activeMenu: [FRIEND_TYPE.FRIEND, value, email],
          });
        }
      });
      // 更改群组信息
      socket.on('changeGroupInfo', ({ code, changedChatKey, value, type, msg }) => {
        if (code === SUCCESS_CODE) {
          message.success('更改成功!');
          socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
          if (type === 'groupKey') {
            dispatch({
              type: 'addressBook/setActiveMenu',
              activeMenu: [FRIEND_TYPE.GROUP, value, changedChatKey],
            });
          }
        } else {
          message.error(msg);
        }
      });
      // 更改群组头像
      socket.on('setGroupAvatar', ({ code, chatKey, avatar, msg }) => {
        if (code === SUCCESS_CODE) {
          dispatch({
            type: 'userGroups/setGroupAvatar',
            payload: { chatKey, avatar },
          });
        } else {
          message.error(msg);
        }
      });
      // 添加/删除/重命名分组
      socket.on('editGroup', ({ type, value, method }) => {
        switch (method) {
          case EDIT_GROUP.ADD:
            message.success(`添加分组[${value}]成功`);
            break;
          case EDIT_GROUP.DELETE:
            message.success(`删除分组[${value}]成功`);
            break;
          case EDIT_GROUP.RENAME:
            message.success(`重命名分组成功`);
            break;
          default:
            break;
        }
        socket.emit('getMyGroup', type);
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
