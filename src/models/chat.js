const ChatModel = {
  namespace: 'chat',
  state: {
    recentChats: [],
    activeChat: [],
    chats: [],
    hasMore: false,
    memberInfo: [],
    selectedFile: '',
    selectedFolder: '',
    agree: '',
    fileKey: '',
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
      if (state.chats.filter(chat => chat.key === msg.key).length > 0) {
        return {
          ...state,
          chats: [...state.chats.map(chat => (chat.key === msg.key ? msg : chat))],
        };
      }
      return {
        ...state,
        chats: [...state.chats, msg],
      };
    },
    setGroupMemberInfo(state, { info }) {
      return {
        ...state,
        memberInfo: info,
      };
    },
    setSelectedFile(state, { selectedFile }) {
      return {
        ...state,
        selectedFile,
      };
    },
    setSelectedFolder(state, { selectedFolder }) {
      return {
        ...state,
        selectedFolder,
      };
    },
    setAgree(state, { agree }) {
      return {
        ...state,
        agree,
      };
    },
    setFileKey(state, { fileKey }) {
      return {
        ...state,
        fileKey,
      };
    },
  },
};
export default ChatModel;
