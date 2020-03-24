import { SEARCH_TYPE, FRIEND_TYPE } from '@/utils/const';

const SearchInfoModel = {
  namespace: 'searchInfo',
  state: {
    // [
    //   {
    //     avatar: '',
    //     nickname: '',
    //     account: '', // email/群号
    //     type: '', // 1 不是好友 2 已经是好友 3 自己 4 正在申请
    //   },
    // ]
    friendList: [],
    groupList: [],
  },
  reducers: {
    setSearchInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setAddFriendResult(state, { payload: { account, friendType } }) {
      if (friendType === FRIEND_TYPE.FRIEND) {
        let newFriendList = JSON.parse(JSON.stringify(state.friendList));
        newFriendList = newFriendList.map(user => {
          if (user.account === account) {
            user.type = SEARCH_TYPE.APPLYING;
          }
          return user;
        });
        return {
          ...state,
          friendList: newFriendList,
        };
      }
      if (friendType === FRIEND_TYPE.GROUP) {
        let newGroupList = JSON.parse(JSON.stringify(state.groupList));
        newGroupList = newGroupList.map(user => {
          if (user.account === account) {
            user.type = SEARCH_TYPE.APPLYING;
          }
          return user;
        });
        return {
          ...state,
          groupList: newGroupList,
        };
      }
      return {
        ...state,
      };
    },
  },
};
export default SearchInfoModel;
