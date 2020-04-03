import React from 'react';
import { Menu } from 'antd';
import { GROUP_PERMIT, GROUP_MEMBER_EDIT } from '@/utils/const';

const GroupMemberMenu = ({ peer, myPermit }) => {
  const peerPermit = peer.permit;
  const onMenuClick = ({ key }) => {
    console.log('TODO: 处理群聊成员', key, peer.email);
  };
  if (myPermit === GROUP_PERMIT.OWNER) {
    if (peerPermit === GROUP_PERMIT.MANAGER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_MEMBER_EDIT.WITHDRAW_MANAGER}>撤销管理员</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.MEMBER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_MEMBER_EDIT.SET_MANAGER}>设置管理员</Menu.Item>
          <Menu.Item key={GROUP_MEMBER_EDIT.BANNED}>禁言</Menu.Item>
          <Menu.Item key={GROUP_MEMBER_EDIT.TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.BANNED) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_MEMBER_EDIT.WITHDRAW_BANNED}>解除禁言</Menu.Item>
          <Menu.Item key={GROUP_MEMBER_EDIT.TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
  }
  if (myPermit === GROUP_PERMIT.MANAGER) {
    if (peerPermit === GROUP_PERMIT.MEMBER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_MEMBER_EDIT.BANNED}>禁言</Menu.Item>
          <Menu.Item key={GROUP_MEMBER_EDIT.TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.BANNED) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_MEMBER_EDIT.WITHDRAW_BANNED}>解除禁言</Menu.Item>
          <Menu.Item key={GROUP_MEMBER_EDIT.TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
  }
  return <></>;
};

export default GroupMemberMenu;
