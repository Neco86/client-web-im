import React from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const ContentChat = ({ activeChat }) => {
  return (
    <div className={styles.contentChatWrapper}>
      {
        activeChat
          ? `contentChat ${activeChat}`
          : <Empty description='' />
      }
    </div>
  )
}

export default connect(({ home }) => ({
  activeChat: home.activeChat
}))(ContentChat);