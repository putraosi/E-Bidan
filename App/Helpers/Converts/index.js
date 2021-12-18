export const getBookingType = data => {
  const type = data.replace('App\\Models\\', '');

  if (type == 'OtherService') return 'Lainnya';

  if (type == 'Antenatal') return 'Antenatal';

  if (type == 'Immunization') return 'Immunisasi';

  if (type == 'HomeCareService') return 'Homecare';

  if (type == 'PregnancyExercise') return 'Senam Hamil';

  if (type == 'Ultrasonografi') return 'USG';

  if (type == 'FamilyPlanning') return 'Keluarga Berencana (KB)';

  return '';
};

export const selectPageByService = data => {
  const type = data.replace('App\\Models\\', '');

  if (type == 'OtherService') return 'OtherSerivceDetails';

  if (type == 'Antenatal') return 'AntenatalSerivceDetails';

  if (type == 'Immunization') return 'ImmunizationSerivceDetails';

  if (type == 'HomeCareService') return 'HomecareSerivceDetails';

  if (type == 'PregnancyExercise') return 'PregnancyExerciseSerivceDetails';

  if (type == 'Ultrasonografi') return 'UltrasonografiSerivceDetails';

  if (type == 'FamilyPlanning') return 'KBSerivceDetails';

  return null;
};
