import React from 'react';
import { connect } from 'dva';

const Content = () => <div>Content</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(Content);
