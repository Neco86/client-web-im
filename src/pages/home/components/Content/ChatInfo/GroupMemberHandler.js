import React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import { GROUP_PERMIT } from '@/utils/const';

const GroupMemberMenu = ({ peer, myPermit, chatKey, socket, dropDownRef }) => {
  const peerPermit = peer.permit;
  const TICK_OUT = 'tickOut';
  const onMenuClick = ({ key }) => {
    socket.emit('setPermit', {
      chatKey,
      peer: peer.email,
      peerPermit,
      setPermit: key,
      myPermit,
      tickOut: key === TICK_OUT,
    });
    dropDownRef.current.click();
  };
  if (myPermit === GROUP_PERMIT.OWNER) {
    if (peerPermit === GROUP_PERMIT.MANAGER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_PERMIT.MEMBER}>撤销管理员</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.MEMBER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_PERMIT.MANAGER}>设置管理员</Menu.Item>
          <Menu.Item key={GROUP_PERMIT.BANNED}>禁言</Menu.Item>
          <Menu.Item key={TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.BANNED) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_PERMIT.MEMBER}>解除禁言</Menu.Item>
          <Menu.Item key={TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
  }
  if (myPermit === GROUP_PERMIT.MANAGER) {
    if (peerPermit === GROUP_PERMIT.MEMBER) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_PERMIT.BANNED}>禁言</Menu.Item>
          <Menu.Item key={TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
    if (peerPermit === GROUP_PERMIT.BANNED) {
      return (
        <Menu onClick={onMenuClick}>
          <Menu.Item key={GROUP_PERMIT.MEMBER}>解除禁言</Menu.Item>
          <Menu.Item key={TICK_OUT}>踢出群聊</Menu.Item>
        </Menu>
      );
    }
  }
  return <></>;
};

export default connect(({ global }) => ({
  socket: global.socket,
}))(GroupMemberMenu);
