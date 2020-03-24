import React, { useState, useEffect } from 'react';
import { Modal, Avatar, Input, Select, Row, Col } from 'antd';
import { FRIEND_TYPE, DEFAULT_AVATAR } from '@/utils/const';

const Apply = ({
  addInfo: { nickname, avatar, account, friendType },
  addModal,
  setAddModal,
  socket,
  groupGroups,
  friendGroups,
}) => {
  const { Option } = Select;
  const [applyInfo, setApplyInfo] = useState({});
  useEffect(() => {
    setApplyInfo({
      account,
      friendType,
      reason: '',
      group:
        (friendType === FRIEND_TYPE.FRIEND && friendGroups[0] && friendGroups[0].key) ||
        (friendType === FRIEND_TYPE.GROUP && groupGroups[0] && groupGroups[0].key),
      remarkName: '',
    });
  }, [account]);
  const onOk = () => {
    socket.emit('addFriend', applyInfo);
    setAddModal(false);
  };

  return (
    <Modal
      visible={addModal}
      onCancel={() => {
        setAddModal(false);
      }}
      okText="发送"
      cancelText="取消"
      mask={false}
      closable={false}
      width={320}
      maskClosable={false}
      title={
        (friendType === FRIEND_TYPE.FRIEND && '添加好友') ||
        (friendType === FRIEND_TYPE.GROUP && '添加群聊')
      }
      wrapClassName="applyModal"
      onOk={onOk}
    >
      <Avatar src={avatar || DEFAULT_AVATAR} />
      {nickname}({account})
      <div className="reason">
        <span className="title">验证消息</span>
        <Input.TextArea
          value={applyInfo.reason}
          onChange={e => setApplyInfo({ ...applyInfo, reason: e.target.value })}
        />
      </div>
      <Row style={{ margin: '10px 0' }}>
        <Col span={4} style={{ lineHeight: '32px' }}>
          分组:
        </Col>
        <Col span={20}>
          <Select
            style={{ width: '100%' }}
            value={applyInfo.group}
            onChange={v => {
              setApplyInfo({ ...applyInfo, group: v });
            }}
          >
            {(friendType === FRIEND_TYPE.FRIEND &&
              friendGroups.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.groupName}
                </Option>
              ))) ||
              (friendType === FRIEND_TYPE.GROUP &&
                groupGroups.map(item => (
                  <Option key={item.key} value={item.key}>
                    {item.groupName}
                  </Option>
                )))}
          </Select>
        </Col>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Col span={4} style={{ lineHeight: '32px' }}>
          备注:
        </Col>
        <Col span={20}>
          <Input
            value={applyInfo.remarkName}
            onChange={e => setApplyInfo({ ...applyInfo, remarkName: e.target.value })}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default Apply;
