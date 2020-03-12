import React, { useState } from 'react';
import { Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './selfInfo.less';

const SelfInfo = ({ info, setInfo }) => {
  const { Option } = Select;
  const [nameEditable, setNameEditable] = useState(false);
  return (
    <div className={styles.selfInfoWrapper}>
      <div className={styles.selfInfo}>
        <div className={styles.card}>
          <span className={`${styles.sex} ${info.sex === '1' ? styles.man : styles.woman}`} />
          <span className={styles.desc}>
            性别
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.age}>
            {info.age}
          </span>
          <span className={styles.desc}>
            年龄
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottomInfo}>
          <div>
            账号
                <span className={styles.showInfo}>
              {info.email}
            </span>
          </div>
          <div>
            昵称
                <span className={styles.showInfo}>
              {info.name}
            </span>
          </div>
          <div className={styles.editNickName}>
            备注{
              nameEditable
                ? <Input
                  defaultValue={info.nickName}
                  onBlur={e => {
                    setNameEditable(false);
                    setInfo({ ...info, nickName: e.target.value })
                  }}
                  autoFocus
                />
                : <>
                  <span className={styles.showInfo}>
                    {info.nickName}
                  </span>
                  <EditOutlined onClick={() => setNameEditable(true)} />
                </>
            }
          </div>
          <div>
            分组
                <span>
              <Select
                value={info.group}
                onChange={key => { setInfo({ ...info, group: key }) }}
                bordered={false}
              >
                {
                  info.groupList.map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.name}
                    </Option>
                  ))
                }
              </Select>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SelfInfo;
