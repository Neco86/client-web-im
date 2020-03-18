import request from '@/utils/request';

const getResetCaptcha = async params =>
  request('/getResetCaptcha', {
    method: 'POST',
    data: params,
  });

const confirmEmail = async params =>
  request('/confirmEmail', {
    method: 'POST',
    data: params,
  });
const resetPassword = async params =>
  request('/resetPassword', {
    method: 'POST',
    data: params,
  });

export { getResetCaptcha, confirmEmail, resetPassword };
