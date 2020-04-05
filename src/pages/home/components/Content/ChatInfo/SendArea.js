import React, { useState, useRef, useEffect } from 'react';
import { Input, Popover, Dropdown, Menu, Modal, Spin } from 'antd';
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
  const uploadFileInput = useRef({ current: { files: [] } });
  const uploadFolderInput = useRef({ current: { files: [] } });
  const [input, setInput] = useState('');
  const [emojiBox, setEmojiBox] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFolder, setSelectedFolder] = useState();

  useEffect(() => {
    if (activeChat) {
      setInput('');
      inputEl.current.focus();
    }
  }, [activeChat]);
  // 输入框文字操作(换行/发送文字消息)
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
  // 处理点击表情
  const handleEmojiClick = name => {
    setEmojiBox(false);
    setInput(`${input}${emoji.get(name)}`);
    inputEl.current.focus();
  };
  // 发送图片消息
  const sendImgMsg = e => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[1];
      if (['jpg', 'png', 'jpeg'].includes(type)) {
        sendMsg({ file, type }, MSG_TYPE.PICTURE);
      }
    }
  };
  // 发送离线文件/文件夹
  const sendFileMsg = () => {
    if (selectedFile) {
      sendMsg({ file: selectedFile[0], name: selectedFile[0].name }, MSG_TYPE.FILE);
      setSelectedFile('');
    }
    if (selectedFolder) {
      const fileList = [];
      Array.prototype.forEach.call(selectedFolder, file => {
        if (file.name !== '.DS_Store') {
          fileList.push({
            file,
            path: file.webkitRelativePath,
          });
        }
      });
      const name = selectedFolder[0].webkitRelativePath.split('/')[0];
      sendMsg({ fileList, folderName: name }, MSG_TYPE.FOLDER);
      setSelectedFolder('');
    }
  };
  const onFileUploadMenuClick = ({ key }) => {
    if (key === MSG_TYPE.FILE) {
      uploadFileInput.current.click();
    }
    if (key === MSG_TYPE.FOLDER) {
      uploadFolderInput.current.click();
    }
  };

  const fileUploadMenu = (
    <Menu onClick={onFileUploadMenuClick}>
      <Menu.Item key={MSG_TYPE.FILE}>发送文件</Menu.Item>
      <Menu.Item key={MSG_TYPE.FOLDER}>发送文件夹</Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.sendAreaWrapper}>
      <Modal
        visible={!!(selectedFile || selectedFolder)}
        onCancel={() => {
          setSelectedFile('');
          setSelectedFolder('');
        }}
        onOk={sendFileMsg}
        title={selectedFile ? '发送文件' : '发送文件夹'}
        okText="离线发送"
        cancelText="取消"
      >
        <Spin /> 等待对方接收{selectedFile ? '文件' : '文件夹'}
      </Modal>
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
        <Dropdown overlay={fileUploadMenu} trigger={['click']}>
          <FolderOutlined className={styles.tool} />
        </Dropdown>
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
      <input
        ref={uploadFileInput}
        type="file"
        style={{ display: 'none' }}
        onClick={e => {
          e.target.value = '';
          setSelectedFile('');
        }}
        onChange={e => {
          setSelectedFile(e.target.files);
        }}
      />
      <input
        ref={uploadFolderInput}
        type="file"
        multiple
        webkitdirectory=""
        style={{ display: 'none' }}
        onClick={e => {
          e.target.value = '';
          setSelectedFolder('');
        }}
        onChange={e => {
          setSelectedFolder(e.target.files);
        }}
      />
    </div>
  );
};

export default SendArea;
