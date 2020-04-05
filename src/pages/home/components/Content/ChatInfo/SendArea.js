import React, { useState, useRef, useEffect } from 'react';
import { Input, Popover } from 'antd';
import {
  SmileOutlined,
  PictureOutlined,
  FolderOutlined,
  PhoneOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { MSG_TYPE } from '@/utils/const';
import emoji from 'node-emoji';
import Emoji from './Emoji';
import styles from './index.less';

const SendArea = ({ sendMsg, disabled, activeChat }) => {
  const inputEl = useRef(null);
  const uploadImgInput = useRef({ current: { files: [] } });
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
        sendMsg(emoji.unemojify(input), MSG_TYPE.COMMON_CHAT);
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
  const sendImgMsg = e => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[1];
      if (['jpg', 'png', 'jpeg'].includes(type)) {
        sendMsg({ file, type }, MSG_TYPE.PICTURE);
      }
    }
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
        <PictureOutlined
          className={styles.tool}
          onClick={() => {
            uploadImgInput.current.click();
          }}
        />
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
      <input
        ref={uploadImgInput}
        type="file"
        accept="image/jpg, image/png"
        style={{ display: 'none' }}
        onChange={sendImgMsg}
      />
    </div>
  );
};

export default SendArea;
