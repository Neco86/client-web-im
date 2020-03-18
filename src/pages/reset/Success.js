import React, { Fragment } from 'react';
import { Result, Button } from 'antd';
import styles from './index.less';

const Success = ({ onNextBtnClick, email }) => (
  <div className={styles.successWrapper}>
    <Result
      status="success"
      title="重置密码成功!"
      subTitle={
        <Fragment>
          您的账号<span className={styles.email}>{email}</span>
          密码重置成功,请使用新的密码尝试进行登录!
        </Fragment>
      }
      extra={[
        <Button type="primary" key="gotoLogin" onClick={onNextBtnClick}>
          前去登录
        </Button>,
      ]}
    />
  </div>
);

export default Success;
