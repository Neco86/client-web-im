import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Row, Col, Button, Avatar, Table } from 'antd';
import { DEFAULT_AVATAR, FRIEND_TYPE } from '@/utils/const';

const RecordModal = ({ visible, video, memberInfo, type, startRecord }) => {
  const [values, setValues] = useState({});
  useEffect(() => {
    if (type && memberInfo) {
      const tempObj = {};
      memberInfo.forEach((member, index) => {
        if (type === FRIEND_TYPE.FRIEND) {
          tempObj[member.email] = { audio: true, video: true };
        }
        if (type === FRIEND_TYPE.GROUP) {
          if (index === 0) {
            tempObj[member.email] = { audio: true, video: true };
          } else {
            tempObj[member.email] = { audio: false, video: false };
          }
        }
      });
      setValues(tempObj);
    }
  }, [type, memberInfo]);
  const columns = [
    {
      title: '用户',
      key: 'email',
      render: text => (
        <>
          <Avatar src={text.avatar || DEFAULT_AVATAR} /> {text.name}
        </>
      ),
    },
    {
      title: '音频',
      key: 'audio',
      render: text => (
        <>
          <Checkbox
            checked={values[text.email].audio}
            onChange={e => {
              const newValues = JSON.parse(JSON.stringify(values));
              newValues[text.email].audio = e.target.checked;
              setValues(newValues);
            }}
          />
        </>
      ),
    },
  ];
  if (video) {
    columns.push({
      title: '视频',
      key: 'video',
      render: text => (
        <>
          <Checkbox
            checked={values[text.email].video}
            onChange={e => {
              const newValues = JSON.parse(JSON.stringify(values));
              newValues[text.email].video = e.target.checked;
              setValues(newValues);
            }}
          />
        </>
      ),
    });
  }
  return (
    <Modal visible={visible} footer={null} title="录制配置">
      <Table dataSource={memberInfo} columns={columns} rowKey={record => record.email} />
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => startRecord(values)}>
            开始录制
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default RecordModal;
