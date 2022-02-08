export const constants = {

  MIDWIFE: 'bidan',
  PATIENT: 'pasien',

  PHONE_NUMBER_ADMIN : '+6282114881831',

  REGEX_EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  SELECT_GENDER: [
    {id: 'male', name: 'Laki-Laki'},
    {id: 'female', name: 'Perempuan'},
  ],

  SELECT_PLACE_EXECUTION: [
    {id: 1, name: 'Klinik Cikal Mulia/Bidan Amel'},
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

  SELECT_TYPE_DESCRIPTION: [
    {id: 1, name: 'Baru'},
    {id: 2, name: 'Lama'},
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

  SELECT_ANTENATAL_INFORMATION: [
    {id: 1, name: 'K1', select: false},
    {id: 2, name: 'K4', select: false},
    {id: 3, name: 'LAB', select: false},
  ],

  SELECT_ANTENATAL_HISTORY: [
    {id: 1, name: 'Spontan', select: false},
    {id: 2, name: 'Sectio Caesaria', select: false},
    {id: 999, name: 'Belum Pernah', select: false},
  ],

  MENU_ITEM_PROFILE: [
    {id: 1, name: 'Ubah Kata Sandi'},
    {id: 2, name: 'Keluar'},
  ],

  SELECT_PHOTO: [
    {id: 1, name: 'Gallery'},
    {id: 2, name: 'Kamera'},
  ],

  SELECT_DISEASE_HISTORY: [
    {id: 1, name: 'Jantung', select: false},
    {id: 2, name: 'Paru-Paru', select: false},
    {id: 3, name: 'Ginjal', select: false},
    {id: 4, name: 'Liver', select: false},
    {id: 5, name: 'Hipertensi', select: false},
    {id: 6, name: 'Alergi', select: false},
    {id: 7, name: 'Operasi', select: false},
    {id: 8, name: 'Lainnya', select: false},
  ],

  SELECT_HISTORY_PLACE_BIRTH: [
    {id: 1, name: 'Klinik Cikal Mulia/Bidan Amel'},
    {id: 2, name: 'Faskes Lain'},
  ],

  SELECT_BLOOD_GROUP: [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'AB'},
    {id: 4, name: 'O'},
    {id: 5, name: 'Tidak Tahu'},
  ],

  SELECT_RELLIGION: [
    {id: 1, name: 'Islam'},
    {id: 2, name: 'Protestan'},
    {id: 3, name: 'Katolik'},
    {id: 4, name: 'Hindu'},
    {id: 5, name: 'Buddha'},
    {id: 6, name: 'Khonghucu'},
  ],

  SELECT_BIRTH_TYPE: [
    {id: 1, name: 'Spontan'},
    {id: 2, name: 'Sesar'},
    {id: 3, name: 'Tindakan'},
  ],

  SELECT_STATUS_KB: [
    {id: 1, name: 'Baru'},
    {id: 2, name: 'Ulangan'},
    {id: 3, name: 'Ganti Cara'},
    {id: 4, name: 'Paska Bersalin'},
  ],

  SELECT_TYPE_KB: [
    {id: 1, name: 'Pil'},
    {id: 2, name: 'Implant'},
    {id: 3, name: 'IUD'},
    {id: 4, name: 'Suntik 1 bulan'},
    {id: 5, name: 'Suntik 3 bulan'},
  ],

  SELECT_YES_OR_NO: [
    {id: 1, name: 'Iya', value: true},
    {id: 2, name: 'Tidak', value: false},
  ],
};
