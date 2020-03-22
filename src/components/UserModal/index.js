import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'dva';
import UserAvatar from './UserAvatar';
import UserColorfulInfo from './UserColorfulInfo';
import UserDetailInfo from './UserDetailInfo';
import UserSign from './UserSign';
import UserTools from './UserTools';
import './index.less';

const UserModal = ({ visible, onCancel, socket, userInfo }) => {
  useEffect(() => {
    socket.emit('getUserInfo', ['avatar', 'nickname', 'sign', 'sex', 'age', 'email']);
  }, []);
  const changeAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[1];
      if (['jpg', 'png'].includes(type)) {
        socket.emit('setAvatar', { file, type });
      } else {
        message.error('文件类型不支持!');
      }
    }
  };
  const [editable, setEditable] = useState(false);
  // 暂存修改后数据,点击完成后提交修改
  const [values, setValues] = useState({});
  return (
    <Modal
      visible={visible}
      footer={null}
      mask={false}
      onCancel={() => {
        setEditable(false);
        onCancel();
      }}
      width={320}
      wrapClassName="userModal"
      maskClosable={false}
    >
      <span className="edit">
        <span>
          {editable ? (
            <span
              onClick={() => {
                setEditable(false);
                if (Object.keys(values).length) {
                  socket.emit('setUserInfo', values);
                }
              }}
            >
              完成
            </span>
          ) : (
            <span
              onClick={() => {
                setEditable(true);
              }}
            >
              编辑
            </span>
          )}
        </span>
      </span>
      <UserAvatar avatar={userInfo.avatar} changeAvatar={changeAvatar} />
      <div className="nickName">{userInfo.nickname}</div>
      <UserSign
        sign={userInfo.sign}
        changeSign={value => socket.emit('setUserInfo', { sign: value })}
      />
      <UserTools email={userInfo.email} />
      <UserColorfulInfo
        sex={userInfo.sex}
        age={userInfo.age}
        editable={editable}
        setValues={v => {
          setValues({ ...values, ...v });
        }}
      />
      <UserDetailInfo
        email={userInfo.email}
        nickname={userInfo.nickname}
        editable={editable}
        setValues={v => {
          setValues({ ...values, ...v });
        }}
      />
    </Modal>
  );
};

export default connect(({ global, userInfo }) => ({
  socket: global.socket,
  userInfo,
}))(UserModal);
