import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { FRIEND_TYPE, GROUP_PERMIT } from '@/utils/const';
import styles from './index.less';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import SendArea from './SendArea';
import GroupChatInfo from './GroupChatInfo';

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
  return peer && chats ? (
    <div className={styles.groupChatWrapper}>
      <div className={styles.chatWrapper}>
        <ChatHeader name={`${peer.name} (${peer.peer})`} />
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
          sendMsg={sendMsg}
          disabled={groupBasicInfo.permit === GROUP_PERMIT.BANNED}
          activeChat={activeChat}
        />
      </div>
      <GroupChatInfo groupBasicInfo={groupBasicInfo} memberInfo={memberInfo} />
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
