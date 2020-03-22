import React from 'react';
import { MailOutlined } from '@ant-design/icons';

const UserTools = ({ email }) => (
  <div className="tools">
    <MailOutlined onClick={() => window.open(`http://mail.${email.split('@')[1]}`)} />
  </div>
);
export default UserTools;
