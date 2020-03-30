const ChatModel = {
  namespace: 'chat',
  state: {
    recentChats: [],
    activeChat: [],
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
  },
};
export default ChatModel;
