import React, { Fragment } from 'react';
import ContentChat from './ContentChat';
import ContentList from './ContentList';

const Content = ({ currentMenu }) => {
  return (
    <Fragment>
      {
        currentMenu === 'chat'
          ? <ContentChat />
          : <ContentList />
      }
    </Fragment>
  )
}

export default Content;