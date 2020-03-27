import React from 'react';
import { connect } from 'dva';
import { MENU_KEY } from '@/utils/const';
import ChatInfo from './ChatInfo';
import UserInfo from './UserInfo';

const Content = ({ menuKey }) => (
  <>{menuKey === MENU_KEY.CHAT_INFO ? <ChatInfo /> : <UserInfo />}</>
);

export default connect(({ global }) => ({
  menuKey: global.menuKey,
}))(Content);
