import { MENU_KEY } from '@/utils/const';

const GlobalModel = {
  namespace: 'global',
  state: {
    socket: null,
    menuKey: MENU_KEY.CHAT_INFO,
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
