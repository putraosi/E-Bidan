export const constants = {
  REGEX_EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  SELECT_GENDER: [
    {id: 'male', name: 'Pria'},
    {id: 'female', name: 'Wanita'},
  ],

  SELECT_PLACE_EXECUTION: [
    {id: 1, name: 'Klinik Bidan Amel'},
    {id: 2, name: 'Rumah Pasien'},
  ],

  SELECT_PREGNANCY: [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: 'Lainnya'},
  ],

  SELECT_ABORTION: [
    {id: 1, name: 'Tidak Pernah'},
    {id: 2, name: '1'},
    {id: 3, name: '2'},
    {id: 4, name: '3'},
    {id: 5, name: 'Lainnya'},
  ],

  SELECT_BIRTHPLACE: [
    {id: 1, name: 'RS'},
    {id: 2, name: 'Puskesmas'},
    {id: 3, name: 'Bidan'},
    {id: 4, name: 'Lainnya'},
    {id: 5, name: 'Bidan Amel'},
  ],

  SELECT_TYPE_DESCRIPTION: [
    {id: 1, name: 'Hygea'},
    {id: 2, name: 'Umum'},
  ],

  SELECT_TYPE_CHILDBIRTH: [
    {id: 1, name: 'Spontan LBK'},
    {id: 2, name: 'Spontan Letak Bokong'},
    {id: 3, name: 'Spontan Letak Muka'},
    {id: 4, name: 'Lainnya'},
  ],

  SELECT_TYPE_IMMUNIZATION: [
    {id: 1, name: 'HB 0', select: false},
    {id: 2, name: 'Polio 3', select: false},
    {id: 3, name: 'BCG', select: false},
    {id: 4, name: 'Polio 4', select: false},
    {id: 5, name: 'Pentabio 1', select: false},
    {id: 6, name: 'IPV', select: false},
    {id: 7, name: 'Pentabio 2', select: false},
    {id: 8, name: 'MR', select: false},
    {id: 9, name: 'Pentabio 3', select: false},
    {id: 10, name: 'Pentabio Booster (Ulangan)', select: false},
    {id: 11, name: 'Polio 1', select: false},
    {id: 12, name: 'MR Booster (Ulangan)', select: false},
    {id: 13, name: 'Polio 2', select: false},
    {id: 14, name: 'Lainnya', select: false},
  ],

  SELECT_OPTION: [
    {id: 1, name: 'Pendampingan'},
    {id: 2, name: 'Mandiri'},
  ],

  SELECT_ANTENATAL_INFORMATION: [
    {id: 1, name: 'K1', select: false},
    {id: 2, name: 'K2', select: false},
    {id: 3, name: 'LAB', select: false},
  ],

  SELECT_ANTENATAL_HISTORY: [
    {id: 1, name: 'Spontan', select: false},
    {id: 2, name: 'Sectio Caesarea', select: false},
  ],

  SELECT_COMPANINON_MIDWIFE: [
    {id: 1, name: 'Bidan Amel', select: false},
    {id: 2, name: 'Bidan Rani', select: false},
    {id: 3, name: 'Bidan Nisa', select: false},
    {id: 4, name: 'Bidan Iwana', select: false},
    {id: 5, name: 'Bidan Syifa', select: false},
    {id: 6, name: 'Bidan Ningsih', select: false},
    {id: 7, name: 'Bidan Dwi', select: false},
    {id: 8, name: 'Bidan Hansa', select: false},
  ],
};
