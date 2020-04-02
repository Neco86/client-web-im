import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import styles from './index.less';

const Chats = ({ chats, loadMore, hasMore }) => {
  const chatContent = useRef(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  useEffect(() => {
    if (
      chatContent.current &&
      chatContent.current.scrollHeight > chatContent.current.clientHeight
    ) {
      if (isLoadMore) {
        setTimeout(() => {
          setIsLoadMore(false);
        }, 100);
      } else {
        chatContent.current.scrollTop = chatContent.current.scrollHeight;
      }
    }
  }, [chats]);
  return (
    <div className={styles.chatsWrapper} ref={chatContent}>
      {hasMore && (
        <div
          className={styles.loadMore}
          onClick={() => {
            setIsLoadMore(true);
            loadMore();
          }}
        >
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
