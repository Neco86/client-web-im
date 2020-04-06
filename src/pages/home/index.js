import React, { useState, useEffect } from 'react';
import {
  TOKEN_NAME,
  USER_STATUS,
  FRIEND_TYPE,
  DEFAULT_AVATAR,
  SUCCESS_CODE,
  EDIT_GROUP,
  EDIT_FRIEND,
  MENU_KEY,
  MSG_TYPE,
} from '@/utils/const';
import { message, notification, Avatar } from 'antd';
import io from 'socket.io-client';
import { connect } from 'dva';
import FileSaver from 'file-saver';
import { ZIP } from '@/utils/zip';
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
                dispatch({
                  type: 'global/setMenuKey',
                  menuKey: MENU_KEY.USER_INFO,
                });
                dispatch({
                  type: 'friendApply/setModal',
                  friendApplyModal: true,
                });
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
                dispatch({
                  type: 'global/setMenuKey',
                  menuKey: MENU_KEY.USER_INFO,
                });
                dispatch({
                  type: 'friendApply/setModal',
                  friendApplyModal: true,
                });
              },
            });
          }
        },
      );
      // 获取好友分组
      socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
      // 获取群聊分组
      socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      // 获取最近聊天
      socket.emit('getRecentChat');
      // 设置最近聊天
      socket.on('setRecentChat', recentChats => {
        dispatch({
          type: 'chat/setRecentChats',
          recentChats,
        });
      });
      // 更新最近聊天
      socket.on('updateRecentChat', () => {
        socket.emit('getRecentChat');
      });
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
            dispatch({
              type: 'global/setMenuKey',
              menuKey: MENU_KEY.CHAT_INFO,
            });
            dispatch({
              type: 'chat/setActiveChat',
              activeChat: [FRIEND_TYPE.FRIEND, email],
            });
            socket.emit('setRecentChat', { peer: email, type: FRIEND_TYPE.FRIEND, unread: 0 });
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
      // 删除好友/退出群聊/解散群聊
      socket.on('editFriend', ({ type }) => {
        switch (type) {
          // 删除好友
          case EDIT_FRIEND.DELETE_FRIEND:
            message.success('删除好友成功!');
            socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
            break;
          // 退出群聊
          case EDIT_FRIEND.EXIT_GROUP:
            message.success('退出群聊成功!');
            socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
            break;
          // 解散群聊
          case EDIT_FRIEND.DELETE_GROUP:
            message.success('解散群聊成功!');
            socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
            break;
          default:
            break;
        }
        dispatch({
          type: 'addressBook/setActiveMenu',
          activeMenu: [],
        });
      });
      // 删除好友消息
      socket.on('deleteFriend', () => {
        socket.emit('getMyGroup', FRIEND_TYPE.FRIEND);
      });
      // 退出群聊消息
      socket.on('exitGroup', ({ avatar, nickname, email, groupName, groupAvatar, chatKey }) => {
        notification.open({
          message: (
            <>
              <Avatar src={avatar || DEFAULT_AVATAR} /> {nickname} ({email})
            </>
          ),
          description: (
            <>
              退出群组: <Avatar src={groupAvatar || DEFAULT_AVATAR} size="small" /> {groupName} (
              {chatKey})
            </>
          ),
          onClick: () => {},
        });
        socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      });
      // 解散群聊消息
      socket.on('deleteGroup', () => {
        socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      });
      // 查询好友通知
      socket.on('getFriendApply', friendApply => {
        dispatch({
          type: 'friendApply/setApply',
          apply: friendApply,
        });
      });
      // 同意/拒绝申请
      socket.on('handleApply', ({ agree, friend, email, chatKey }) => {
        message.success(
          `您${agree ? '同意' : '拒绝'}了${
            chatKey ? ` ${email} 加入群聊 ${chatKey} ` : ` ${email} 的好友申请`
          }`,
        );
        socket.emit('getFriendApply');
        if (agree) {
          socket.emit('getMyGroup', friend ? FRIEND_TYPE.FRIEND : FRIEND_TYPE.GROUP);
        }
      });
      // 被同意/拒绝申请
      socket.on('handledApply', ({ agree, friend, email, chatKey, nickname, avatar }) => {
        notification.open({
          message: (
            <>
              <Avatar src={avatar || DEFAULT_AVATAR} /> {nickname} ({email || chatKey})
            </>
          ),
          description: (
            <>
              {friend ? '加好友' : '加入群聊'}
              {agree ? '被同意' : '被拒绝'}
            </>
          ),
          onClick: () => {
            if (agree) {
              dispatch({
                type: 'global/setMenuKey',
                menuKey: MENU_KEY.CHAT_INFO,
              });
              dispatch({
                type: 'chat/setActiveChat',
                activeChat: [
                  friend ? FRIEND_TYPE.FRIEND : FRIEND_TYPE.GROUP,
                  friend ? email : chatKey,
                ],
              });
              socket.emit('setRecentChat', {
                peer: friend ? email : chatKey,
                type: friend ? FRIEND_TYPE.FRIEND : FRIEND_TYPE.GROUP,
                unread: 0,
              });
            }
          },
        });
        socket.emit('getFriendApply');
        if (agree) {
          socket.emit('getMyGroup', friend ? FRIEND_TYPE.FRIEND : FRIEND_TYPE.GROUP);
        }
      });
      // 创建群聊
      socket.on('createGroup', ({ my, chatKey, nickname, groupName }) => {
        if (my) {
          message.success(`${groupName}: ${nickname} (${chatKey}) 创建成功!`);
        } else {
          message.success(`${groupName}: ${nickname} (${chatKey}) 邀请您进入群组!`);
        }
        socket.emit('getMyGroup', FRIEND_TYPE.GROUP);
      });
      // 获取聊天内容
      socket.on('setChats', ({ chats, page, hasMore }) => {
        dispatch({
          type: 'chat/setChats',
          payload: { chats, page, hasMore },
        });
      });
      // 收到消息
      socket.on('receivedMsg', msg => {
        dispatch({
          type: 'chat/receivedMsg',
          msg,
        });
        if (msg.msgType === MSG_TYPE.DISAGREE_ONLINE_FILE) {
          dispatch({
            type: 'chat/setSelectedFile',
            selectedFile: '',
          });
        }
        if (msg.msgType === MSG_TYPE.DISAGREE_ONLINE_FOLDER) {
          dispatch({
            type: 'chat/setSelectedFolder',
            selectedFolder: '',
          });
        }
        // 对方同意了接收文件,设置key,请求文件数据
        if (
          msg.msgType === MSG_TYPE.AGREE_ONLINE_FILE ||
          msg.msgType === MSG_TYPE.AGREE_ONLINE_FOLDER
        ) {
          dispatch({
            type: 'chat/setAgree',
            agree: msg.key,
          });
        }
        // 自己请求发送文件,保存key,以便后续更改为离线
        if (
          (msg.msgType === MSG_TYPE.ONLINE_FILE || msg.msgType === MSG_TYPE.ONLINE_FOLDER) &&
          msg.self
        ) {
          dispatch({
            type: 'chat/setFileKey',
            fileKey: msg.key,
          });
        }
      });
      // 同意接收文件后收到的文件
      socket.on('receivedFile', params => {
        const { msgType } = params;
        if (msgType === MSG_TYPE.FILE) {
          const {
            msg: { file, name },
          } = params;
          FileSaver.saveAs(new Blob([file]), name);
        }
        if (msgType === MSG_TYPE.FOLDER) {
          const {
            msg: { fileList, folderName },
          } = params;
          const readableStream = new ZIP({
            start(ctrl) {
              for (let i = 0; i < fileList.length; i += 1) {
                const { file, path } = fileList[i];
                ctrl.enqueue(new File([new Blob([file])], path));
              }
              ctrl.close();
            },
          });
          new Response(readableStream).blob().then(blob => {
            FileSaver.saveAs(blob, `${folderName}.zip`);
          });
        }
      });
      // 获取群聊信息
      socket.on('setGroupMemberInfo', info => {
        dispatch({
          type: 'chat/setGroupMemberInfo',
          info,
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
