import React from 'react';

const Content = ({ currentMenu }) => {
  return (
    <div>
      {
        currentMenu === 'chat'
          ? '聊天content'
          : '通讯录content'
      }
    </div>
  )
}

export default Content;