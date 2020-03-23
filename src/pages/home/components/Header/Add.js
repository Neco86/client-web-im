import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import AddModal from '@/components/AddModal';
import { ADD_TYPE } from '@/utils/const';
import styles from './index.less';

const Add = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [type, setType] = useState(ADD_TYPE.ADD_FRIEND);
  const addMenu = (
    <Menu
      onClick={({ key }) => {
        setType(key);
        setAddModalVisible(true);
      }}
    >
      <Menu.Item key={ADD_TYPE.ADD_FRIEND}>添加好友/群聊</Menu.Item>
      <Menu.Item key={ADD_TYPE.CREATE_GROUP}>创建群聊</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={addMenu} placement="bottomLeft" trigger="click">
        <PlusOutlined className={styles.btn} />
      </Dropdown>
      <AddModal
        visible={addModalVisible}
        onCancel={() => {
          setAddModalVisible(false);
        }}
        type={type}
      />
    </>
  );
};

export default Add;
