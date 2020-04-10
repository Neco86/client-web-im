const MediaChatModel = {
  namespace: 'mediaChat',
  state: {
    visible: false,
    video: false,
    caller: false,
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
