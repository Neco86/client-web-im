import React, { useState } from 'react';
import { Descriptions, Input, Select } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { GROUP_PERMIT } from '@/utils/const';
import styles from './index.less';

const GroupInfo = ({ info, groupGroups, group, socket }) => {
  const { nickname, remarkName, note, memberName, count, permit, chatKey } = info;
  const { Option } = Select;
  const changePermit = [GROUP_PERMIT.OWNER, GROUP_PERMIT.MANAGER].includes(permit);
  const [nameEditable, setNameEditable] = useState(false);
  const [noteEditable, setNoteEditable] = useState(false);
  const [remarkNameEditable, setRemarkNameEditable] = useState(false);
  const [memberNameEditable, setMemberNameEditable] = useState(false);
  const changeInfo = (changedChatKey, value, type) => {
    socket.emit('changeGroupInfo', { changedChatKey, value, type });
  };
  return (
    <div className={styles.groupInfoWrapper}>
      <Descriptions column={1}>
        <Descriptions.Item label="名称" key="nickname">
          {nameEditable ? (
            <Input
              className={styles.editInput}
              defaultValue={nickname}
              onBlur={e => {
                changeInfo(info.chatKey, e.target.value, 'nickname');
                setNameEditable(false);
              }}
              autoFocus
            />
          ) : (
            <>
              {nickname}
              {changePermit && (
                <FormOutlined className={styles.editItem} onClick={() => setNameEditable(true)} />
              )}
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="备注" key="remarkName">
          {remarkNameEditable ? (
            <Input
              className={styles.editInput}
              defaultValue={remarkName}
              onBlur={e => {
                changeInfo(chatKey, e.target.value, 'remarkName');
                setRemarkNameEditable(false);
              }}
              autoFocus
            />
          ) : (
            <>
              {remarkName}
              <FormOutlined
                className={styles.editItem}
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
            onChange={value => {
              changeInfo(chatKey, value, 'groupKey');
            }}
          >
            {groupGroups.map(groupGroup => (
              <Option value={groupGroup.key} key={groupGroup.key}>
                {groupGroup.groupName}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="公告" key="note">
          {noteEditable ? (
            <Input
              className={styles.editInput}
              defaultValue={note}
              onBlur={e => {
                changeInfo(chatKey, e.target.value, 'note');
                setNoteEditable(false);
              }}
              autoFocus
            />
          ) : (
            <>
              {note}
              {changePermit && (
                <FormOutlined className={styles.editItem} onClick={() => setNoteEditable(true)} />
              )}
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="名片" key="memberName">
          {memberNameEditable && changePermit ? (
            <Input
              className={styles.editInput}
              defaultValue={memberName}
              onBlur={e => {
                changeInfo(chatKey, e.target.value, 'memberName');
                setMemberNameEditable(false);
              }}
              autoFocus
            />
          ) : (
            <>
              {memberName}
              <FormOutlined
                className={styles.editItem}
                onClick={() => setMemberNameEditable(true)}
              />
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="成员" key="count">
          {count}人
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default GroupInfo;
