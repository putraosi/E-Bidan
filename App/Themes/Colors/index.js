const mainColors = {
  blue1: '#43BBFF',
  blue2: '#007bff',
  yellow1: '#FFC909',
  red1: '#B80505',
  green1: '#93DEE2',
  green2: '#20CFCA',
  green3: '#02AEA9',
  gray1: '#e9e9e9',
  gray2: '#bbbbbb',
  gray3: '#888888',
  gray4: '#D1CECE',
  white1: '#ffffff',
  black1: '#000000',
  black2: '#4A4A4A',
  whiteTranparent1: 'rgba(255, 255, 255, 0.5)',
  whiteTranparent2: 'rgba(255, 255, 255, 0.3)',
  blueTranparent1: 'rgba(67, 187, 255, 0.85)',
  blueTranparent2: 'rgba(0, 123, 255, 0.50)',
  blackTransparent1: 'rgba(0, 0, 0, 0.5)',
  grayTransparent1: 'rgba(196, 196, 196, 0.2)',
  grayTransparent2: 'rgba(196, 196, 196, 0.4)',
  redTransparent1: 'rgba(220, 53, 70, 0.5)',
  greenTransparent1: 'rgba(40, 167, 70, 0.5)',

  transparent: 'transparent',
};

export const colors = {
  primary: mainColors.green1,
  white: mainColors.white1,
  black: mainColors.black1,
  yellow: mainColors.yellow1,
  transparent: mainColors.transparent,
  backgroundColor: mainColors.gray1,
  backgroundColorModal: mainColors.blackTransparent1,
  backgroundColorBlue: mainColors.blueTranparent1,
  backgroundColorGreen: mainColors.green3,
  placeholder: mainColors.gray2,
  dash: mainColors.green1,
  disable: mainColors.whiteTranparent1,
  danger: mainColors.red1,

  text: {
    primary: mainColors.black2,
    secondary: mainColors.gray3,
    danger: mainColors.red1,
    green: mainColors.green3,
  },
  button: {
    primary: mainColors.green2,
    default: {
      backgroundColor: mainColors.green2,
      borderColor: mainColors.green2,
      color: mainColors.white1,
    },
    white: {
      backgroundColor: mainColors.white1,
      borderColor: mainColors.green2,
      color: mainColors.green2,
    },
    danger: {
      backgroundColor: mainColors.red1,
      borderColor: mainColors.red1,
      color: mainColors.white1,
    },
  },
  notice: {
    progress: {
      backgroundColor: mainColors.blueTranparent2,
      color: mainColors.white1,
    },
    pending: {
      backgroundColor: mainColors.yellow1,
      color: mainColors.black2,
    },
    completed: {
      backgroundColor: mainColors.greenTransparent1,
      color: mainColors.white1,
    },
    rejected: {
      backgroundColor: mainColors.redTransparent1,
      color: mainColors.white1,
    },
  },
  input: {
    backgroundColor: {
      primary: mainColors.grayTransparent2,
      secondary: mainColors.whiteTranparent2,
    },
  },
  separator: {
    primary: mainColors.white1,
  },

  borderColor: {
    primary: mainColors.gray4,
  },
};
