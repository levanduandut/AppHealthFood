import api from './api';

export const user_login = async data => {
  try {
    const res = await api('user/login', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
