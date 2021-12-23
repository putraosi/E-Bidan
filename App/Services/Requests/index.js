import {Api} from '..';

export const onCancelService = async (id, reason) => {
  try {
    await Api.post({
      url: `admin/bookings/cancelled/${id}`,
      body: {
        remarks: reason,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
