import axios from 'axios';
import { showAlert } from './alerts.js';
export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:9090/api/users/updateProfile',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Data Updated successfully!');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
