import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Avatar, Badge, Menu, Dropdown } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { USER_STATUS, USER_STATUS_COLOR, DEFAULT_AVATAR } from '@/utils/const';

const MenuItem = ({ current, status, name }) => (
  <>
    <div
      style={{
        width: '26px',
        height: '22px',
        display: 'inline-block',
      }}
    >
      {current === status && <CheckOutlined />}
    </div>
    <Badge
      dot
      offset={[-10, 8]}
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: `${USER_STATUS_COLOR[status]}`,
      }}
    />
    {name}
  </>
);
const User = ({ socket }) => {
  const [status, setStatus] = useState(USER_STATUS.OFFLINE);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  useEffect(() => {
    socket.emit('getUserInfo', ['status', 'avatar']);
    socket.on('getUserInfo', ({ status: s, avatar: a }) => {
      setStatus(s);
      if (a) {
        setAvatar(a);
      }
    });
  }, []);
  const changeStatus = ({ key }) => {
    if (socket.disconnected) {
      socket.connect();
      socket.emit('init');
    }
    socket.emit('setUserInfo', { status: key });
    socket.on('setUserInfo', ({ status: s }) => {
      setStatus(s);
      if (s === USER_STATUS.OFFLINE) {
        socket.successReason = '离线成功!';
        socket.disconnect();
      }
    });
  };
  const statusMenu = (
    <Menu onClick={changeStatus}>
      <Menu.Item key={USER_STATUS.ONLINE}>
        <MenuItem current={status} status={USER_STATUS.ONLINE} name="在线" />
      </Menu.Item>
      <Menu.Item key={USER_STATUS.HIDE}>
        <MenuItem current={status} status={USER_STATUS.HIDE} name="隐身" />
      </Menu.Item>
      <Menu.Item key={USER_STATUS.OFFLINE}>
        <MenuItem current={status} status={USER_STATUS.OFFLINE} name="离线" />
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={statusMenu} placement="bottomLeft" trigger="click">
        <Badge dot offset={[12, 44]} style={{ backgroundColor: `${USER_STATUS_COLOR[status]}` }} />
      </Dropdown>
      <Avatar size="small" src={avatar} />
    </>
  );
};

export default connect(({ global }) => ({
  socket: global.socket,
}))(User);
