import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Avatar, Badge, Menu, Dropdown } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import UserModal from '@/components/UserModal';
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
const User = ({ socket, avatar, status }) => {
  useEffect(() => {
    socket.emit('getUserInfo', ['status', 'avatar']);
  }, []);
  const changeStatus = ({ key }) => {
    if (status !== key) {
      // 在线 => 隐身
      if (status === USER_STATUS.ONLINE && key === USER_STATUS.HIDE) {
        socket.emit('offline');
      }
      // 离线 => 隐身/在线
      if (status === USER_STATUS.OFFLINE) {
        socket.connect();
        socket.emit('init');
        if (key === USER_STATUS.ONLINE) {
          socket.emit('online');
        }
      }
      // 隐身 => 在线
      if (status === USER_STATUS.HIDE && key === USER_STATUS.ONLINE) {
        socket.emit('online');
      }

      socket.emit('setUserInfo', { status: key });
    }
  };
  const [userModal, setUserModal] = useState(false);
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
        <Badge dot style={{ backgroundColor: `${USER_STATUS_COLOR[status]}` }} />
      </Dropdown>
      <Avatar
        size="small"
        src={avatar || DEFAULT_AVATAR}
        onClick={() => {
          setUserModal(true);
        }}
      />
      <UserModal
        visible={userModal}
        onCancel={() => {
          setUserModal(false);
        }}
      />
    </>
  );
};

export default connect(({ global, userInfo }) => ({
  socket: global.socket,
  avatar: userInfo.avatar,
  status: userInfo.status,
}))(User);
