import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import { defaultAvatar } from '@/utils/utils';
import Info from './Info';
import styles from './index.less';

const useInfo = keys => {
  const [info, setInfo] = useState({
    // 头像
    avatar: '',
    // 备注
    nickName: '',
    // 邮箱
    email: '',
    // 签名
    sign: '',
    // 原名称
    name: '',
    // 分组
    group: '',
    groupList: [],

    // 个人
    // 性别 1男 2女
    sex: '1',
    // 年龄
    age: '0',

    // 群聊
    // 我的群名片
    groupName: '',
    // 群成员人数
    groupCount: '0',
    // 群聊权限 1 普通群员 2 管理员 3 群主
    permit: '1',
  });
  useEffect(() => {
    setInfo({
      // 头像
      avatar: defaultAvatar,
      // 备注
      nickName: keys[0] === '1' ? '群昵称' : '个人昵称',
      // 邮箱
      email: keys[0] === '1' ? `群账号key${keys[2]}` : `个人邮箱账号${keys[2]}`,
      // 签名
      sign: keys[0] === '1' ? '公告' : '签名',
      // 原名称
      name: keys[0] === '1' ? '群原名称' : '个人原名称',
      // 分组
      group: keys[1],
      groupList: [
        {
          name: '分组1',
          key: '1',
        },
        {
          name: '分组2',
          key: '2',
        },
        {
          name: '分组3',
          key: '3',
        },
        {
          name: '分组4',
          key: '4',
        },
      ],

      // 个人
      // 性别 1男 2女
      sex: String(Math.floor(Math.random() * 2) + 1),
      // 年龄
      age: String(Math.floor(Math.random() * 15) + 20),

      // 群聊
      // 我的群名片
      groupName: '群名片',
      // 群成员人数
      groupCount: '12',
      // 群聊权限 1 普通群员 2 管理员 3 群主
      permit: String(Math.floor(Math.random() * 3) + 1),
    });
  }, [keys[0], keys[1], keys[2]]);
  return [info, setInfo];
};

const ContentList = ({ activeFriend }) => {
  // activeFriend 为三个key拼接的string 空格分隔
  // key1: 2 群聊 1 好友
  // key2: 分组 key
  // key3: 具体哪个群/好友 key
  const keys = typeof activeFriend === 'string' ? activeFriend.split(' ') : [];
  const [info, setInfo] = useInfo(keys);
  return (
    <div className={styles.contentListWrapper}>
      {activeFriend ? (
        <Info
          // type 2 群聊 1 个人
          type={keys[0]}
          // 展示信息
          info={info}
          // 修改数据函数
          setInfo={setInfo}
        />
      ) : (
        <Empty description="" />
      )}
    </div>
  );
};

export default connect(({ home }) => ({
  activeFriend: home.activeFriend,
}))(ContentList);
