import React from 'react';
import { Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import GroupInfo from './GroupInfo';
import styles from './index.less';
import SelfInfo from './SelfInfo';

const Info = ({ type, info, setInfo }) => {
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.setting}>
        设置
      </div>
      <div className={styles.baseInfo}>
        <div className={styles.avatar}>
          <Avatar src={info.avatar} size='large' />
        </div>
        <div className={styles.nickName}>
          {info.nickName || info.name}
        </div>
        <div className={styles.sign}>
          {
            type === '1' && info.email
          }
          {
            type === '2' && info.sign
          }
        </div>
        <div className={styles.jumpToChat}>
          <MessageOutlined />
        </div>
      </div>
      <div className={styles.otherInfo}>
        {
          type === '1' && <GroupInfo info={info} setInfo={setInfo} />
        }
        {
          type === '2' && <SelfInfo info={info} setInfo={setInfo} />
        }
      </div>
    </div>
  )
}

export default Info;
