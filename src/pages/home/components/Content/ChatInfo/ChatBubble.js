import React, { Fragment } from 'react';
import { Avatar, Button } from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  FolderOpenOutlined,
  PhoneOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { DEFAULT_AVATAR, MSG_TYPE, FRIEND_TYPE } from '@/utils/const';
import emoji from 'node-emoji';
import FileSaver from 'file-saver';
import { ZIP } from '@/utils/zip';
import styles from './index.less';

const ChatBubble = ({ chat, sendMsg, type, email }) => (
  <div
    className={styles.chatBubbleWrapper}
    style={{ flexDirection: `${chat.self ? 'row-reverse' : 'row'}` }}
  >
    <div>
      <Avatar src={chat.avatar || DEFAULT_AVATAR} size="small" />
    </div>
    <div className={`${styles.msg} ${chat.self ? styles.self : styles.peer}`}>
      {chat.msgType === MSG_TYPE.COMMON_CHAT &&
        chat.msg.split('\n').map((msg, index) =>
          index === 0 ? (
            emoji.emojify(msg)
          ) : (
            <Fragment key={+index}>
              <br />
              {emoji.emojify(msg)}
            </Fragment>
          ),
        )}
      {chat.msgType === MSG_TYPE.PICTURE && (
        <img alt="" src={chat.msg} style={{ height: '200px' }} />
      )}
      {chat.msgType === MSG_TYPE.FILE && (
        <div>
          <FileTextOutlined />
          {JSON.parse(chat.msg).name}
          <a
            onClick={() => {
              const { src, name } = JSON.parse(chat.msg);
              FileSaver.saveAs(src, name);
            }}
          >
            <DownloadOutlined />
          </a>
        </div>
      )}
      {chat.msgType === MSG_TYPE.FOLDER && (
        <div>
          <FolderOpenOutlined />
          {JSON.parse(chat.msg).folderName}
          <a
            onClick={() => {
              const { baseSrc, folderName, paths } = JSON.parse(chat.msg);
              const readableStream = new ZIP({
                async pull(ctrl) {
                  for (let i = 0; i < paths.length; i += 1) {
                    const path = paths[i];
                    const url = `${baseSrc}/${path}`;
                    // eslint-disable-next-line no-await-in-loop
                    const res = await fetch(url);
                    const stream = () => res.body;
                    const name = path;
                    ctrl.enqueue({ name, stream });
                  }
                  ctrl.close();
                },
              });
              new Response(readableStream).blob().then(blob => {
                FileSaver.saveAs(blob, `${folderName}.zip`);
              });
            }}
          >
            <DownloadOutlined />
          </a>
        </div>
      )}
      {chat.msgType === MSG_TYPE.ONLINE_FILE && (
        <div>
          {chat.self ? (
            <>
              等待对方接收文件
              <FileTextOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方请求发送文件
              <FileTextOutlined />
              {chat.msg}
              <Button
                type="primary"
                onClick={() => {
                  sendMsg(chat, MSG_TYPE.AGREE_ONLINE_FILE);
                }}
              >
                接收
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  sendMsg(chat, MSG_TYPE.DISAGREE_ONLINE_FILE);
                }}
              >
                拒绝
              </Button>
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.ONLINE_FOLDER && (
        <div>
          {chat.self ? (
            <>
              等待对方接收文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方请求发送文件夹
              <FolderOpenOutlined />
              {chat.msg}
              <Button
                type="primary"
                onClick={() => {
                  sendMsg(chat, MSG_TYPE.AGREE_ONLINE_FOLDER);
                }}
              >
                接收
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  sendMsg(chat, MSG_TYPE.DISAGREE_ONLINE_FOLDER);
                }}
              >
                拒绝
              </Button>
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.CANCEL_ONLINE_FILE && (
        <div>
          {chat.self ? (
            <>
              取消发送在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方已取消发送在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.CANCEL_ONLINE_FOLDER && (
        <div>
          {chat.self ? (
            <>
              取消发送在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方已取消发送在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.AGREE_ONLINE_FILE && (
        <div>
          {chat.self ? (
            <>
              已同意接收在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方同意接收在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.AGREE_ONLINE_FOLDER && (
        <div>
          {chat.self ? (
            <>
              已同意接收在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方同意接收在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.DISAGREE_ONLINE_FILE && (
        <div>
          {chat.self ? (
            <>
              已拒绝接收在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方拒绝接收在线文件
              <FileTextOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.DISAGREE_ONLINE_FOLDER && (
        <div>
          {chat.self ? (
            <>
              已拒绝接收在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          ) : (
            <>
              对方拒绝接收在线文件夹
              <FolderOpenOutlined />
              {chat.msg}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.START_VIDEO_CHAT && (
        <div>
          {chat.self ? (
            <>
              发起视频聊天 <CameraOutlined />
            </>
          ) : (
            <>
              {type === FRIEND_TYPE.FRIEND && (
                <>
                  {Object.keys(JSON.parse(chat.msg)).includes(email) ? (
                    <>
                      {(JSON.parse(chat.msg)[email] === MSG_TYPE.JOIN_VIDEO_CHAT &&
                        '已加入的视频聊天') ||
                        (JSON.parse(chat.msg)[email] === MSG_TYPE.REJECT_VIDEO_CHAT &&
                          '已被拒绝视频聊天') ||
                        ''}
                    </>
                  ) : (
                    <>
                      邀您进行视频聊天 <CameraOutlined />
                      <Button
                        type="primary"
                        onClick={() => {
                          sendMsg(chat.key, MSG_TYPE.JOIN_VIDEO_CHAT);
                        }}
                      >
                        加入
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          sendMsg(chat.key, MSG_TYPE.REJECT_VIDEO_CHAT);
                        }}
                      >
                        拒绝
                      </Button>
                    </>
                  )}
                </>
              )}
              {type === FRIEND_TYPE.GROUP && (
                <>
                  邀您进行视频聊天 <CameraOutlined />
                  <Button
                    type="primary"
                    onClick={() => {
                      sendMsg(chat.key, MSG_TYPE.JOIN_VIDEO_CHAT);
                    }}
                  >
                    加入
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.START_AUDIO_CHAT && (
        <div>
          {chat.self ? (
            <>
              发起语音聊天 <PhoneOutlined />
            </>
          ) : (
            <>
              {type === FRIEND_TYPE.FRIEND && (
                <>
                  {Object.keys(JSON.parse(chat.msg)).includes(email) ? (
                    <>
                      {(JSON.parse(chat.msg)[email] === MSG_TYPE.JOIN_AUDIO_CHAT &&
                        '已加入的语音聊天') ||
                        (JSON.parse(chat.msg)[email] === MSG_TYPE.REJECT_AUDIO_CHAT &&
                          '已被拒绝语音聊天') ||
                        ''}
                    </>
                  ) : (
                    <>
                      邀您进行语音聊天 <PhoneOutlined />
                      <Button
                        type="primary"
                        onClick={() => {
                          sendMsg(chat.key, MSG_TYPE.JOIN_AUDIO_CHAT);
                        }}
                      >
                        加入
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          sendMsg(chat.key, MSG_TYPE.REJECT_AUDIO_CHAT);
                        }}
                      >
                        拒绝
                      </Button>
                    </>
                  )}
                </>
              )}
              {type === FRIEND_TYPE.GROUP && (
                <>
                  邀您进行语音聊天 <PhoneOutlined />
                  <Button
                    type="primary"
                    onClick={() => {
                      sendMsg(chat.key, MSG_TYPE.JOIN_AUDIO_CHAT);
                    }}
                  >
                    加入
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      )}
      {chat.msgType === MSG_TYPE.JOIN_VIDEO_CHAT && (
        <div>
          已加入视频聊天 <CameraOutlined />
        </div>
      )}
      {chat.msgType === MSG_TYPE.REJECT_VIDEO_CHAT && (
        <div>
          已拒绝视频聊天 <CameraOutlined />
        </div>
      )}
      {chat.msgType === MSG_TYPE.JOIN_AUDIO_CHAT && (
        <div>
          已加入语音聊天 <PhoneOutlined />
        </div>
      )}
      {chat.msgType === MSG_TYPE.REJECT_AUDIO_CHAT && (
        <div>
          已拒绝语音聊天 <PhoneOutlined />
        </div>
      )}
      <div className={styles.name}>{chat.name}</div>
    </div>
  </div>
);

export default ChatBubble;
