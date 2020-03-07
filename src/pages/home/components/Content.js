import React from 'react';
import ContentChat from './ContentChat';
import ContentList from './ContentList';

const Content = ({ currentMenu }) => {
  return (
    <div>
      {
        currentMenu === 'chat'
          ? <ContentChat />
          : <ContentList />
      }
    </div>
  )
}

export default Content;