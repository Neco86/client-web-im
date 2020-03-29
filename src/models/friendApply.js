const FriendApplyModel = {
  namespace: 'friendApply',
  state: {
    apply: [],
    friendApplyModal: false,
  },
  reducers: {
    setApply(state, { apply }) {
      return {
        ...state,
        apply,
      };
    },
    setModal(state, { friendApplyModal }) {
      return {
        ...state,
        friendApplyModal,
      };
    },
  },
};
export default FriendApplyModel;
