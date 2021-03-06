import { DEFAULT_AVATAR, USER_STATUS } from '@/utils/const';

const UserInfoModel = {
  namespace: 'userInfo',
  state: {
    avatar: DEFAULT_AVATAR,
    status: USER_STATUS.OFFLINE,
    nickname: '',
    sign: '',
    sex: '',
    age: '',
    email: '',
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default UserInfoModel;
