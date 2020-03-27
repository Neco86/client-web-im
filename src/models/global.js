import { MENU_KEY } from '@/utils/const';

const GlobalModel = {
  namespace: 'global',
  state: {
    socket: null,
    // TODO: test数据
    menuKey: MENU_KEY.USER_INFO,
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
