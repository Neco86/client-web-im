import React, { Fragment } from 'react';
import { Avatar } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import emoji from 'node-emoji';
import styles from './index.less';

const ChatBubble = ({ chat }) => (
  <div
    className={styles.chatBubbleWrapper}
    style={{ flexDirection: `${chat.self ? 'row-reverse' : 'row'}` }}
  >
    <div>
      <Avatar src={chat.avatar || DEFAULT_AVATAR} size="small" />
    </div>
    <div className={`${styles.msg} ${chat.self ? styles.self : styles.peer}`}>
      {chat.msg.split('\n').map((msg, index) =>
        index === 0 ? (
          emoji.emojify(msg)
        ) : (
          <Fragment key={+index}>
            <br />
            {emoji.emojify(msg)}
          </Fragment>
        ),
      )}
    </div>
  </div>
);

export default ChatBubble;
