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

export const onUpdateStatusSerivces = async (id, status, reason) => {
  try {
    await Api.post({
      url: `admin/bookings/update-status/${id}`,
      body: {
        status,
        remarks: reason,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export const onFinishServices = async (id, price, note) => {
  try {
    await Api.post({
      url: `admin/consultation-results`,
      body: {
        remarks: '',
        description: note,
        practice_booking_id: id,
        cost: parseInt(price),
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
