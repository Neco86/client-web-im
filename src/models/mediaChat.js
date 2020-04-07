const MediaChatModel = {
  namespace: 'mediaChat',
  state: {
    // [audio,video]
    mediaChat: [false, false],
  },
  reducers: {
    setMediaChat(state, { mediaChat }) {
      return {
        ...state,
        mediaChat,
      };
    },
  },
};
export default MediaChatModel;
