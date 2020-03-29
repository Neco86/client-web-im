import React, { useState } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import { ADD_TYPE } from '@/utils/const';
import './index.less';
import Apply from './Apply';
import AddFriend from './AddFriend';
import CreateGroup from './CreateGroup';

const AddModal = ({
  visible,
  onCancel,
  type,
  friendList,
  groupList,
  socket,
  friendGroups,
  groupGroups,
  userInfo,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [addInfo, setAddInfo] = useState({});
  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        mask={false}
        onCancel={onCancel}
        width={type === ADD_TYPE.ADD_FRIEND ? 320 : 460}
        wrapClassName="addModal"
        maskClosable={false}
        title={
          (type === ADD_TYPE.ADD_FRIEND && '添加好友/群聊') ||
          (type === ADD_TYPE.CREATE_GROUP && '创建群聊')
        }
      >
        {type === ADD_TYPE.ADD_FRIEND && (
          <AddFriend
            setSearchValue={setSearchValue}
            socket={socket}
            friendList={friendList}
            searchValue={searchValue}
            setAddInfo={setAddInfo}
            setAddModal={setAddModal}
            groupList={groupList}
          />
        )}
        {type === ADD_TYPE.CREATE_GROUP && (
          <CreateGroup
            friendGroups={friendGroups}
            groupGroups={groupGroups}
            userInfo={userInfo}
            mustInclude={[userInfo.email]}
            onCancel={onCancel}
          />
        )}
      </Modal>
      <Apply
        addInfo={addInfo}
        addModal={addModal}
        setAddModal={setAddModal}
        socket={socket}
        friendGroups={friendGroups}
        groupGroups={groupGroups}
      />
    </>
  );
};

export default connect(({ global, searchInfo, userGroups, userInfo }) => ({
  socket: global.socket,
  friendList: searchInfo.friendList,
  groupList: searchInfo.groupList,
  friendGroups: userGroups.friendGroups,
  groupGroups: userGroups.groupGroups,
  userInfo,
}))(AddModal);
