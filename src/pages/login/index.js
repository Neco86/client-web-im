import React from 'react';
import { Form, Input, Row, Button, Col, Checkbox } from 'antd';
import router from 'umi/router';
import styles from './index.less';

const Login = () => {
  const { Item } = Form;
  // 立即登陆
  const onFinish = values => {
    console.log(values);
  };
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.logo} />
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Item
            name="email"
            rules={[
              {
                type: 'email',
                message: '请输入正确的邮箱账号!',
              },
              {
                required: true,
                message: '请输入邮箱账号!',
              },
            ]}
          >
            <Input placeholder="邮箱账号" />
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder="用户密码" autoComplete="password" />
          </Item>
          <Row>
            <Col span={2}>
              <Item name="remember" valuePropName="checked">
                <Checkbox defaultChecked />
              </Item>
            </Col>
            <Col span={10}>
              <span className={styles.remember}>自动登陆</span>
            </Col>
            <Col span={12}>
              <a
                className={styles.forgotPassword}
                onClick={() => {
                  router.push('/reset');
                }}
              >
                忘记密码
              </a>
            </Col>
          </Row>
          <Row gutter={8}>
            <Button className={styles.loginBtn} type="primary" htmlType="submit">
              立即登陆
            </Button>
          </Row>
          <Row gutter={8}>
            <Button
              className={styles.registerBtn}
              onClick={() => {
                router.push('/register');
              }}
            >
              前去注册
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
