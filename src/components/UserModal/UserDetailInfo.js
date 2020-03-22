import React, { useState } from 'react';
import { Input, Descriptions, Select } from 'antd';
import { FormOutlined } from '@ant-design/icons';

const UserDetailInfo = ({
  email,
  self,
  remarkName,
  groupName,
  editable,
  setValues,
  nickname,
  changeFriendValues,
  group,
}) => {
  const [remarkEditable, setRemarkEditable] = useState(false);
  const { Option } = Select;
  // TODO: 好友资料的分组和备注
  return (
    <div className="userDetailInfo">
      <Descriptions column={1}>
        <Descriptions.Item label="Email" key="email">
          {email}
        </Descriptions.Item>
        <Descriptions.Item label="昵称" key="email">
          {editable ? (
            <Input
              onChange={e => {
                setValues({ nickname: e.target.value });
              }}
              defaultValue={nickname}
            />
          ) : (
            nickname
          )}
        </Descriptions.Item>
        {!self && (
          <>
            <Descriptions.Item label="备注" key="remarkName">
              {remarkEditable ? (
                <>
                  <Input
                    defaultValue={remarkName}
                    autoFocus
                    onBlur={e => {
                      setRemarkEditable(false);
                      changeFriendValues({ remarkName: e.target.value });
                    }}
                  />
                </>
              ) : (
                <div>
                  {remarkName}
                  <FormOutlined
                    onClick={() => {
                      setRemarkEditable(true);
                    }}
                  />
                </div>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="分组" key="groupName">
              <Select
                defaultValue={groupName}
                size="small"
                onChange={v => {
                  changeFriendValues({ groupName: v });
                }}
              >
                {group.map(name => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </div>
  );
};
export default UserDetailInfo;
