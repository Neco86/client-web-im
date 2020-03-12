import React, { useState } from 'react';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './groupInfo.less';

const GroupInfo = ({ info, setInfo }) => {
  const [nameEditable, setNameEditable] = useState(false);
  const [groupNameEditable, setGroupNameEditable] = useState(false);
  const [signEditable, setSignEditable] = useState(false);
  const [groupEditable, setGroupEditable] = useState(false);
  return (
    <div className={styles.groupInfoWrapper}>
      <div className={styles.groupInfo}>
        <div className={styles.editNickName}>
          名称
              {
            groupEditable
              ? <Input
                defaultValue={info.name}
                onBlur={e => {
                  setGroupEditable(false);
                  setInfo({ ...info, name: e.target.value || info.name })
                }}
                autoFocus
              />
              : <>
                <span className={styles.showInfo}>
                  {info.name}
                </span>
                {
                  ['3'].includes(info.permit) &&
                  <EditOutlined onClick={() => setGroupEditable(true)} />
                }
              </>
          }
        </div>
        <div className={styles.editNickName}>
          备注
              {
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
        <div className={styles.editNickName}>
          公告
              {
            signEditable
              ? <Input
                defaultValue={info.sign}
                onBlur={e => {
                  setSignEditable(false);
                  setInfo({ ...info, sign: e.target.value })
                }}
                autoFocus
              />
              : <>
                <span className={styles.showInfo}>
                  {info.sign}
                </span>
                {
                  ['2', '3'].includes(info.permit) &&
                  <EditOutlined onClick={() => setSignEditable(true)} />
                }
              </>
          }
        </div>
        <div className={styles.editNickName}>
          名片
              {
            groupNameEditable
              ? <Input
                defaultValue={info.groupName}
                onBlur={e => {
                  setGroupNameEditable(false);
                  setInfo({ ...info, groupName: e.target.value })
                }}
                autoFocus
              />
              : <>
                <span className={styles.showInfo}>
                  {info.groupName}
                </span>
                <EditOutlined onClick={() => setGroupNameEditable(true)} />
              </>
          }
        </div>
        <div>成员({info.groupCount}人)</div>
      </div>
    </div>
  )
}

export default GroupInfo