export const getBookingType = data => {
  const type = data.replace('App\\Models\\', '');

  if (type == 'OtherService') return 'Lainnya';

  if (type == 'Antenatal') return 'Antenatal';

  if (type == 'Immunization') return 'Immunisasi';
  
  return '';
};

export const selectPageByService = data => {
  const type = data.replace('App\\Models\\', '');
  
  if (type == 'OtherService') return 'OtherSerivceDetails';

  if (type == 'Immunization') return 'ImmunizationSerivceDetails';

  return null;
};
