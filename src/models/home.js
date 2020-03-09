import { defaultAvatar } from '@/utils/utils';

const HomeModel = {
  namespace: 'home',
  state: {
    chats: [
      {
        nikeName: 'nikeName1',
        avatar: defaultAvatar,
        latestChat: 'Message1',
        latestTime: '14:20',
        unread: 0,
        order: '1',
      },
      {
        nikeName: 'nikeName2',
        avatar: defaultAvatar,
        latestChat: 'Message2',
        latestTime: '14:20',
        unread: 1,
        order: '2',
      }, {
        nikeName: 'nikeName3',
        avatar: defaultAvatar,
        latestChat: 'Message3',
        latestTime: '14:20',
        unread: 2,
        order: '3',
      },
      {
        nikeName: 'nikeName4',
        avatar: defaultAvatar,
        latestChat: 'Message4',
        latestTime: '14:20',
        unread: 3,
        order: '4',
      },
      {
        nikeName: 'nikeName5',
        avatar: defaultAvatar,
        latestChat: 'Message5',
        latestTime: '14:20',
        unread: 0,
        order: '5',
      },
      {
        nikeName: 'nikeName6',
        avatar: defaultAvatar,
        latestChat: 'Message6',
        latestTime: '14:20',
        unread: 0,
        order: '6',
      },
    ],
    activeChat: '1',
  },
  effects: {
  },
  reducers: {
    changeChat(state, { payload }) {
      const newChats = JSON.parse(JSON.stringify(state.chats));
      newChats.map(item => {
        if (item.order === payload) {
          item.unread = 0
        }
        return item
      })
      return { ...state, chats: newChats, activeChat: payload };
    },
    closeChat(state, { payload }) {
      const newChats = state.chats.filter(item => item.order !== payload)
      return { ...state, chats: newChats };
    }
  }
}
export default HomeModel;
