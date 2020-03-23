const SearchInfoModel = {
  namespace: 'searchInfo',
  state: {
    // [
    //   {
    //     avatar: '',
    //     nickname: '',
    //     account: '', // email/群号
    //     type: '', // 1 不是好友 2 已经是好友 3 自己
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
  },
};
export default SearchInfoModel;
