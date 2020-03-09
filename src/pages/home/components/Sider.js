import React, { Fragment } from 'react';
import SiderChat from './SiderChat';
import SiderList from './SiderList';

const Sider = ({ currentMenu }) => {
  return (
    <Fragment>
      {
        currentMenu === 'chat'
          ? <SiderChat />
          : <SiderList />
      }
    </Fragment>
  )
}

export default Sider;