import React from 'react';

const Sider = ({ currentMenu }) => {
  return (
    <div>
      {
        currentMenu === 'chat'
          ? '聊天sider'
          : '通讯里sider'
      }
    </div>
  )
}

export default Sider;