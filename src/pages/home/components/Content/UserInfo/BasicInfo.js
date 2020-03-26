import React from 'react';
import { Avatar, Popover, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { FRIEND_TYPE, DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const content = (type, email) => (
  <div>
    <Button
      type="danger"
      className="exit"
      onClick={() => {
        console.log('TODO: 退出群聊/删除好友', type, email);
      }}
    >
      {type === FRIEND_TYPE.GROUP ? '退出群聊' : '删除好友'}
    </Button>
  </div>
);
const BasicInfo = ({ info, type }) => (
  <div
    className={`${styles.basicInfo} ${type === FRIEND_TYPE.GROUP ? styles.group : styles.friend}`}
  >
    <Avatar src={info.avatar || DEFAULT_AVATAR} size="large" className={styles.avatar} />
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
      content={content(type, info.email || info.chatKey)}
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

export default BasicInfo;
