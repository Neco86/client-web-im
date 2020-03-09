import React from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const ContentList = ({ activeFriend }) => {
  return (
    <div className={styles.contentListWrapper}>
      {
        activeFriend
          ? `contentList ${activeFriend}`
          : <Empty description='' />
      }
    </div>
  )
}

export default connect(({ home }) => ({
  activeFriend: home.activeFriend
}))(ContentList);