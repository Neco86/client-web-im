import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

const Register = () => {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerBox}>
        <img src="/favicon.png" alt="logo" className={styles.logo} />
        <Form>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '昵称不能为空!' }]}
          >
            <Input
              placeholder='昵称'
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空!' }]}
          >
            <Input.Password
              placeholder='密码'
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: '邮箱账号不能为空!' }]}
          >
            <Input
              placeholder='邮箱账号'
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="emailCode"
            rules={[{ required: true, message: '邮箱账号不能为空!' }]}
          >
            <Input
              placeholder='邮箱验证码'
              allowClear
            />
          </Form.Item>
          <Button type='primary'>发送邮箱验证码</Button>
          <div className={styles.clear} />
          <Button type='primary' className='registerBtn'>立即注册</Button>
        </Form>
      </div>
    </div>
  )
}

export default Register;
