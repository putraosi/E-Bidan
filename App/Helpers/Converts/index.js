export const getBookingType = data => {
  const type = data.replace('App\\Models\\', '');

  if (type == 'OtherService') return 'Lainnya';

  if (type == 'Antenatal') return 'Antenatal';

  if (type == 'Immunization') return 'Immunisasi';

  if (type == 'HomeCareService') return 'Homecare';
  
  return '';
};

export const selectPageByService = data => {
  const type = data.replace('App\\Models\\', '');
  
  if (type == 'OtherService') return 'OtherSerivceDetails';
  
  if (type == 'Antenatal') return 'AntenatalSerivceDetails';

  if (type == 'Immunization') return 'ImmunizationSerivceDetails';

  if (type == 'HomeCareService') return 'HomecareSerivceDetails';


  return null;
};
