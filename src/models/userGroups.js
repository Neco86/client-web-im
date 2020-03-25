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
    setOnline(state, { payload: { email: onlineEmail, groupKey } }) {
      let newFriendGroups = [];
      newFriendGroups = state.friendGroups.map(group => {
        if (String(group.key) === String(groupKey)) {
          const { key, email, groupName, type, friends } = group;
          const newGroupFriends = [];
          const newGroup = { key, email, groupName, type, friends: newGroupFriends };
          newGroupFriends.push(
            ...friends.map(member =>
              member.email === onlineEmail ? { ...member, online: true } : member,
            ),
          );
          return newGroup;
        }
        return group;
      });
      return {
        ...state,
        friendGroups: newFriendGroups,
      };
    },
    setOffline(state, { payload: { email: onlineEmail, groupKey } }) {
      let newFriendGroups = [];
      newFriendGroups = state.friendGroups.map(group => {
        if (String(group.key) === String(groupKey)) {
          const { key, email, groupName, type, friends } = group;
          const newGroupFriends = [];
          const newGroup = { key, email, groupName, type, friends: newGroupFriends };
          newGroupFriends.push(
            ...friends.map(member =>
              member.email === onlineEmail ? { ...member, online: false } : member,
            ),
          );
          return newGroup;
        }
        return group;
      });
      return {
        ...state,
        friendGroups: newFriendGroups,
      };
    },
  },
};
export default userGroupsModel;
