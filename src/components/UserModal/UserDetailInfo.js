import React from 'react';
import { Input, Descriptions } from 'antd';

const UserDetailInfo = ({ email, editable, setValues, nickname }) => (
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
    </Descriptions>
  </div>
);
export default UserDetailInfo;
