import { FRIEND_TYPE } from '@/utils/const';

const userGroupsModel = {
  namespace: 'userGroups',
  state: {
    friendGroups: [],
    groupGroups: [],
  },
  reducers: {
    setUserGroups(state, { payload: { friendType, groups } }) {
      if (friendType === FRIEND_TYPE.FRIEND) {
        return {
          ...state,
          friendGroups: groups,
        };
      }
      if (friendType === FRIEND_TYPE.GROUP) {
        return {
          ...state,
          groupGroups: groups,
        };
      }
      return {
        ...state,
      };
    },
  },
};
export default userGroupsModel;
