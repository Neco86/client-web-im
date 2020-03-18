import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import { SUCCESS_CODE } from '@/utils/const';
import { getResetCaptcha, confirmEmail } from '@/service/reset';
import styles from './index.less';

const ConfirmEmail = ({ onNextBtnClick, setEmail }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  // 获取验证按钮是否禁用
  const [btnDisabled, setBtnDisabled] = useState(0);
  // 获取验证码
  const handleGetCaptcha = () => {
    form.validateFields(['email']).then(values => {
      (async () => {
        const result = await getResetCaptcha(values);
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
  const onFinish = values => {
    (async () => {
      const result = await confirmEmail(values);
      const { code, msg } = result;
      if (code === SUCCESS_CODE) {
        // message.success(msg);
        clearTimeout(timer);
        setEmail(values.emails);
        onNextBtnClick();
      } else {
        message.error(msg);
      }
    })();
  };
  return (
    <div className={styles.confirmWrapper}>
      <Form form={form} onFinish={onFinish}>
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
        <Button type="primary" className={styles.nextBtn} htmlType="submit">
          下一步
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmEmail;
