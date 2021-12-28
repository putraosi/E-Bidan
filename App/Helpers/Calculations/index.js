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
  const diff = Math.abs(moments(date).diff(moments(), 'months'));
  let desc = '';
  if (diff == 0) {
    const diffDays = Math.abs(moments(date).diff(moments(), 'days'));
    desc = `${diffDays} Hari`;
  } else if (diff < 12) desc = `${diff} Bulan`;
  else if (diff % 12 == 0) desc = `${diff / 12} Tahun`;
  else desc = `${(diff / 12).toFixed(0)} Tahun ${diff % 12} Bulan`;

  return desc;
};

export const ageCalculationYear = date => {
  const diff = Math.abs(moments(date).diff(moments(), 'years'));
  return `${diff}`;
};

export const onPrice = item => {
  let price = 0;
  item.map(check => {
    if (check.select) {
      price += check.price;
    }
  });

  return price.toString();
};
