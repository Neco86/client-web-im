import React from 'react';
import { connect } from 'dva';
import ChatList from './ChatList';
import AddressBook from './AddressBook';

const Sider = ({ menuKey }) => <>{menuKey === '1' ? <ChatList /> : <AddressBook />}</>;

export default connect(({ global }) => ({
  menuKey: global.menuKey,
}))(Sider);
