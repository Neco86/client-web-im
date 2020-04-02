import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const SendArea = ({ sendMsg }) => (
  <div className={styles.sendAreaWrapper}>
    <Button
      onClick={() => {
        sendMsg(Math.random());
      }}
    >
      Send Test Msg
    </Button>
  </div>
);

export default SendArea;
