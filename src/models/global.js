const GlobalModel = {
  namespace: 'global',
  state: {
    socket: null,
  },
  reducers: {
    setSocket(state, { socket }) {
      return {
        ...state,
        socket,
      };
    },
  },
};
export default GlobalModel;
