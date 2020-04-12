import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Row, Col, Button, Avatar, Table, Select, Input } from 'antd';
import { DEFAULT_AVATAR, FRIEND_TYPE } from '@/utils/const';

const RecordModal = ({
  visible,
  memberInfo,
  type,
  startRecord,
  onCancel,
  staredRecord,
  stopRecord,
}) => {
  const [values, setValues] = useState({});
  const [filename, setFileName] = useState(
    `录制文件${
      Math.random()
        .toString()
        .split('.')[1]
    }`,
  );
  const savedTypes = ['.mp4', '.webm', '.mepg', '.wav', '.ogg'];
  const [savedType, setSavedType] = useState(savedTypes[0]);
  useEffect(() => {
    if (type && memberInfo) {
      const tempObj = {};
      memberInfo.forEach((member, index) => {
        if (type === FRIEND_TYPE.FRIEND) {
          tempObj[member.email] = true;
        }
        if (type === FRIEND_TYPE.GROUP) {
          if (index === 0) {
            tempObj[member.email] = true;
          } else {
            tempObj[member.email] = false;
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
      title: '录制',
      key: 'checked',
      render: text => (
        <>
          <Checkbox
            checked={values[text.email]}
            onChange={e => {
              const newValues = JSON.parse(JSON.stringify(values));
              newValues[text.email] = e.target.checked;
              setValues(newValues);
            }}
          />
        </>
      ),
    },
  ];
  return (
    <Modal
      visible={visible}
      footer={null}
      title={staredRecord ? '保存设置' : '录制设置'}
      onCancel={onCancel}
    >
      {staredRecord ? (
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Input
              value={filename}
              onChange={e => {
                setFileName(e.target.value);
              }}
              addonAfter={
                <Select
                  value={savedType}
                  onChange={v => {
                    setSavedType(v);
                  }}
                >
                  {savedTypes.map(t => (
                    <Select.Option key={t}>{t}</Select.Option>
                  ))}
                </Select>
              }
            />
          </Col>
        </Row>
      ) : (
        <Table dataSource={memberInfo} columns={columns} rowKey={record => record.email} />
      )}
      <Row>
        <Col span={24} style={{ textAlign: 'center', marginTop: '16px' }}>
          {staredRecord ? (
            <Button type="danger" onClick={() => stopRecord(filename, savedType)}>
              结束录制
            </Button>
          ) : (
            <Button type="primary" onClick={() => startRecord(values)}>
              开始录制
            </Button>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default RecordModal;
