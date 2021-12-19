import {moments} from '../../Libs';

export const hplCalculation = (visitDate, hpht) => {
  if (!visitDate || !hpht) return '';

  const diff = Math.abs(moments(visitDate).diff(hpht, 'days'));
  let desc = '';

  if (diff == 0) desc = '-';
  else if (diff % 7 == 0) desc = `${diff / 7} Minggu`;
  else if (diff / 7 >= 1)
    desc = `${(diff / 7).toFixed(0)} Minggu ${diff % 7} Hari`;
  else desc = `${diff} Hari`;

  return desc;
};

export const ageCalculation = date => {
  const diff = Math.abs(moments(date).diff(moments(), 'years'));

  return `${diff} Tahun`;
};
