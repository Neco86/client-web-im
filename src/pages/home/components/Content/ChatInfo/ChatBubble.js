import React, { Fragment } from 'react';
import { Avatar } from 'antd';
import { FileTextOutlined, DownloadOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR, MSG_TYPE } from '@/utils/const';
import emoji from 'node-emoji';
import FileSaver from 'file-saver';
import { ZIP } from '@/utils/zip';
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
      <div className={styles.name}>{chat.name}</div>
    </div>
  </div>
);

export default ChatBubble;
