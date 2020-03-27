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
    setGroupAvatar(state, { payload: { chatKey, avatar } }) {
      let newGroupGroups = [];
      newGroupGroups = state.groupGroups.map(group => {
        const { key, groupName, groups } = group;
        const newGroupFriends = [];
        groups.forEach(friend => {
          if (friend.chatKey === chatKey) {
            newGroupFriends.push({ ...friend, avatar });
          } else {
            newGroupFriends.push({ ...friend });
          }
        });
        return { key, groupName, groups: newGroupFriends };
      });
      return {
        ...state,
        groupGroups: newGroupGroups,
      };
    },
    setOnline(state, { payload: { email: onlineEmail, groupKey } }) {
      let newFriendGroups = [];
      newFriendGroups = state.friendGroups.map(group => {
        if (String(group.key) === String(groupKey)) {
          const { key, groupName, friends } = group;
          const newGroupFriends = [];
          const newGroup = { key, groupName, friends: newGroupFriends };
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
          const { key, groupName, friends } = group;
          const newGroupFriends = [];
          const newGroup = { key, groupName, friends: newGroupFriends };
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
