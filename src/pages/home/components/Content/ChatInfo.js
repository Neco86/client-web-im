import React from 'react';
import { connect } from 'dva';

const ChatInfo = () => <div>ChatInfo</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(ChatInfo);
