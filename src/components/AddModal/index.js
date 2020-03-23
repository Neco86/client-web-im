import React, { useState } from 'react';
import { Modal, Input, List, Empty, Avatar } from 'antd';
import { connect } from 'dva';
import { ADD_TYPE, DEFAULT_AVATAR, SEARCH_TYPE } from '@/utils/const';
import { PlusCircleOutlined } from '@ant-design/icons';
import './index.less';

const AddModal = ({ visible, onCancel, type, friendList, groupList, socket }) => {
  // TODO: test数据
  // visible = true;
  // type = ADD_TYPE.ADD_FRIEND;

  const [searchValue, setSearchValue] = useState('');
  return (
    <Modal
      visible={visible}
      footer={null}
      mask={false}
      onCancel={onCancel}
      width={320}
      wrapClassName="addModal"
      maskClosable={false}
      title={
        (type === ADD_TYPE.ADD_FRIEND && '添加好友/群聊') ||
        (type === ADD_TYPE.CREATE_GROUP && '创建群聊')
      }
    >
      {type === ADD_TYPE.ADD_FRIEND && (
        <>
          <Input.Search
            placeholder="Email/群账号/昵称"
            onSearch={v => {
              setSearchValue(v);
              socket.emit('searchInfo', v);
            }}
          />
          <div className="searchResult">
            {friendList.length > 0 && searchValue && (
              <>
                <div className="title">联系人</div>
                <List
                  // split={false}
                  dataSource={friendList}
                  renderItem={item => (
                    <List.Item>
                      <div className="listItem">
                        <Avatar src={item.avatar || DEFAULT_AVATAR} size="large" />
                        <div className="userInfo">{`${item.nickname}(${item.account})`}</div>
                        <div className="addBtn">
                          {item.type === SEARCH_TYPE.STRANGER && <PlusCircleOutlined />}
                          {item.type === SEARCH_TYPE.FRIEND && '已添加'}
                          {item.type === SEARCH_TYPE.SELF && '自己'}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            {groupList.length > 0 && searchValue && (
              <>
                <div className="title" style={{ borderTop: '1px solid #aaa' }}>
                  群组
                </div>
                <List
                  // split={false}
                  dataSource={groupList}
                  renderItem={item => (
                    <List.Item>
                      <div className="listItem">
                        <Avatar src={item.avatar || DEFAULT_AVATAR} size="large" />
                        <div className="userInfo">{`${item.nickname}(${item.account})`}</div>
                        <div className="addBtn">
                          {item.type === SEARCH_TYPE.STRANGER && <PlusCircleOutlined />}
                          {item.type === SEARCH_TYPE.FRIEND && '已添加'}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            {friendList.length === 0 && groupList.length === 0 && searchValue && (
              <Empty description="" />
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default connect(({ global, searchInfo }) => ({
  socket: global.socket,
  friendList: searchInfo.friendList,
  groupList: searchInfo.groupList,
}))(AddModal);
