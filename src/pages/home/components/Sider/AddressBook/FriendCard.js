import React from 'react';
import { Avatar } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const FriendCard = ({ friend }) => (
  <div className={styles.card}>
    <div className={`${styles.avatar} ${friend.online ? '' : styles.offline}`}>
      <Avatar src={friend.avatar || DEFAULT_AVATAR} />
    </div>
    <div className={styles.info}>
      <div className={styles.name}>{friend.remarkName || friend.nickname}</div>
      <div className={styles.note}>
        {`[${friend.online ? '在线' : '离线'}] `}
        {friend.sign}
      </div>
    </div>
  </div>
);
export default FriendCard;
