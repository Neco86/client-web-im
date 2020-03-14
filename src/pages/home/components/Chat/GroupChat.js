import React, { useEffect, useState, useRef, Fragment } from 'react';
import {
  UsergroupAddOutlined,
  FolderOutlined,
  SmileOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import emoji from 'node-emoji';
import { defaultAvatar } from '@/utils/utils';
import Emoji from './Emoji';
import styles from './GroupChat.less';

const useGroupChat = chatKey => {
  const [chatInfo, setChatInfo] = useState({
    // 群名
    nickName: '',
    // 群头像
    avatar: '',
    // 我的key
    myKey: '',
    // 最近10条记录 1群友的 2我的
    // [{type: '',msg: '',key,'',time:''}]
    history: [],
    // 群公告
    note: '',
    // 群成员
    // [{key: '',nickName:'',avatar:'',permit:''}]
    // 群聊权限 1 普通群员 2 管理员 3 群主
    members: [],
  });
  useEffect(() => {
    setChatInfo({
      nikeName: `群备注名&chatKey:${chatKey}`,
      avatar: defaultAvatar,
      myKey: '4',
      history: [
        {
          type: '1',
          msg: 'history1',
          key: '1',
          time: '1583995667001',
        },
        {
          type: '1',
          msg: 'history1',
          key: '2',
          time: '1583995667002',
        },
        {
          type: '2',
          msg: 'ok received history1',
          key: '4',
          time: '1583995673444',
        },
        {
          type: '1',
          msg: 'ok',
          key: '3',
          time: '1583995694345',
        },
        {
          type: '1',
          msg:
            'longMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsglongMsg',
          key: '1',
          time: '1583995694347',
        },
      ],
      note:
        '群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告',
      account: '100/103',
      // 群聊权限 1 普通群员 2 管理员 3 群主
      members: [
        {
          key: '1',
          nickName: '群友1&群主',
          avatar: defaultAvatar,
          permit: '3',
        },
        {
          key: '2',
          nickName: '群友2&管理员',
          avatar: defaultAvatar,
          permit: '2',
        },
        {
          key: '3',
          nickName: '群友3&管理员',
          avatar: defaultAvatar,
          permit: '2',
        },
        {
          key: '4',
          nickName: '我的群名片&管理员',
          avatar: defaultAvatar,
          permit: '2',
        },
        {
          key: '5',
          nickName: '群友5群友5群友5群友5群友5群友5群友5群友5',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '6',
          nickName: '群友6',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '7',
          nickName: '群友7',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '8',
          nickName: '群友8',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '9',
          nickName: '群友9',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '10',
          nickName: '群友10',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '11',
          nickName: '群友11',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '12',
          nickName: '群友12',
          avatar: defaultAvatar,
          permit: '1',
        },
        {
          key: '13',
          nickName: '群友13',
          avatar: defaultAvatar,
          permit: '1',
        },
      ],
    });
  }, [chatKey]);
  return [chatInfo, setChatInfo];
};

const GroupChat = ({ chatKey }) => {
  const [chatInfo, setChatInfo] = useGroupChat(chatKey);
  const [emojiBox, setEmojiBox] = useState(false);
  const inputEl = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);

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
            key: chatInfo.myKey,
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
    <div className={styles.groupChatWrapper}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.nickName}>{chatInfo.nikeName}</div>
          <div className={styles.tools}>
            <UsergroupAddOutlined />
            <FolderOutlined />
          </div>
        </div>
        <div className={styles.content} id="content">
          {chatInfo.history.map(chat => {
            const currentMember = chatInfo.members.filter(item => item.key === chat.key)[0];
            switch (chat.type) {
              case '1': // 对方的消息
                return (
                  <div key={`${chat.time} ${chat.type}`} className={styles.peerChatMsg}>
                    <div>
                      <Avatar src={currentMember.avatar} size="small" />
                    </div>
                    <div className={styles.nickName}>{currentMember.nickName}</div>
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
                      <Avatar src={currentMember.avatar} size="small" />
                    </div>
                    <div className={styles.nickName}>{currentMember.nickName}</div>
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
      <div className={styles.right}>
        <div className={styles.note}>
          <div className={styles.title}>群公告</div>
          <div className={styles.noteContent}>{chatInfo.note}</div>
        </div>
        <div className={styles.groupMember}>
          <div className={styles.title}>
            {searchVisible ? <Input autoFocus /> : <>成员 {chatInfo.account}</>}
            <SearchOutlined
              onClick={() => {
                setSearchVisible(!searchVisible);
              }}
            />
          </div>
          <div className={styles.members}>
            {chatInfo.members.map(item => (
              <div className={styles.member} key={item.key}>
                <div className={styles.avatar}>
                  <Avatar src={item.avatar} size="small" />
                </div>
                <div className={styles.nickName}>{item.nickName}</div>
                <div className={styles.permit}>
                  {(permit => {
                    switch (permit) {
                      // 普通群员
                      case '1':
                        return <></>;
                      // 管理员
                      case '2':
                        return <UserOutlined style={{ color: '#66D046', fontWeight: 'bold' }} />;
                      // 群主
                      case '3':
                        return <UserOutlined style={{ color: '#F8AA1E', fontWeight: 'bold' }} />;
                      default:
                        return <></>;
                    }
                  })(item.permit)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
