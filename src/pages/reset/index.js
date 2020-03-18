import React, { useState } from 'react';
import { Steps } from 'antd';
import router from 'umi/router';
import ConfirmEmail from './ConfirmEmail';
import ResetPassword from './ResetPassword';
import Success from './Success';
import styles from './index.less';

const Reset = () => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState('');
  const steps = [
    {
      title: '验证邮箱',
      content: <ConfirmEmail onNextBtnClick={() => setCurrent(current + 1)} setEmail={setEmail} />,
    },
    {
      title: '重置密码',
      content: <ResetPassword onNextBtnClick={() => setCurrent(current + 1)} email={email} />,
    },
    {
      title: '完成重置',
      content: <Success onNextBtnClick={() => router.push('/login')} email={email} />,
    },
  ];
  return (
    <div className={styles.resetWrapper}>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.content}>
        {current < steps.length - 1 && <div className={styles.logo} />}
        {steps[current].content}
      </div>
    </div>
  );
};

export default Reset;
