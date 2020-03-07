import React from 'react';
import SiderChat from './SiderChat';
import SiderList from './SiderList';

const Sider = ({ currentMenu }) => {
  return (
    <div>
      {
        currentMenu === 'chat'
          ? <SiderChat />
          : <SiderList />
      }
    </div>
  )
}

export default Sider;