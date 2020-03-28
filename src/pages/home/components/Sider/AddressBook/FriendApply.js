import React, { useEffect } from 'react';
import { Modal } from 'antd';

const FriendApply = ({ visible, onCancel, socket }) => {
  useEffect(() => {
    if (socket) {
      socket.emit('getFriendApply');
    }
  }, [socket]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      mask={false}
      width={320}
      wrapClassName="friendApplyModal"
      maskClosable={false}
      title="好友通知"
      footer={null}
    >
      TODO: 展示数据
    </Modal>
  );
};

export default FriendApply;
