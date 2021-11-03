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

  
};
