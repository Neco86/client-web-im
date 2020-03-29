import React from 'react';
import { Modal, Avatar, Row, Col, Select, Input, Button } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';

const FriendApplyModal = ({
  agreeModal,
  setAgreeModal,
  addInfo,
  setAddInfo,
  friendGroups,
  onFinish,
}) => (
  <Modal
    visible={agreeModal}
    onCancel={() => setAgreeModal(false)}
    mask={false}
    width={320}
    maskClosable={false}
    title={
      agreeModal &&
      `添加${
        addInfo.friend ? '好友' : `${addInfo.groupInfo.nickname} (${addInfo.groupInfo.chatKey})`
      }`
    }
    footer={null}
  >
    <div>
      <Avatar src={addInfo.peerInfo.avatar || DEFAULT_AVATAR} />
      {` ${addInfo.peerInfo.nickname} (${addInfo.peerInfo.email})`}
    </div>
    {addInfo.reason && (
      <Row style={{ margin: '10px 0' }}>
        <Col span={4} style={{ lineHeight: '32px' }}>
          附言:
        </Col>
        <Col span={20} style={{ lineHeight: '32px' }}>
          {addInfo.reason}
        </Col>
      </Row>
    )}
    <Row style={{ margin: '10px 0' }}>
      <Col span={4} style={{ lineHeight: '32px' }}>
        分组:
      </Col>
      <Col span={20}>
        <Select
          style={{ width: '100%' }}
          value={addInfo.group}
          onChange={v =>
            setAddInfo({
              ...addInfo,
              group: v,
            })
          }
        >
          {friendGroups.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.groupName}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
    <Row style={{ margin: '10px 0' }}>
      <Col span={4} style={{ lineHeight: '32px' }}>
        备注:
      </Col>
      <Col span={20}>
        <Input
          value={addInfo.remarkName}
          onChange={e => setAddInfo({ ...addInfo, remarkName: e.target.value })}
        />
      </Col>
    </Row>
    <Row style={{ margin: '10px 0' }}>
      <Col span={24} style={{ lineHeight: '32px' }}>
        <Button type="primary" style={{ width: '100%' }} onClick={() => onFinish()}>
          完成
        </Button>
      </Col>
    </Row>
  </Modal>
);

export default FriendApplyModal;
