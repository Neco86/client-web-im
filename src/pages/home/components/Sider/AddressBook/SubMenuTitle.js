import React, { useState } from 'react';
import { Dropdown, Menu, message, Modal, Input } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { FRIEND_TYPE, EDIT_GROUP } from '@/utils/const';

const SubMenuTitle = ({ name, number, titleKey: [friendType, groupKey], group, socket }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const onMenuClick = ({ key, domEvent: e }) => {
    switch (key) {
      // 添加分组
      case EDIT_GROUP.ADD:
        setInputValue('');
        setModal(EDIT_GROUP.ADD);
        break;
      // 删除该组
      case EDIT_GROUP.DELETE:
        if (
          group.filter(g => g.key === groupKey)[0][
            friendType === FRIEND_TYPE.FRIEND ? 'friends' : 'groups'
          ].length !== 0
        ) {
          message.error('当前分组不是空的,无法删除!');
        } else {
          setInputValue(group.filter(g => g.key === groupKey)[0].groupName);
          setModal(EDIT_GROUP.DELETE);
        }
        break;
      // 重命名该组
      case EDIT_GROUP.RENAME:
        setInputValue(group.filter(g => g.key === groupKey)[0].groupName);
        setModal(EDIT_GROUP.RENAME);
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
      <Menu.Item key={EDIT_GROUP.ADD}>添加分组</Menu.Item>
      <Menu.Item key={EDIT_GROUP.DELETE}>删除该组</Menu.Item>
      <Menu.Item key={EDIT_GROUP.RENAME}>重命名该组</Menu.Item>
    </Menu>
  );
  const onOk = () => {
    socket.emit('editGroup', {
      type: friendType,
      value: inputValue,
      key: groupKey,
      method: modal,
    });
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
          (modal === EDIT_GROUP.ADD && '添加分组') ||
          (modal === EDIT_GROUP.DELETE && '删除分组') ||
          (modal === EDIT_GROUP.RENAME && '重命名分组')
        }
        okText="确认"
        cancelText="取消"
        onOk={onOk}
      >
        {modal === EDIT_GROUP.ADD && (
          <Input
            placeholder="分组名"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {modal === EDIT_GROUP.DELETE && `确认删除分组[${inputValue}]?`}
        {modal === EDIT_GROUP.RENAME && (
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} autoFocus />
        )}
      </Modal>
    </div>
  );
};
export default SubMenuTitle;
