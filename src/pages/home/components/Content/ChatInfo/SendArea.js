import React, { useState, useRef, useEffect } from 'react';
import { Input, Popover } from 'antd';
import {
  SmileOutlined,
  PictureOutlined,
  FolderOutlined,
  PhoneOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import emoji from 'node-emoji';
import Emoji from './Emoji';
import styles from './index.less';

const SendArea = ({ sendMsg, disabled, activeChat }) => {
  const inputEl = useRef(null);
  const [input, setInput] = useState('');
  const [emojiBox, setEmojiBox] = useState(false);
  useEffect(() => {
    if (activeChat) {
      setInput('');
      inputEl.current.focus();
    }
  }, [activeChat]);
  const onKeyDown = e => {
    const keyCode = e.keyCode || e.which || e.charCode;
    const ctrlKey = e.ctrlKey || e.metaKey;
    // 换行
    if (ctrlKey && keyCode === 13) {
      setInput(`${input}\n`);
      e.preventDefault();
      return false;
    }
    // 发送信息
    if (keyCode === 13) {
      if (input) {
        sendMsg(emoji.unemojify(input));
        setInput('');
      }
      e.preventDefault();
      return false;
    }
    return true;
  };
  const handleEmojiClick = name => {
    setEmojiBox(false);
    setInput(`${input}${emoji.get(name)}`);
    inputEl.current.focus();
  };
  return (
    <div className={styles.sendAreaWrapper}>
      <div className={styles.tools}>
        <Popover
          trigger="click"
          visible={emojiBox && !disabled}
          content={<Emoji handleEmojiClick={handleEmojiClick} />}
          getPopupContainer={trigger => trigger.parentNode}
          autoFocus
          onBlur={() => {
            setEmojiBox(false);
          }}
        >
          <SmileOutlined
            className={styles.tool}
            onClick={() => {
              setEmojiBox(!emojiBox);
            }}
          />
        </Popover>
        <PictureOutlined className={styles.tool} />
        <FolderOutlined className={styles.tool} />
        <PhoneOutlined className={styles.tool} />
        <CameraOutlined className={styles.tool} />
      </div>
      <div className={styles.textarea}>
        <Input.TextArea
          autoFocus
          className={styles.input}
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
          placeholder={disabled ? '被禁言,无法发送消息!' : ''}
          onKeyDown={onKeyDown}
          ref={inputEl}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SendArea;
