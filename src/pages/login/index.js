import React from 'react';
import { Form, Input, Row, Button, Col, Checkbox, message } from 'antd';
import router from 'umi/router';
import md5 from 'md5';
import { login } from '@/service/login';
import { SUCCESS_CODE, TOKEN_NAME } from '@/utils/const';
import styles from './index.less';

const Login = () => {
  const { Item } = Form;
  // 立即登陆
  const onFinish = values => {
    (async () => {
      const { password, email, remember } = values;
      const req = {
        email,
        password: md5(password),
      };
      const result = await login(req);
      const { code, msg, token } = result;
      if (code === SUCCESS_CODE) {
        // message.success(msg);
        // 处理自动登录
        if (remember) {
          // token 存localStorage
          localStorage.setItem(TOKEN_NAME, token);
        } else {
          // token 存sessionStorage
          sessionStorage.setItem(TOKEN_NAME, token);
        }
        router.push('/');
      } else {
        message.error(msg);
      }
    })();
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
