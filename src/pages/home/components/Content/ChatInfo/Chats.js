import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import styles from './index.less';

const Chats = ({ chats, loadMore, hasMore, page }) => {
  const chatContent = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (
      chatContent.current &&
      chatContent.current.scrollHeight > chatContent.current.clientHeight
    ) {
      if (page === 0) {
        chatContent.current.scrollTop = chatContent.current.scrollHeight;
      } else {
        chatContent.current.scrollTop += chatContent.current.scrollHeight - height;
      }
      setHeight(chatContent.current.scrollHeight);
    }
  }, [chats, page]);
  return (
    <div className={styles.chatsWrapper} ref={chatContent}>
      {hasMore && (
        <div className={styles.loadMore} onClick={loadMore}>
          加载更多
        </div>
      )}
      {chats.map(chat => (
        <ChatBubble key={chat.key} chat={chat} />
      ))}
    </div>
  );
};

export default Chats;
