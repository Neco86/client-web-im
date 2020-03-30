import React from 'react';
import { connect } from 'dva';

const ChatInfo = ({ activeChat }) => (
  <div>
    {/* TODO: 获取聊天信息 */}
    {JSON.stringify(activeChat)}
  </div>
);

export default connect(({ global, chat }) => ({
  socket: global.socket,
  activeChat: chat.activeChat,
}))(ChatInfo);
