import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import md5 from 'md5';
import router from 'umi/router';
import { getCaptcha, register } from '@/service/register';
import { SUCCESS_CODE } from '@/utils/const';
import styles from './index.less';

const Register = () => {
  const { Item } = Form;
  const [form] = Form.useForm();
  // 获取验证按钮是否禁用
  const [btnDisabled, setBtnDisabled] = useState(0);
  // 获取验证码
  const handleGetCaptcha = () => {
    form.validateFields(['email']).then(values => {
      (async () => {
        const result = await getCaptcha(values);
        const { code, msg } = result;
        if (code === SUCCESS_CODE) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      })();
      setBtnDisabled(30);
    });
  };
  const [timer, setTimer] = useState(null);
  // 获取验证码倒计时
  useEffect(() => {
    if (btnDisabled) {
      setTimer(
        setTimeout(() => {
          setBtnDisabled(btnDisabled - 1);
        }, 1000),
      );
    }
  }, [btnDisabled]);
  // 完成注册
  const onFinish = values => {
    (async () => {
      const { nickname, password, email, captcha } = values;
      const req = {
        nickname,
        password: md5(password),
        email,
        captcha,
      };
      const result = await register(req);
      const { code, msg } = result;
      if (code === SUCCESS_CODE) {
        message.success(`${msg} 即将跳转到登陆页面!`);
        clearTimeout(timer);
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        message.error(msg);
      }
    })();
  };
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.logo} />
        <Form onFinish={onFinish} form={form}>
          <Item
            name="nickname"
            rules={[
              { required: true, message: '请输入用户昵称!' },
              { pattern: /^\S*$/, message: '昵称不能包含空格!' },
            ]}
          >
            <Input placeholder="用户昵称" />
          </Item>
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
          <Row gutter={8}>
            <Col span={12}>
              <Item name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
                <Input placeholder="验证码" />
              </Item>
            </Col>
            <Col span={12}>
              <Button
                className={styles.getCaptchaBtn}
                onClick={handleGetCaptcha}
                disabled={!!btnDisabled}
              >
                {btnDisabled ? `请${btnDisabled}秒后再试` : '获取验证码'}
              </Button>
            </Col>
          </Row>
          <Row gutter={8}>
            <Button type="primary" className={styles.registerBtn} htmlType="submit">
              完成注册
            </Button>
          </Row>
          <Row gutter={8}>
            <Button
              className={styles.loginBtn}
              onClick={() => {
                clearTimeout(timer);
                router.push('/login');
              }}
            >
              前去登陆
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
