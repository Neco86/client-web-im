import React from 'react';
import styles from './index.less';

const ChatHeader = ({ name }) => <div className={styles.chatHeaderWrapper}>{name}</div>;

export default ChatHeader;
