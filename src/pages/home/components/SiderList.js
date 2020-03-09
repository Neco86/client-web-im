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
  const openList = order => () => {
    dispatch({
      type: 'home/openList',
      payload: order,
    });
  }
  const [hoverGroup, setHoverGroup] = useState(0);
  const onCardClick = (order1, order2, order3) => e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'home/changeActiveFriend',
      payload: {
        order1,
        order2,
        order3
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
            <div key={item1.order}>
              <div className={styles.title}>{item1.title}</div>
              {
                item1.friendGroup.map(item => (
                  <div
                    className={styles.group}
                    onClick={openList(`${item1.order} ${item.order}`)}
                    onMouseEnter={() => { setHoverGroup(`${item1.order} ${item.order}`) }}
                    onMouseLeave={() => { setHoverGroup(0) }}
                    key={`${item1.order} ${item.order}`}
                  >
                    <RightOutlined style={{
                      transition: `transform .4s`,
                      transform: activeList.includes(`${item1.order} ${item.order}`) ? `rotate(90deg)` : ''
                    }} />
                    <span className={styles.treeParentName}>{item.groupName}</span>
                    <div className={styles.count}>
                      {hoverGroup === `${item1.order} ${item.order}`
                        ? <UnorderedListOutlined />
                        : item.count}
                    </div>
                    {
                      activeList.includes(`${item1.order} ${item.order}`) &&
                      item.friends.map(friend => (
                        <Card
                          bordered={false}
                          size='small'
                          onMouseEnter={() => { setHoverGroup(0) }}
                          onMouseLeave={() => { setHoverGroup(`${item1.order} ${item.order}`) }}
                          onClick={onCardClick(item1.order, item.order, friend.order)}
                          key={friend.order}
                          bodyStyle={{
                            backgroundColor:
                              activeFriend === `${item1.order} ${item.order} ${friend.order}`
                                ? '#F0F0F0'
                                : ''
                          }}
                        >
                          <Avatar />
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