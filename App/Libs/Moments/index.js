import moment from "moment";

export const moments = (date) => {
  moment.locale("id");
  return moment(date);
};