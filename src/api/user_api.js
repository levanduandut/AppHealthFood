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
export const get_sick_list = async data => {
  try {
    const res = await api('user/get-all-sick', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const user_health_update = async data => {
  try {
    const res = await api('user/health-create', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const user_health_info = async data => {
  try {
    const res = await api('user/health-info', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_category_food_list = async data => {
  try {
    const res = await api('user/get-food-category', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_food_list_by_category = async data => {
  try {
    const res = await api('user/get-food', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_category_exe_list = async data => {
  try {
    const res = await api('user/get-exercise-category', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_exe_list_by_category = async data => {
  try {
    const res = await api('user/get-exercise', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const post_absorb = async data => {
  try {
    const res = await api('user/create-absorb', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const user_absorb_info = async data => {
  try {
    const res = await api('user/get-absorb', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const user_status_info = async data => {
  try {
    const res = await api('user/get-status', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_food_list_by_sick = async data => {
  try {
    const res = await api('user/get-food', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const get_ingre_list_by_sick = async data => {
  try {
    const res = await api('user/get-ingredient-bysick', {
      method: 'POST',
      data: data,
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
