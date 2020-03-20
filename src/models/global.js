const GlobalModel = {
  namespace: 'global',
  state: {
    socket: null,
    menuKey: '1',
  },
  reducers: {
    setSocket(state, { socket }) {
      return {
        ...state,
        socket,
      };
    },
    setMenuKey(state, { menuKey }) {
      return {
        ...state,
        menuKey,
      };
    },
  },
};
export default GlobalModel;
