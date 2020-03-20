import React from 'react';
import { connect } from 'dva';

const Header = () => <div>Header</div>;

export default connect(({ global }) => ({
  socket: global.socket,
}))(Header);
