import request from '@/utils/request';

const verifyToken = async params =>
  request('/verifyToken', {
    method: 'POST',
    data: params,
  });

export { verifyToken };
