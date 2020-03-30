import React, { useState } from 'react';
import { Transfer, Avatar, Button, Row, Col, Select, Divider } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const CreateGroup = ({ friendGroups, userInfo, mustInclude, groupGroups, onCancel, socket }) => {
  const getDataSource = () => {
    const dataSource = [];
    dataSource.push({
      key: userInfo.email,
      name: userInfo.nickname,
      avatar: userInfo.avatar,
    });
    friendGroups.forEach(group => {
      group.friends.forEach(friend =>
        dataSource.push({
          key: friend.email,
          name: friend.remarkName || friend.nickname,
          avatar: friend.avatar,
        }),
      );
    });
    return dataSource;
  };

  const [dataSource] = useState(getDataSource());
  const [targetKeys, setTargetKeys] = useState(mustInclude);
  const [selectedKeys, setSelectKeys] = useState(mustInclude);
  const [group, setGroup] = useState(groupGroups[0].key);

  const handleChange = nextTargetKeys => {
    const arr = [...new Set([...mustInclude, ...nextTargetKeys])];
    setTargetKeys(arr);
    setSelectKeys(arr);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const arr = [...new Set([...sourceSelectedKeys, ...mustInclude, ...targetSelectedKeys])];
    setSelectKeys(arr);
  };

  const createGroup = () => {
    socket.emit('createGroup', { group, member: targetKeys });
    onCancel();
  };
  return (
    <div className={styles.createGroupWrapper}>
      <Transfer
        dataSource={dataSource}
        titles={['联系人', '群聊成员']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        showSearch
        filterOption={(inputValue, option) => option.name.indexOf(inputValue) > -1}
        render={item => (
          <>
            <Avatar src={item.avatar || DEFAULT_AVATAR} style={{ marginRight: '6px' }} />
            {item.name}
          </>
        )}
      />
      <Divider />
      <div className={styles.group}>
        <Row style={{ margin: '10px 0' }} gutter={32}>
          <Col span={12}>
            <Select
              style={{ width: '100%' }}
              value={group}
              onChange={v => {
                setGroup(v);
              }}
            >
              {groupGroups.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12} style={{ lineHeight: '32px' }}>
            <Button
              className={styles.createGroupBtn}
              type="primary"
              disabled={targetKeys.length <= 1}
              onClick={createGroup}
            >
              创建群聊
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateGroup;
