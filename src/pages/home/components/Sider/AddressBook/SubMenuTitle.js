import React, { useState } from 'react';
import { Dropdown, Menu, message, Modal, Input } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { FRIEND_TYPE } from '@/utils/const';

const SubMenuTitle = ({ name, number, titleKey: [friendType, groupKey], group, socket }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const onMenuClick = ({ key, domEvent: e }) => {
    switch (key) {
      // 添加分组
      case '1':
        setInputValue('');
        setModal('1');
        break;
      // 删除该组
      case '2':
        if (
          group.filter(g => g.key === groupKey)[0][
            friendType === FRIEND_TYPE.FRIEND ? 'friends' : 'groups'
          ].length !== 0
        ) {
          message.error('当前分组不是空的,无法删除!');
        } else {
          setInputValue(group.filter(g => g.key === groupKey)[0].groupName);
          setModal('2');
        }
        break;
      // 重命名该组
      case '3':
        setInputValue(group.filter(g => g.key === groupKey)[0].groupName);
        setModal('3');
        break;
      default:
        break;
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="1">添加分组</Menu.Item>
      <Menu.Item key="2">删除该组</Menu.Item>
      <Menu.Item key="3">重命名该组</Menu.Item>
    </Menu>
  );
  const onOk = () => {
    switch (modal) {
      case '1':
        socket.emit('editGroup', {
          type: friendType,
          value: inputValue,
          key: groupKey,
          method: 'add',
        });
        break;
      case '2':
        socket.emit('editGroup', {
          type: friendType,
          value: inputValue,
          key: groupKey,
          method: 'delete',
        });
        break;
      case '3':
        socket.emit('editGroup', {
          type: friendType,
          value: inputValue,
          key: groupKey,
          method: 'rename',
        });
        break;
      default:
        break;
    }
    setModal(false);
    setInputValue('');
  };
  return (
    <div
      className="subMenuTitle"
      onMouseEnter={() => {
        setEditVisible(true);
      }}
      onMouseLeave={() => {
        setEditVisible(false);
      }}
    >
      <span className="name">{name}</span>
      <div className="edit">
        {editVisible ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <EllipsisOutlined
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            />
          </Dropdown>
        ) : (
          <div className="number">{number}</div>
        )}
      </div>
      <Modal
        visible={!!modal}
        mask={false}
        onCancel={() => {
          setModal(false);
        }}
        width={320}
        wrapClassName="subMenuTitleModal"
        maskClosable={false}
        title={
          (modal === '1' && '添加分组') ||
          (modal === '2' && '删除分组') ||
          (modal === '3' && '重命名分组')
        }
        okText="确认"
        cancelText="取消"
        onOk={onOk}
      >
        {modal === '1' && (
          <Input
            placeholder="分组名"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {modal === '2' && `确认删除分组[${inputValue}]?`}
        {modal === '3' && (
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} autoFocus />
        )}
      </Modal>
    </div>
  );
};
export default SubMenuTitle;
