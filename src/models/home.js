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
        key: '1',
        type: '1', // type 1普通聊天 2群聊天
      },
      {
        nikeName: 'nikeName2',
        avatar: defaultAvatar,
        latestChat: 'Message2',
        latestTime: '14:20',
        unread: 1,
        key: '2',
        type: '1',
      }, {
        nikeName: 'groupName3',
        avatar: defaultAvatar,
        latestChat: 'Message3',
        latestTime: '14:20',
        unread: 2,
        key: '3',
        type: '2',
      },
      {
        nikeName: 'groupName4',
        avatar: defaultAvatar,
        latestChat: 'Message4',
        latestTime: '14:20',
        unread: 0,
        key: '4',
        type: '2',
      },
      {
        nikeName: 'nikeName5',
        avatar: defaultAvatar,
        latestChat: 'Message5',
        latestTime: '14:20',
        unread: 0,
        key: '5',
        type: '1',
      },
      {
        nikeName: 'nikeName6',
        avatar: defaultAvatar,
        latestChat: 'Message6',
        latestTime: '14:20',
        unread: 0,
        key: '6',
        type: '1',
      },
      {
        nikeName: 'nikeName7',
        avatar: defaultAvatar,
        latestChat: 'Message7',
        latestTime: '14:20',
        unread: 0,
        key: '7',
        type: '1',
      },
      {
        nikeName: 'nikeName8',
        avatar: defaultAvatar,
        latestChat: 'Message8',
        latestTime: '14:20',
        unread: 0,
        key: '8',
        type: '1',
      },
      {
        nikeName: 'nikeName9',
        avatar: defaultAvatar,
        latestChat: 'Message9',
        latestTime: '14:20',
        unread: 0,
        key: '9',
        type: '1',
      },
      {
        nikeName: 'nikeName10',
        avatar: defaultAvatar,
        latestChat: 'Message10',
        latestTime: '14:20',
        unread: 0,
        key: '10',
        type: '1',
      },
    ],
    activeChat: 0,
    friendsList: [
      {
        title: '群组',
        key: '1',
        friendGroup: [
          {
            groupName: '群聊',
            count: '12',
            key: '1',
            friends: [
              {
                avatar: defaultAvatar,
                name: '群聊1',
                desc: '公告:群聊1',
                key: '1'
              },
              {
                avatar: defaultAvatar,
                name: '群聊2',
                desc: '公告:群聊2',
                key: '2'
              }
            ]
          },
        ]
      },
      {
        title: '好友',
        key: '2',
        friendGroup: [
          {
            groupName: '分组1',
            count: '1/2',
            key: '1',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                key: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                key: '2'
              },
            ]
          },
          {
            groupName: '分组2',
            count: '1/1',
            key: '2',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                key: '1'
              },
            ]
          },
          {
            groupName: '分组3',
            count: '11/12',
            key: '3',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                key: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                key: '2'
              },
            ]
          },
          {
            groupName: '分组4',
            count: '13/23',
            key: '4',
            friends: [
              {
                avatar: defaultAvatar,
                name: '好友1',
                desc: '[在线]xxx',
                key: '1'
              },
              {
                avatar: defaultAvatar,
                name: '好友2',
                desc: '[在线]xxx',
                key: '2'
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
        if (item.key === payload) {
          item.unread = 0
        }
        return item
      })
      return { ...state, chats: newChats, activeChat: payload };
    },
    closeChat(state, { payload }) {
      const newChats = state.chats.filter(item => item.key !== payload)
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
    changeActiveFriend(state, { payload: { key1, key2, key3 } }) {
      // key1 群组/好友
      // key2 分组
      // key3 具体哪一个
      const activeFriend = `${key1} ${key2} ${key3}`
      return { ...state, activeFriend };
    }
  }
}
export default HomeModel;
