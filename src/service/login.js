import request from '@/utils/request';

const login = async params =>
  request('/login', {
    method: 'POST',
    data: params,
  });

export { login };
