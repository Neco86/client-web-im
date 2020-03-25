import React from 'react';
import { connect } from 'dva';

const UserInfo = () => <div>UserInfo</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(UserInfo);
