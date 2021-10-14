import moment from "moment";
import 'moment/locale/id';

export const moments = (date) => {
  moment.locale("id");
  return moment(date);
};