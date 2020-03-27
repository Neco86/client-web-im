import React from 'react';
import { connect } from 'dva';
import { MENU_KEY } from '@/utils/const';
import ChatList from './ChatList';
import AddressBook from './AddressBook';

const Sider = ({ menuKey }) => (
  <>{menuKey === MENU_KEY.CHAT_INFO ? <ChatList /> : <AddressBook />}</>
);

export default connect(({ global }) => ({
  menuKey: global.menuKey,
}))(Sider);
