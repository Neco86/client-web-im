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
      {
        nikeName: 'nikeName7',
        avatar: defaultAvatar,
        latestChat: 'Message7',
        latestTime: '14:20',
        unread: 0,
        order: '7',
      },
      {
        nikeName: 'nikeName8',
        avatar: defaultAvatar,
        latestChat: 'Message8',
        latestTime: '14:20',
        unread: 0,
        order: '8',
      },
      {
        nikeName: 'nikeName9',
        avatar: defaultAvatar,
        latestChat: 'Message9',
        latestTime: '14:20',
        unread: 0,
        order: '9',
      },
      {
        nikeName: 'nikeName10',
        avatar: defaultAvatar,
        latestChat: 'Message10',
        latestTime: '14:20',
        unread: 0,
        order: '10',
      },
    ],
    activeChat: 0,
    friendsList: [
      {
        title: '群组',
        order: '1',
        friendGroup: [
          {
            groupName: '群聊',
            count: '12',
            order: '1',
            friends: [
              {
                avatar: defaultAvatar,
                name: '群聊1',
                desc: '公告:群聊1',
                order: '1'
              }
            ]
          },
        ]
      },
      {
        title: '好友',
        order: '2',
        friendGroup: [
          {
            groupName: '分组1',
            count: '1/2',
            order: '1',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                order: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                order: '2'
              },
            ]
          },
          {
            groupName: '分组2',
            count: '1/1',
            order: '2',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                order: '1'
              },
            ]
          },
          {
            groupName: '分组3',
            count: '11/12',
            order: '3',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                order: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                order: '2'
              },
            ]
          },
          {
            groupName: '分组4',
            count: '13/23',
            order: '4',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                order: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                order: '2'
              },
            ]
          },
        ]
      },
    ],
    // 展开列表
    activeList: [],
    // 选中
    activeFriend: 0,
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
      const newActiveChat = payload === state.activeChat ? 0 : state.activeChat;
      return { ...state, chats: newChats, activeChat: newActiveChat };
    },
    openList(state, { payload }) {
      let activeList = JSON.parse(JSON.stringify(state.activeList));
      if (activeList.includes(payload)) {
        activeList = state.activeList.filter(item => item !== payload)
      } else {
        activeList.push(payload)
      }
      return { ...state, activeList };
    },
    changeActiveFriend(state, { payload: { order1, order2, order3 } }) {
      // order1 群组/好友
      // order2 分组
      // order3 具体哪一个
      const activeFriend = `${order1} ${order2} ${order3}`
      return { ...state, activeFriend };
    }
  }
}
export default HomeModel;
