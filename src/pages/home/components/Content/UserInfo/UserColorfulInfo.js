import React from 'react';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { SEX, AGE_COLOR } from '@/utils/const';

const UserColorfulInfo = ({ sex, age }) => (
  <div
    className="userColorfulInfo"
    style={{
      borderBottom: `${sex || age ? '1px solid rgba(0, 0, 0, 0.45)' : 'none'}`,
    }}
  >
    {sex && (
      <div className="card">
        <div className="icon">
          {sex === SEX.MAN && <ManOutlined className="man" />}
          {sex === SEX.WOMAN && <WomanOutlined className="woman" />}
        </div>
        <div className="sub">性别</div>
      </div>
    )}
    {age && (
      <div className="card">
        <div
          className="icon"
          style={{
            backgroundImage: `${AGE_COLOR}`,
          }}
        >
          {age}
        </div>
        <div className="sub">年龄</div>
      </div>
    )}
  </div>
);

export default UserColorfulInfo;
