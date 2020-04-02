const ChatModel = {
  namespace: 'chat',
  state: {
    recentChats: [],
    activeChat: [],
    chats: [],
    hasMore: false,
  },
  reducers: {
    setRecentChats(state, { recentChats }) {
      return {
        ...state,
        recentChats,
      };
    },
    setActiveChat(state, { activeChat }) {
      return {
        ...state,
        activeChat,
      };
    },
    setChats(state, { payload: { chats, page, hasMore } }) {
      if (page === 0) {
        return {
          ...state,
          chats,
          hasMore,
        };
      }
      return {
        ...state,
        chats: [...chats, ...state.chats],
        hasMore,
      };
    },
    receivedMsg(state, { msg }) {
      return {
        ...state,
        chats: [...state.chats, msg],
      };
    },
  },
};
export default ChatModel;
