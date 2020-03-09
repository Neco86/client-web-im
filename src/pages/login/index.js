import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <img src="/favicon.png" alt="logo" className={styles.logo} />
        <Form>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名不能为空!' }]}
          >
            <Input
              placeholder='请输入用户名'
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空!' }]}
          >
            <Input.Password
              placeholder='请输入密码'
              allowClear
            />
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
          >
            登录
          </Button>
          <Button
            className={styles.register}
          >
            注册
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login;