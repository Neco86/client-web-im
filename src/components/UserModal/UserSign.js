import React, { useState } from 'react';
import { Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';

const UserSign = ({ sign, changeSign, self }) => {
  const [signEditable, setSignEditable] = useState(false);
  return (
    <div className="sign">
      {self ? (
        <>
          {signEditable ? (
            <>
              <Input
                defaultValue={sign}
                placeholder="请输入个性签名"
                autoFocus
                onBlur={e => {
                  setSignEditable(false);
                  changeSign(e.target.value);
                }}
              />
            </>
          ) : (
            <div style={{ color: 'rgba(0,0,0,.45)' }}>
              {sign || '请输入个性签名'}
              <FormOutlined
                onClick={() => {
                  setSignEditable(true);
                }}
              />
            </div>
          )}
        </>
      ) : (
        sign
      )}
    </div>
  );
};

export default UserSign;
