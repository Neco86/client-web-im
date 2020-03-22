import React from 'react';
import { Select, Input } from 'antd';
import { ManOutlined, WomanOutlined, QuestionOutlined } from '@ant-design/icons';
import { SEX, AGE_COLOR } from '@/utils/const';

const UserColorfulInfo = ({ editable, setValues, sex, age }) => {
  const { Option } = Select;
  return (
    <div
      className="userColorfulInfo"
      style={{
        borderBottom: `${sex || age || editable ? '1px solid rgba(0, 0, 0, 0.45)' : 'none'}`,
      }}
    >
      {(sex || editable) && (
        <div className="card">
          <div className="icon">
            {sex === SEX.MAN && <ManOutlined className="man" />}
            {sex === SEX.WOMAN && <WomanOutlined className="woman" />}
            {!sex && <QuestionOutlined className="question" />}
          </div>
          <div className="sub">
            {editable ? (
              <Select
                placeholder="性别"
                size="small"
                onChange={v => {
                  setValues({ sex: v });
                }}
              >
                <Option value={SEX.MAN}>男</Option>
                <Option value={SEX.WOMAN}>女</Option>
              </Select>
            ) : (
              '性别'
            )}
          </div>
        </div>
      )}
      {(age || editable) && (
        <div className="card">
          <div
            className="icon"
            style={{
              backgroundImage: `${AGE_COLOR}`,
            }}
          >
            {age || <QuestionOutlined className="question" />}
          </div>
          <div className="sub">
            {editable ? (
              <Input
                placeholder="年龄"
                type="number"
                onChange={e => {
                  setValues({ age: e.target.value });
                }}
              />
            ) : (
              '年龄'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserColorfulInfo;
