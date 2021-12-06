export const constants = {
  REGEX_EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  SELECT_GENDER: [
    {id: 'male', name: 'Laki-Laki'},
    {id: 'female', name: 'Perempuan'},
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
    {id: 6, name: '6'},
    {id: 7, name: '7'},
    {id: 8, name: '8'},
    {id: 9, name: '9'},
    {id: 10, name: '10'},
    {id: 11, name: '11'},
    {id: 12, name: '12'},
    {id: 13, name: '13'},
    {id: 14, name: '14'},
    {id: 15, name: '15'},
  ],

  SELECT_ABORTION: [
    {id: 0, name: 'Tidak Pernah'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: '6'},
    {id: 7, name: '7'},
    {id: 8, name: '8'},
    {id: 9, name: '9'},
    {id: 10, name: '10'},
    {id: 11, name: '11'},
    {id: 12, name: '12'},
    {id: 13, name: '13'},
    {id: 14, name: '14'},
    {id: 15, name: '15'},
  ],

  SELECT_BIRTHPLACE: [
    {id: 1, name: 'RS'},
    {id: 2, name: 'Puskesmas'},
    {id: 3, name: 'Bidan'},
    {id: 4, name: 'Bidan Amel'},
    {id: 5, name: 'Lainnya'},
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
    {id: 1, name: 'Pendamping'},
    {id: 2, name: 'Mandiri'},
  ],

  SELECT_GESTATIONAL_AGE: [
    {id: 1, name: '1 Minggu'},
    {id: 2, name: '2 Minggu'},
    {id: 3, name: '3 Minggu'},
    {id: 4, name: '4 Minggu'},
    {id: 5, name: '5 Minggu'},
    {id: 6, name: '6 Minggu'},
    {id: 7, name: '7 Minggu'},
    {id: 8, name: '8 Minggu'},
    {id: 9, name: '9 Minggu'},
    {id: 10, name: '10 Minggu'},
    {id: 11, name: '11 Minggu'},
    {id: 12, name: '12 Minggu'},
    {id: 13, name: '13 Minggu'},
    {id: 14, name: '14 Minggu'},
    {id: 15, name: '15 Minggu'},
    {id: 16, name: '16 Minggu'},
    {id: 17, name: '17 Minggu'},
    {id: 18, name: '18 Minggu'},
    {id: 19, name: '19 Minggu'},
    {id: 20, name: '20 Minggu'},
    {id: 21, name: '21 Minggu'},
    {id: 22, name: '22 Minggu'},
    {id: 23, name: '23 Minggu'},
    {id: 24, name: '24 Minggu'},
    {id: 25, name: '25 Minggu'},
    {id: 26, name: '26 Minggu'},
    {id: 27, name: '27 Minggu'},
    {id: 28, name: '28 Minggu'},
    {id: 29, name: '29 Minggu'},
    {id: 30, name: '30 Minggu'},
    {id: 31, name: '31 Minggu'},
    {id: 32, name: '32 Minggu'},
    {id: 33, name: '33 Minggu'},
    {id: 34, name: '34 Minggu'},
    {id: 35, name: '35 Minggu'},
    {id: 36, name: '36 Minggu'},
    {id: 37, name: '37 Minggu'},
    {id: 38, name: '38 Minggu'},
    {id: 39, name: '39 Minggu'},
    {id: 40, name: '40 Minggu'},
  ],

  SELECT_ANTENATAL_INFORMATION: [
    {id: 1, name: 'K1', select: false},
    {id: 2, name: 'K4', select: false},
    {id: 3, name: 'LAB', select: false},
  ],

  SELECT_ANTENATAL_HISTORY: [
    {id: 1, name: 'Spontan', select: false},
    {id: 2, name: 'Sectio Caesaria', select: false},
  ],

  MENU_ITEM_PROFILE: [
    {id: 1, name: 'Ubah Kata Sandi'},
    {id: 2, name: 'Keluar'},
  ],

  SELECT_PHOTO: [
    {id: 1, name: 'Gallery'},
    {id: 2, name: 'Kamera'},
  ],
};
