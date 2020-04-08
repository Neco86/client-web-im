const MediaChatModel = {
  namespace: 'mediaChat',
  state: {
    visible: false,
  },
  reducers: {
    setMediaChatVisible(state, { visible }) {
      return {
        ...state,
        visible,
      };
    },
  },
};
export default MediaChatModel;
