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
  const self = true;
  const info = userInfo;
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
  const gotoChat = () => {
    console.log('TODO: 点击聊天按钮后跳转到聊天界面');
  };
  const [editable, setEditable] = useState(false);
  // 暂存修改后数据,点击完成后提交修改
  const [values, setValues] = useState({});
  return (
    <Modal
      visible={visible}
      // visible
      footer={null}
      mask={false}
      onCancel={onCancel}
      width={320}
      wrapClassName="userModal"
      maskClosable={false}
    >
      <span className="edit">
        {self && (
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
        )}
      </span>
      <UserAvatar avatar={info.avatar} self={self} changeAvatar={changeAvatar} />
      <div className="nickName">{info.nickname}</div>
      <UserSign
        sign={info.sign}
        self={self}
        changeSign={value => socket.emit('setUserInfo', { sign: value })}
      />
      <UserTools email={userInfo.email} gotoChat={gotoChat} self={self} />
      <UserColorfulInfo
        sex={info.sex}
        age={info.age}
        editable={editable}
        setValues={v => {
          setValues({ ...values, ...v });
        }}
      />
      <UserDetailInfo
        email={info.email}
        nickname={info.nickname}
        self={self}
        remarkName={info.remarkName}
        groupName={info.groupName}
        group={['分组1', '分组2']}
        editable={editable}
        setValues={v => {
          setValues({ ...values, ...v });
        }}
        changeFriendValues={v => {
          console.log('修改好友信息', v);
        }}
      />
    </Modal>
  );
};

export default connect(({ global, userInfo }) => ({
  socket: global.socket,
  userInfo,
}))(UserModal);
