import React, { useState, useEffect } from 'react';
import { Modal, Avatar } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { DEFAULT_AVATAR } from '@/utils/const';
import './UserModal.less';

const UserModal = ({ visible, onCancel, self, socket, avatar }) => {
  const [avatarMask, setAvatarMask] = useState(false);
  useEffect(() => {
    socket.emit('getUserInfo', ['avatar']);
  }, []);
  return (
    <Modal
      visible={visible}
      // visible
      footer={null}
      mask={false}
      onCancel={onCancel}
      width={320}
      wrapClassName="userModal"
    >
      <span className="edit">{self ? '编辑' : '设置'}</span>
      <Avatar
        onMouseEnter={() => {
          setAvatarMask(true);
        }}
        src={avatar || DEFAULT_AVATAR}
      />
      {avatarMask && self && (
        <Avatar
          icon={<CameraOutlined />}
          style={{ cursor: 'pointer' }}
          onMouseLeave={() => {
            setAvatarMask(false);
          }}
        />
      )}
    </Modal>
  );
};

export default connect(({ global, userInfo }) => ({
  socket: global.socket,
  avatar: userInfo.avatar,
}))(UserModal);
