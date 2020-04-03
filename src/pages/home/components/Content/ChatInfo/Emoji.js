import React, { Fragment } from 'react';
import emoji from 'node-emoji';
import { Carousel } from 'antd';
import emojiName from '@/utils/emoji.json';
import styles from './index.less';

// emoji 12 * 7 = 84 个每页
const handleEmojiName = emojiJson => {
  const names = [];
  Object.keys(emojiJson).forEach((name, index) => {
    const i = Math.floor(index / 84);
    if (!(names[i] instanceof Array)) {
      names[i] = [];
    }
    names[i].push(name);
  });
  return names;
};

const Emoji = ({ handleEmojiClick }) => (
  <div className={styles.emojiWrapper}>
    <Carousel>
      {handleEmojiName(emojiName).map((page, index) => (
        <div key={+index}>
          {page.map((name, i) => (
            <Fragment key={name}>
              <span
                onClick={() => {
                  handleEmojiClick(name);
                }}
                className={styles.emoji}
              >
                {emoji.get(name)}
              </span>
              {(i + 1) % 12 === 0 && <br />}
            </Fragment>
          ))}
        </div>
      ))}
    </Carousel>
  </div>
);

export default Emoji;
