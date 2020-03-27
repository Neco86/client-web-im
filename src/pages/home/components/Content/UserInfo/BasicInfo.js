import React, { useState, useEffect } from 'react';
import { Avatar, Popover, Button, message, Modal, Select } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { FRIEND_TYPE, DEFAULT_AVATAR, GROUP_PERMIT } from '@/utils/const';
import UserAvatar from '@/components/UserModal/UserAvatar';
import styles from './index.less';

const BasicInfo = ({ info, type, socket }) => {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState([]);
  useEffect(() => {
    if (modal === '1') {
      console.log('TODO: 获取群组成员');
      // socket.emit('getGroupMember');
    }
  }, [modal]);
  const changeAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[1];
      if (['jpg', 'png'].includes(fileType)) {
        socket.emit('setGroupAvatar', { file, type: fileType, chatKey: info.chatKey });
      } else {
        message.error('文件类型不支持!');
      }
    }
  };
  const content = (friendType, email, permit, name) => (
    <div>
      {friendType === FRIEND_TYPE.GROUP && permit === GROUP_PERMIT.OWNER && (
        <Button
          className="contentButton"
          onClick={() => {
            setModal('1');
            setValue([name, email]);
          }}
        >
          转移群主
        </Button>
      )}
      <Button
        type="danger"
        className="contentButton"
        onClick={() => {
          const modalType =
            (friendType === FRIEND_TYPE.FRIEND && '2') ||
            (friendType === FRIEND_TYPE.GROUP && permit === GROUP_PERMIT.OWNER && '3') ||
            (friendType === FRIEND_TYPE.GROUP && permit !== GROUP_PERMIT.OWNER && '4');
          setModal(modalType);
          setValue([name, email]);
        }}
      >
        {friendType === FRIEND_TYPE.FRIEND && '删除好友'}
        {friendType === FRIEND_TYPE.GROUP && permit === GROUP_PERMIT.OWNER && '解散群聊'}
        {friendType === FRIEND_TYPE.GROUP && permit !== GROUP_PERMIT.OWNER && '退出群聊'}
      </Button>
    </div>
  );
  const onOk = () => {
    switch (modal) {
      case '1':
        console.log('TODO: 转移群主', '群成员', value[1]);
        break;
      case '2':
        console.log('TODO: 删除好友', value[1]);
        break;
      case '3':
        console.log('TODO: 解散群聊', value[1]);
        break;
      case '4':
        console.log('TODO: 退出群聊', value[1]);
        break;
      default:
        break;
    }
    setModal(false);
    setValue([]);
  };
  return (
    <div
      className={`${styles.basicInfo} ${type === FRIEND_TYPE.GROUP ? styles.group : styles.friend}`}
    >
      <div className={styles.avatar}>
        {type === FRIEND_TYPE.FRIEND && <Avatar src={info.avatar || DEFAULT_AVATAR} size="large" />}
        {type === FRIEND_TYPE.GROUP &&
          ([GROUP_PERMIT.OWNER, GROUP_PERMIT.MANAGER].includes(info.permit) ? (
            <UserAvatar avatar={info.avatar || DEFAULT_AVATAR} changeAvatar={changeAvatar} />
          ) : (
            <Avatar src={info.avatar || DEFAULT_AVATAR} size="large" />
          ))}
      </div>
      <div className={styles.name}>{info.remarkName || info.nickname}</div>
      <div className={styles.account}>
        {type === FRIEND_TYPE.GROUP && `群号: ${info.chatKey}`}
        {type === FRIEND_TYPE.FRIEND && info.sign}
      </div>
      <MessageOutlined
        className={styles.tools}
        onClick={() => {
          console.log('TODO: 跳转群聊/私聊', type, info.email || info.chatKey);
        }}
      />
      <Popover
        content={content(
          type,
          info.email || info.chatKey,
          info.permit,
          info.remarkName || info.nickname,
        )}
        title="设置"
        trigger="click"
        placement="leftTop"
        className={styles.edit}
        getPopupContainer={trigger => trigger.parentNode}
      >
        设置
      </Popover>
      <Modal
        visible={!!modal}
        mask={false}
        onCancel={() => {
          setModal(false);
        }}
        width={320}
        wrapClassName="basicInfoEditModal"
        maskClosable={false}
        title={
          (modal === '1' && '转移群主') ||
          (modal === '2' && '删除好友') ||
          (modal === '3' && '解散群聊') ||
          (modal === '4' && '退出群聊')
        }
        okText="确认"
        cancelText="取消"
        onOk={onOk}
      >
        {modal === '1' && '新群主:'}
        {modal === '1' && (
          <Select style={{ width: '100%' }} defaultValue="1">
            <Select.Option key="1">成员1</Select.Option>
            <Select.Option key="2">成员2</Select.Option>
          </Select>
        )}
        {modal === '2' && (
          <>
            确认删除好友 <br /> {`${value[0]} (${value[1]})`} ?
          </>
        )}
        {modal === '3' && (
          <>
            确认解散群聊 <br /> {`${value[0]} (${value[1]})`} ?
          </>
        )}
        {modal === '4' && (
          <>
            确认退出群聊 <br /> {`${value[0]} (${value[1]})`} ?
          </>
        )}
      </Modal>
    </div>
  );
};

export default BasicInfo;
