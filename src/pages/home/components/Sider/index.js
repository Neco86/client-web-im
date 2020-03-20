import React from 'react';
import { connect } from 'dva';

const Sider = () => <div>Sider</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(Sider);
