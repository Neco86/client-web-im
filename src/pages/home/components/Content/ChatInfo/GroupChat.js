import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { MSG_TYPE, FRIEND_TYPE, DEFAULT_AVATAR, GROUP_PERMIT } from '@/utils/const';
import { BellOutlined, StarFilled, StopOutlined } from '@ant-design/icons';
import { Empty, Avatar } from 'antd';
import styles from './index.less';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import SendArea from './SendArea';

const GroupChat = ({
  chats,
  recentChats,
  activeChat,
  sendMsg,
  loadMore,
  hasMore,
  page,
  socket,
  memberInfo,
  groupGroups,
}) => {
  const peer = recentChats.filter(
    chat => chat.type === activeChat[0] && chat.peer === activeChat[1],
  )[0];
  const [groupBasicInfo, setGroupBasicInfo] = useState({});
  useEffect(() => {
    if (activeChat && activeChat[0] === FRIEND_TYPE.GROUP) {
      groupGroups.forEach(group => {
        group.groups.forEach(friends => {
          if (friends.chatKey === activeChat[1]) {
            setGroupBasicInfo(friends);
          }
        });
      });
      socket.emit('getGroupMemberInfo', { chatKey: activeChat[1] });
    }
  }, [activeChat]);
  return peer ? (
    <div className={styles.groupChatWrapper}>
      <div className={styles.chatWrapper}>
        <ChatHeader name={peer.name} />
        <Chats
          chats={chats.map(chat => ({
            ...chat,
            ...memberInfo.filter(member => member.email === chat.peer)[0],
          }))}
          loadMore={loadMore}
          hasMore={hasMore}
          page={page}
        />
        <SendArea
          sendMsg={msg => sendMsg(msg, MSG_TYPE.COMMON_CHAT)}
          disabled={groupBasicInfo.permit === GROUP_PERMIT.BANNED}
          activeChat={activeChat}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.note}>
          <div className={styles.title}>群公告</div>
          <div className={styles.noteContent}>
            {groupBasicInfo.note || (
              <Empty description="暂无群公告" image={<BellOutlined />} className={styles.empty} />
            )}
          </div>
        </div>
        <div className={styles.member}>
          <div className={styles.title}>成员 {groupBasicInfo.count}</div>
          <div className={styles.members}>
            {memberInfo.map(member => (
              <div className={styles.memberWrapper} key={member.email}>
                <Avatar
                  src={member.avatar || DEFAULT_AVATAR}
                  size="small"
                  className={styles.avatar}
                />
                <div className={styles.name}>{member.name}</div>
                <div className={styles.permit}>
                  {member.permit === GROUP_PERMIT.OWNER && (
                    <StarFilled style={{ color: '#F8AA1E' }} />
                  )}
                  {member.permit === GROUP_PERMIT.MANAGER && (
                    <StarFilled style={{ color: '#66D046' }} />
                  )}
                  {member.permit === GROUP_PERMIT.BANNED && <StopOutlined />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default connect(({ global, chat, userGroups }) => ({
  socket: global.socket,
  activeChat: chat.activeChat,
  recentChats: chat.recentChats,
  chats: chat.chats,
  memberInfo: chat.memberInfo,
  hasMore: chat.hasMore,
  groupGroups: userGroups.groupGroups,
}))(GroupChat);
