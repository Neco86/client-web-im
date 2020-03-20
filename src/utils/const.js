const SUCCESS_CODE = 1;
const ERROR_CODE = 0;
const TOKEN_NAME = 'chatChat-token';
const USER_STATUS = {
  ONLINE: '1',
  HIDE: '2',
  OFFLINE: '3',
};
const USER_STATUS_COLOR = {
  [USER_STATUS.ONLINE]: '#3CD821',
  [USER_STATUS.HIDE]: '#EBB63A',
  [USER_STATUS.OFFLINE]: '#A3A8AC',
};

module.exports = { SUCCESS_CODE, ERROR_CODE, TOKEN_NAME, USER_STATUS, USER_STATUS_COLOR };
