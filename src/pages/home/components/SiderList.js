import React, { useState } from 'react';
import { Button, Divider, Avatar, Card } from 'antd';
import { RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less';

const SiderList = (
  {
    dispatch,
    activeList,
    friendsList,
    activeFriend
  }) => {
  const openList = key => () => {
    dispatch({
      type: 'home/openList',
      payload: key,
    });
  }
  const [hoverGroup, setHoverGroup] = useState(0);
  const onCardClick = (key1, key2, key3) => e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'home/changeActiveFriend',
      payload: {
        key1,
        key2,
        key3
      },
    });
    return false
  }
  return (
    <div className={styles.siderListWrapper}>
      <div className={styles.top}>
        <Button className={styles.addFriend}>添加好友</Button>
        <Divider />
      </div>
      <div className={styles.scrollBottom}>
        {
          friendsList.map(item1 => (
            <div key={item1.key}>
              <div className={styles.title}>{item1.title}</div>
              {
                item1.friendGroup.map(item => (
                  <div
                    className={styles.group}
                    onClick={openList(`${item1.key} ${item.key}`)}
                    onMouseEnter={() => { setHoverGroup(`${item1.key} ${item.key}`) }}
                    onMouseLeave={() => { setHoverGroup(0) }}
                    key={`${item1.key} ${item.key}`}
                  >
                    <RightOutlined style={{
                      transition: `transform .4s`,
                      transform: activeList.includes(`${item1.key} ${item.key}`) ? `rotate(90deg)` : ''
                    }} />
                    <span className={styles.treeParentName}>{item.groupName}</span>
                    <div className={styles.count}>
                      {hoverGroup === `${item1.key} ${item.key}`
                        ? <UnorderedListOutlined />
                        : item.count}
                    </div>
                    {
                      activeList.includes(`${item1.key} ${item.key}`) &&
                      item.friends.map(friend => (
                        <Card
                          bordered={false}
                          size='small'
                          onMouseEnter={() => { setHoverGroup(0) }}
                          onMouseLeave={() => { setHoverGroup(`${item1.key} ${item.key}`) }}
                          onClick={onCardClick(item1.key, item.key, friend.key)}
                          key={friend.key}
                          bodyStyle={{
                            backgroundColor:
                              activeFriend === `${item1.key} ${item.key} ${friend.key}`
                                ? '#F0F0F0'
                                : ''
                          }}
                        >
                          <Avatar src={friend.avatar} />
                          <div className={styles.nikeName}>
                            {friend.name}
                          </div>
                          <div className={styles.sign}>
                            {friend.desc}
                          </div>
                        </Card>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default connect(({ home }) => ({
  activeList: home.activeList,
  friendsList: home.friendsList,
  activeFriend: home.activeFriend
}))(SiderList);