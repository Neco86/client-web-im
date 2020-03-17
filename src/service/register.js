import request from '@/utils/request';

const getCaptcha = async params =>
  request('/getCaptcha', {
    method: 'POST',
    data: params,
  });

const register = async params =>
  request('/register', {
    method: 'POST',
    data: params,
  });

export { getCaptcha, register };
