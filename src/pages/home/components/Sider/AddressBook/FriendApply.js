import React, { useEffect, useState } from 'react';
import { Modal, List, Avatar, Button, Popconfirm } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import FriendApplyModal from './FriendApplyModal';

const FriendApply = ({
  visible,
  onCancel,
  socket,
  apply: dataSource,
  groupGroups,
  friendGroups,
}) => {
  useEffect(() => {
    if (socket && visible) {
      socket.emit('getFriendApply');
    }
  }, [socket, visible]);
  const [agreeModal, setAgreeModal] = useState(false);
  const [addInfo, setAddInfo] = useState({});
  const onFinish = () => {
    setAgreeModal(false);
    socket.emit('handleApply', {
      agree: true,
      friend: addInfo.friend,
      email: addInfo.peerInfo.email,
      chatKey: !addInfo.friend && addInfo.groupInfo.chatKey,
      remarkName: addInfo.remarkName,
      group: addInfo.group,
    });
    setAddInfo({});
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      mask={false}
      width={500}
      wrapClassName="friendApplyModal"
      maskClosable={false}
      title="好友通知"
      footer={null}
    >
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={({ peerInfo, groupInfo, reason, my, apply, agree, disagree, friend }) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={(friend ? peerInfo.avatar : groupInfo.avatar) || DEFAULT_AVATAR} />
              }
              title={
                <div>
                  <div>
                    {friend
                      ? `${peerInfo.nickname} (${peerInfo.email})`
                      : `${groupInfo.nickname} (${groupInfo.chatKey})`}
                  </div>
                  <div>
                    {!my && !friend && (
                      <div>
                        <Avatar src={peerInfo.avatar || DEFAULT_AVATAR} size="small" />
                        {` ${peerInfo.nickname} (${peerInfo.email})`}
                      </div>
                    )}
                  </div>
                </div>
              }
              description={`附言: ${reason}`}
            />
            {my ? (
              <div>
                {agree && '已被同意'}
                {disagree && '已被拒绝'}
                {apply && '等待验证'}
              </div>
            ) : (
              <div>
                {agree && '已同意'}
                {disagree && '已拒绝'}
                {apply && (
                  <div className="buttonGroup">
                    {friend ? (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          setAgreeModal(true);
                          setAddInfo({
                            friend,
                            peerInfo,
                            groupInfo,
                            reason,
                            chatKey: !friend && groupInfo.chatKey,
                            remarkName: '',
                            group: friendGroups[0].key,
                          });
                        }}
                      >
                        同意
                      </Button>
                    ) : (
                      <Popconfirm
                        title="确认同意好友申请?"
                        onConfirm={() =>
                          socket.emit('handleApply', {
                            agree: true,
                            friend,
                            email: peerInfo.email,
                            chatKey: !friend && groupInfo.chatKey,
                          })
                        }
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type="primary" size="small">
                          同意
                        </Button>
                      </Popconfirm>
                    )}
                    <Popconfirm
                      title="确认拒绝好友申请?"
                      onConfirm={() =>
                        socket.emit('handleApply', {
                          agree: false,
                          friend,
                          email: peerInfo.email,
                          chatKey: !friend && groupInfo.chatKey,
                        })
                      }
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="danger" size="small" className="reject">
                        拒绝
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            )}
          </List.Item>
        )}
      />
      {agreeModal && (
        <FriendApplyModal
          agreeModal={agreeModal}
          setAgreeModal={setAgreeModal}
          addInfo={addInfo}
          setAddInfo={setAddInfo}
          friendGroups={friendGroups}
          groupGroups={groupGroups}
          onFinish={onFinish}
        />
      )}
    </Modal>
  );
};

export default FriendApply;
