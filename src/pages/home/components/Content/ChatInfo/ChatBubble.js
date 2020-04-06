import React, { Fragment } from 'react';
import { Avatar, Button } from 'antd';
import { FileTextOutlined, DownloadOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR, MSG_TYPE } from '@/utils/const';
import emoji from 'node-emoji';
import FileSaver from 'file-saver';
import { ZIP } from '@/utils/zip';
import styles from './index.less';

const ChatBubble = ({ chat, sendMsg }) => (
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
      <div className={styles.name}>{chat.name}</div>
    </div>
  </div>
);

export default ChatBubble;
