import React, { useState, useRef, useEffect } from 'react';
import { Input, Popover, Dropdown, Menu, Modal, Spin } from 'antd';
import { connect } from 'dva';
import {
  SmileOutlined,
  PictureOutlined,
  FolderOutlined,
  PhoneOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { MSG_TYPE, FRIEND_TYPE } from '@/utils/const';
import emoji from 'node-emoji';
import Emoji from './Emoji';
import styles from './index.less';

const SendArea = ({
  sendMsg,
  disabled,
  activeChat,
  chats,
  selectedFolder,
  selectedFile,
  dispatch,
  agree,
  fileKey,
}) => {
  const inputEl = useRef(null);
  const uploadImgInput = useRef({ current: { files: [] } });
  const uploadFileInput = useRef({ current: { files: [] } });
  const uploadFolderInput = useRef({ current: { files: [] } });
  const [input, setInput] = useState('');
  const [emojiBox, setEmojiBox] = useState(false);
  const setSelectedFile = s1 => {
    dispatch({
      type: 'chat/setSelectedFile',
      selectedFile: s1,
    });
  };
  const setSelectedFolder = s2 => {
    dispatch({
      type: 'chat/setSelectedFolder',
      selectedFolder: s2,
    });
  };

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
  // 发送 离线/在线 文件/文件夹
  const sendFileMsg = (key, save) => {
    if (selectedFile) {
      sendMsg({ file: selectedFile[0], name: selectedFile[0].name, key, save }, MSG_TYPE.FILE);
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
      sendMsg({ fileList, folderName: name, key, save }, MSG_TYPE.FOLDER);
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
  useEffect(() => {
    if (activeChat[0] === FRIEND_TYPE.GROUP) {
      sendFileMsg(false, true);
    }
    if (activeChat[0] === FRIEND_TYPE.FRIEND) {
      if (selectedFile) {
        sendMsg(selectedFile[0].name, MSG_TYPE.ONLINE_FILE);
      }
      if (selectedFolder) {
        sendMsg(selectedFolder[0].webkitRelativePath.split('/')[0], MSG_TYPE.ONLINE_FOLDER);
      }
    }
  }, [selectedFile, selectedFolder]);
  useEffect(() => {
    if (agree) {
      sendFileMsg(agree, false);
      dispatch({
        type: 'chat/setAgree',
        agree: '',
      });
    }
  }, [agree]);
  return (
    <div className={styles.sendAreaWrapper}>
      <Modal
        visible={!!((selectedFile || selectedFolder) && activeChat[0] === FRIEND_TYPE.FRIEND)}
        onCancel={() => {
          if (selectedFile) {
            sendMsg(
              chats.filter(chat => chat.msgType === MSG_TYPE.ONLINE_FILE && chat.self)[0],
              MSG_TYPE.CANCEL_ONLINE_FILE,
            );
            setSelectedFile('');
          }
          if (selectedFolder) {
            sendMsg(
              chats.filter(chat => chat.msgType === MSG_TYPE.ONLINE_FOLDER && chat.self)[0],
              MSG_TYPE.CANCEL_ONLINE_FOLDER,
            );
            setSelectedFolder('');
          }
        }}
        onOk={() => sendFileMsg(fileKey, true)}
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

export default connect(({ chat }) => ({
  activeChat: chat.activeChat,
  chats: chat.chats,
  selectedFile: chat.selectedFile,
  selectedFolder: chat.selectedFolder,
  agree: chat.agree,
  fileKey: chat.fileKey,
}))(SendArea);
