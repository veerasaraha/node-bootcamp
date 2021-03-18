import axios from 'axios';
import { showAlert } from './alerts.js';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:9090/api/users/updatePassword'
        : 'http://127.0.0.1:9090/api/users/updateProfile';

    const res = await axios({
      method: 'PATCH',
      url,
      data: data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated successfully!`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

// /api/users/updatePassword
