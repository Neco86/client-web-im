import React, { useState, useEffect, useRef } from 'react';
import { Modal, Avatar, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { DEFAULT_AVATAR } from '@/utils/const';
import './UserModal.less';

const UserModal = ({ visible, onCancel, self, socket, avatar }) => {
  const [avatarMask, setAvatarMask] = useState(false);
  const uploadAvatarInput = useRef({ current: { files: [] } });
  useEffect(() => {
    socket.emit('getUserInfo', ['avatar']);
  }, []);
  const changeAvatar = e => {
    const file = e.target.files[0];
    const type = file.type.split('/')[1];
    if (['jpg', 'png'].includes(type)) {
      socket.emit('setAvatar', { file, type });
    } else {
      message.error('文件类型不支持!');
    }
  };
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
          onClick={() => {
            uploadAvatarInput.current.click();
          }}
        />
      )}
      <input
        ref={uploadAvatarInput}
        type="file"
        accept="image/gif, image/jpg, image/png"
        style={{ display: 'none' }}
        onChange={changeAvatar}
      />
    </Modal>
  );
};

export default connect(({ global, userInfo }) => ({
  socket: global.socket,
  avatar: userInfo.avatar,
}))(UserModal);
