import React from 'react';
import { Input, List, Empty, Avatar } from 'antd';
import { DEFAULT_AVATAR, SEARCH_TYPE, FRIEND_TYPE } from '@/utils/const';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddFriend = ({
  setSearchValue,
  socket,
  friendList,
  searchValue,
  setAddInfo,
  setAddModal,
  groupList,
}) => (
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
                  <div
                    className="addBtn"
                    onClick={() => {
                      setAddInfo({
                        friendType: FRIEND_TYPE.FRIEND,
                        avatar: item.avatar,
                        account: item.account,
                        nickname: item.nickname,
                      });
                      setAddModal(true);
                    }}
                  >
                    {item.type === SEARCH_TYPE.STRANGER && <PlusCircleOutlined />}
                    {item.type === SEARCH_TYPE.FRIEND && '已添加'}
                    {item.type === SEARCH_TYPE.SELF && '自己'}
                    {item.type === SEARCH_TYPE.APPLYING && '已申请'}
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
                  <div
                    className="addBtn"
                    onClick={() => {
                      setAddInfo({
                        friendType: FRIEND_TYPE.GROUP,
                        avatar: item.avatar,
                        account: item.account,
                        nickname: item.nickname,
                      });
                      setAddModal(true);
                    }}
                  >
                    {item.type === SEARCH_TYPE.STRANGER && <PlusCircleOutlined />}
                    {item.type === SEARCH_TYPE.FRIEND && '已添加'}
                    {item.type === SEARCH_TYPE.APPLYING && '已申请'}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      )}
      {friendList.length === 0 && groupList.length === 0 && searchValue && <Empty description="" />}
    </div>
  </>
);

export default AddFriend;
