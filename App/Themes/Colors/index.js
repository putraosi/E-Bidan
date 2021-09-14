const mainColors = {
  blue1: '#43BBFF',
  yellow1: '#FAFF00',
  red1: '##FF0000',
  green1: '#93DEE2',
  green2: '#20CFCA',
  gray1: '#e9e9e9',
  gray2: '#bbbbbb',
  white1: '#ffffff',
  black1: '#000000',
  black2: '#4A4A4A',
  whiteTranparent1: 'rgba(255, 255, 255, 0.5)',
  blueTranparent1: 'rgba(67, 187, 255, 0.85)',
  blackTransparent1: 'rgba(0, 0, 0, 0.5)',
  grayTransparent1: 'rgba(196, 196, 196, 0.2)',
  grayTransparent2: 'rgba(196, 196, 196, 0.4)',

  transparent: 'transparent',
};

export const colors = {
  primary: mainColors.green1,
  white: mainColors.white1,
  black: mainColors.black1,
  yellow: mainColors.yellow1,
  backgroundColor: mainColors.gray1,
  backgroundColorModal: mainColors.whiteTranparent1,
  backgroundColorBlue: mainColors.blueTranparent1,
  placeholder: mainColors.gray2,
  text: {
    primary: mainColors.black2,
  },
  button: {
    primary: mainColors.green2,
    default: {
      backgroundColor: mainColors.green2,
      borderColor: mainColors.green2,
      color: mainColors.white1,
    },
  },
  notice: {
    progress: {
      backgroundColor: mainColors.green1,
      color: mainColors.white1,
    },
    pending: {
      backgroundColor: mainColors.yellow1,
      color: mainColors.black2,
    },
    completed: {
      backgroundColor: mainColors.blue1,
      color: mainColors.white1,
    },
    rejected: {
      backgroundColor: mainColors.red1,
      color: mainColors.white1,
    },
  },
  input: {
    backgroundColor: mainColors.grayTransparent2,
  },
};
