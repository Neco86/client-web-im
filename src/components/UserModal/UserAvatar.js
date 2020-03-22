import React, { useState, useRef } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR } from '@/utils/const';

const UserAvatar = ({ avatar, changeAvatar, self }) => {
  const [avatarMask, setAvatarMask] = useState(false);
  const uploadAvatarInput = useRef({ current: { files: [] } });
  return (
    <>
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
        accept="image/jpg, image/png"
        style={{ display: 'none' }}
        onChange={changeAvatar}
      />
    </>
  );
};

export default UserAvatar;
