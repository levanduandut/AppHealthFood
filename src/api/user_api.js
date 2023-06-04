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

export const user_info = async data => {
  try {
    const res = await api('user/getInfo', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const nutrition_info = async data => {
  try {
    const res = await api('user/get-all-ingredient', {
      method: 'GET',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const translate_x = async data => {
  try {
    const res = await api('user/translate', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const getBlog = async data => {
  try {
    const res = await api('user/get-all-blog', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const user_register = async data => {
  try {
    const res = await api('user/register', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
