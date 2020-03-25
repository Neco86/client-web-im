import React from 'react';
import { connect } from 'dva';
import ChatInfo from './ChatInfo';
import UserInfo from './UserInfo';

const Content = ({ menuKey }) => <>{menuKey === '1' ? <ChatInfo /> : <UserInfo />}</>;

export default connect(({ global }) => ({
  menuKey: global.menuKey,
}))(Content);
