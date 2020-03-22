import React from 'react';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';

const UserTools = ({ self, email, gotoChat }) => (
  <div className="tools">
    <MailOutlined onClick={() => window.open(`http://mail.${email.split('@')[1]}`)} />
    {!self && <MessageOutlined onClick={gotoChat} />}
  </div>
);
export default UserTools;
