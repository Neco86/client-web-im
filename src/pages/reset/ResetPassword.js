import React from 'react';
import { Form, Input, Button, message } from 'antd';
import md5 from 'md5';
import { SUCCESS_CODE } from '@/utils/const';
import { resetPassword } from '@/service/reset';
import styles from './index.less';

const ResetPassword = ({ onNextBtnClick, email }) => {
  const { Item } = Form;
  const onFinish = values => {
    (async () => {
      const req = {
        password: md5(values.password),
        email,
      };
      const result = await resetPassword(req);
      const { code, msg } = result;
      if (code === SUCCESS_CODE) {
        onNextBtnClick();
      } else {
        message.error(msg);
      }
    })();
  };
  return (
    <div className={styles.resetPasswordWrapper}>
      <Form onFinish={onFinish}>
        <Item
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            {
              pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*].{7,}$/,
              message: '密码不能为弱密码!',
            },
          ]}
        >
          <Input.Password placeholder="用户密码" autoComplete="password" />
        </Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请再输入一遍密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次输入密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="验证用户密码" autoComplete="confirm" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
