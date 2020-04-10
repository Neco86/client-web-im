const MediaChatModel = {
  namespace: 'mediaChat',
  state: {
    visible: false,
    video: false,
  },
  reducers: {
    setMediaChatConfig(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default MediaChatModel;
