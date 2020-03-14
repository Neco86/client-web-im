import React, { useEffect, useState, useRef, Fragment } from 'react';
import {
  UsergroupAddOutlined,
  SmileOutlined,
  FolderOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { defaultAvatar } from '@/utils/utils';
import { Avatar, Input } from 'antd';
import emoji from 'node-emoji';
import styles from './SelfChat.less';
import Emoji from './Emoji';

const useSelfChat = chatKey => {
  const [chatInfo, setChatInfo] = useState({
    // 备注名
    nickName: '',
    // 对方头像
    avatar: '',
    // 我的头像
    myAvatar: '',
    // 最近10条记录 1对方的 2我的
    // [{type: '',msg: ''}]
    history: [],
  });
  useEffect(() => {
    setChatInfo({
      nikeName: `备注名&chatKey:${chatKey}`,
      avatar: defaultAvatar,
      myAvatar: defaultAvatar,
      history: [
        {
          type: '1',
          msg: 'history1',
          time: '1583995667001',
        },
        {
          type: '1',
          msg: 'history1',
          time: '1583995667002',
        },
        {
          type: '2',
          msg: 'ok received history1',
          time: '1583995673444',
        },
        {
          type: '1',
          msg: 'ok',
          time: '1583995694345',
        },
        {
          type: '1',
          msg:
            'longMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsg',
          time: '1583995694347',
        },
      ],
    });
  }, [chatKey]);
  return [chatInfo, setChatInfo];
};

const SelfChat = ({ chatKey }) => {
  const [chatInfo, setChatInfo] = useSelfChat(chatKey);
  const [emojiBox, setEmojiBox] = useState(false);
  const inputEl = useRef(null);

  const [input, setInput] = useState('');
  // 监控按键
  useEffect(() => {
    document.onkeydown = e => {
      const keyCode = e.keyCode || e.which || e.charCode;
      const ctrlKey = e.ctrlKey || e.metaKey;
      // 换行
      if (ctrlKey && keyCode === 13) {
        setInput(`${input}\n`);
        const inputEle = document.getElementById('chatInput');
        if (inputEle.scrollHeight > inputEle.clientHeight) {
          inputEle.scrollTop = inputEle.scrollHeight;
        }
        e.preventDefault();
        return false;
      }
      // 发送信息
      if (keyCode === 13) {
        if (input) {
          const history = JSON.parse(JSON.stringify(chatInfo.history));
          history.push({
            type: '2',
            msg: input,
            time: String(Date.now()),
          });
          setChatInfo({ ...chatInfo, history });
          const contentEle = document.getElementById('content');
          if (contentEle.scrollHeight > contentEle.clientHeight) {
            contentEle.scrollTop = contentEle.scrollHeight;
          }
          setInput('');
        }
        e.preventDefault();
        return false;
      }
      return true;
    };
  }, [input]);

  // 聊天内容自动滚动到底部
  const contentEle = document.getElementById('content');
  useEffect(() => {
    // 判断元素是否出现了滚动条
    if (contentEle && contentEle.scrollHeight > contentEle.clientHeight) {
      // 设置滚动条到最底部
      contentEle.scrollTop = contentEle.scrollHeight;
    }
  }, [contentEle, chatKey]);

  // 处理选择emoji
  const handleEmojiClick = name => {
    setEmojiBox(false);
    setInput(`${input}${emoji.get(name)}`);
    inputEl.current.focus();
  };

  return (
    <div className={styles.selfChatWrapper}>
      <div className={styles.header}>
        <div className={styles.nickName}>{chatInfo.nikeName}</div>
        <div className={styles.addChatGroup}>
          <UsergroupAddOutlined />
        </div>
      </div>
      <div className={styles.content} id="content">
        {chatInfo.history.map(chat => {
          switch (chat.type) {
            case '1': // 对方的消息
              return (
                <div key={`${chat.time} ${chat.type}`} className={styles.peerChatMsg}>
                  <div>
                    <Avatar src={chatInfo.avatar} size="small" />
                  </div>
                  <div className={styles.msg}>
                    {chat.msg.split('\n').map((msg, index) =>
                      index === 0 ? (
                        msg
                      ) : (
                        <Fragment key={+index}>
                          <br />
                          {msg}
                        </Fragment>
                      ),
                    )}
                  </div>
                </div>
              );
            case '2': // 我的消息
              return (
                <div key={`${chat.time} ${chat.type}`} className={styles.myChatMsg}>
                  <div>
                    <Avatar src={chatInfo.myAvatar} size="small" />
                  </div>
                  <div className={styles.msg}>
                    {chat.msg.split('\n').map((msg, index) =>
                      index === 0 ? (
                        msg
                      ) : (
                        <Fragment key={+index}>
                          <br />
                          {msg}
                        </Fragment>
                      ),
                    )}
                  </div>
                </div>
              );
            default:
              return <div />;
          }
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.tools}>
          <SmileOutlined onClick={() => setEmojiBox(!emojiBox)} />
          <FolderOutlined />
          <PhoneOutlined />
          <VideoCameraOutlined />
          {emojiBox && <Emoji handleEmojiClick={handleEmojiClick} />}
        </div>
        <div className={styles.inputArea}>
          <Input.TextArea
            autoFocus
            value={input}
            onChange={e => {
              setInput(e.target.value);
            }}
            id="chatInput"
            ref={inputEl}
          />
        </div>
      </div>
    </div>
  );
};

export default SelfChat;
