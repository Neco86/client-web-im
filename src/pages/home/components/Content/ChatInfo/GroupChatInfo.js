import React, { useRef } from 'react';
import { DEFAULT_AVATAR, GROUP_PERMIT } from '@/utils/const';
import { BellOutlined, StarFilled, StopOutlined } from '@ant-design/icons';
import { Empty, Avatar, Dropdown } from 'antd';
import GroupMemberMenu from './GroupMemberHandler';
import styles from './index.less';

const GroupChatInfo = ({ groupBasicInfo, memberInfo }) => {
  const dropDownRef = useRef(null);
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.note}>
        <div className={styles.title}>群公告</div>
        <div className={styles.noteContent}>
          {groupBasicInfo.note || (
            <Empty description="暂无群公告" image={<BellOutlined />} className={styles.empty} />
          )}
        </div>
      </div>
      <div className={styles.member}>
        <div className={styles.title}>成员 {groupBasicInfo.count}</div>
        <div className={styles.members}>
          {memberInfo.map(member => (
            <Dropdown
              overlay={
                <GroupMemberMenu
                  peer={member}
                  myPermit={groupBasicInfo.permit}
                  chatKey={groupBasicInfo.chatKey}
                  dropDownRef={dropDownRef}
                />
              }
              trigger={['click']}
              getPopupContainer={trigger => trigger.parentNode}
              key={member.email}
            >
              <div className={styles.memberWrapper} ref={dropDownRef}>
                <Avatar
                  src={member.avatar || DEFAULT_AVATAR}
                  size="small"
                  className={styles.avatar}
                />
                <div className={styles.name}>{member.name}</div>
                <div className={styles.permit}>
                  {member.permit === GROUP_PERMIT.OWNER && (
                    <StarFilled style={{ color: '#F8AA1E' }} />
                  )}
                  {member.permit === GROUP_PERMIT.MANAGER && (
                    <StarFilled style={{ color: '#66D046' }} />
                  )}
                  {member.permit === GROUP_PERMIT.BANNED && <StopOutlined />}
                </div>
              </div>
            </Dropdown>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupChatInfo;
