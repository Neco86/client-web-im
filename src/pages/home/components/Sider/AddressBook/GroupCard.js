import React from 'react';
import { Avatar } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const GroupCard = ({ group }) => (
  <div className={styles.card}>
    <div className={styles.avatar}>
      <Avatar src={group.avatar || DEFAULT_AVATAR} />
    </div>
    <div className={styles.info}>
      <div className={styles.name}>{group.remarkName || group.nickname}</div>
      <div className={styles.note}>{group.note && `公告: ${group.note}`}</div>
    </div>
  </div>
);
export default GroupCard;
