import React from 'react';
import { Avatar, Popover, Button, message } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { FRIEND_TYPE, DEFAULT_AVATAR, GROUP_PERMIT } from '@/utils/const';
import UserAvatar from '@/components/UserModal/UserAvatar';
import styles from './index.less';

const content = (type, email, permit) => (
  <div>
    {type === FRIEND_TYPE.GROUP && permit === GROUP_PERMIT.OWNER && (
      <Button
        className="contentButton"
        onClick={() => {
          console.log('TODO: 转移群主', type, email);
        }}
      >
        转移群主
      </Button>
    )}
    <Button
      type="danger"
      className="contentButton"
      onClick={() => {
        console.log('TODO: 退出群聊/删除好友', type, email);
      }}
    >
      {type === FRIEND_TYPE.FRIEND && '删除好友'}
      {type === FRIEND_TYPE.GROUP && permit === GROUP_PERMIT.OWNER && '解散群聊'}
      {type === FRIEND_TYPE.GROUP && permit !== GROUP_PERMIT.OWNER && '退出群聊'}
    </Button>
  </div>
);
const BasicInfo = ({ info, type, socket }) => {
  const changeAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[1];
      if (['jpg', 'png'].includes(fileType)) {
        socket.emit('setGroupAvatar', { file, type: fileType, chatKey: info.chatKey });
      } else {
        message.error('文件类型不支持!');
      }
    }
  };
  return (
    <div
      className={`${styles.basicInfo} ${type === FRIEND_TYPE.GROUP ? styles.group : styles.friend}`}
    >
      <div className={styles.avatar}>
        {type === FRIEND_TYPE.FRIEND && <Avatar src={info.avatar || DEFAULT_AVATAR} size="large" />}
        {type === FRIEND_TYPE.GROUP &&
          ([GROUP_PERMIT.OWNER, GROUP_PERMIT.MANAGER].includes(info.permit) ? (
            <UserAvatar avatar={info.avatar || DEFAULT_AVATAR} changeAvatar={changeAvatar} />
          ) : (
            <Avatar src={info.avatar || DEFAULT_AVATAR} size="large" />
          ))}
      </div>
      <div className={styles.name}>{info.remarkName || info.nickname}</div>
      <div className={styles.account}>
        {type === FRIEND_TYPE.GROUP && `群号: ${info.chatKey}`}
        {type === FRIEND_TYPE.FRIEND && info.sign}
      </div>
      <MessageOutlined
        className={styles.tools}
        onClick={() => {
          console.log('TODO: 跳转群聊/私聊', type, info.email || info.chatKey);
        }}
      />
      <Popover
        content={content(type, info.email || info.chatKey, info.permit)}
        title="设置"
        trigger="click"
        placement="leftTop"
        className={styles.edit}
        getPopupContainer={trigger => trigger.parentNode}
      >
        设置
      </Popover>
    </div>
  );
};

export default BasicInfo;
