import React, { useState } from 'react';
import { Descriptions, Input, Select } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import UserColorfulInfo from './UserColorfulInfo';
import styles from './index.less';

const FriendInfo = ({ info, friendGroups, group, socket }) => {
  const changeInfo = (email, value, type) => {
    socket.emit('changeFriendInfo', { email, value, type });
  };
  const { Option } = Select;
  const [remarkNameEditable, setRemarkNameEditable] = useState(false);
  return (
    <div className={styles.friendInfoWrapper}>
      <UserColorfulInfo sex={info.sex} age={info.age} />
      <Descriptions column={1}>
        <Descriptions.Item label="Email" key="email">
          {info.email}
        </Descriptions.Item>
        <Descriptions.Item label="昵称" key="nickname">
          {info.nickname}
        </Descriptions.Item>
        <Descriptions.Item label="备注" key="remarkName">
          {remarkNameEditable ? (
            <Input
              className={styles.remarkNameInput}
              defaultValue={info.remarkName}
              onBlur={e => {
                changeInfo(info.email, e.target.value, 'remarkName');
                setRemarkNameEditable(false);
              }}
              autoFocus
            />
          ) : (
            <>
              {info.remarkName}
              <FormOutlined
                className={styles.editRemarkName}
                onClick={() => setRemarkNameEditable(true)}
              />
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="分组" key="group">
          <Select
            value={group}
            size="small"
            bordered={false}
            className={styles.groupSelect}
            onChange={value => {
              changeInfo(info.email, value, 'groupKey');
            }}
          >
            {friendGroups.map(friendGroup => (
              <Option value={friendGroup.key} key={friendGroup.key}>
                {friendGroup.groupName}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default FriendInfo;
