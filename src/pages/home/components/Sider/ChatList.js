import React from 'react';
import { connect } from 'dva';

const ChatList = () => <div>ChatList</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(ChatList);
