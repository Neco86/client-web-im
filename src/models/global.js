const GlobalModel = {
  namespace: 'global',
  state: {
    socket: null,
    menuKey: '2', // TODO: test数据
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
