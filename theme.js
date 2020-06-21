

import Sizes from './Sizes';
import Colors from './Colors';
import Strings from './Strings';
import {getStatusBarHeight} from './HeightStatusBar'
const colors = {
  accent: '#F3534A',
  primary: '#0AC4BA',
  secondary: '#2BDA8E',
  tertiary: '#FFE358',
  active: '#0675fe',
  blue: '#2E5BFF',
  lightblue: 'rgba(46,92,255,0.2)',
  green: '#33AC2E',
  red: '#D63649',
  yellow: '#F7C137',
  teal: '#00C1D4',
  purple: '#8C54FF',
  black: '#2E384D',
  black2: '#69707F',
  black3: '#8798AD',
  white: '#FFFFFF',
  gray: '#BFC5D2',
  gray2: '#F4F6FC',
  gray3: '#EEF3F5',
  caption: '#B0BAC9',
  input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
  border: '#D6DDF6',
  card: 'rgba(46,91,255,0.08)',
  shadow: 'rgba(46,91,255,0.07)',
};
// console.warn('DDDD', getStatusBarHeight());
const sizes = {
  // global sizes
  sizeTopBar: getStatusBarHeight(),
  base: 16,
  font: 14,
  radius: Sizes.s15,
  padding: 25,

  // font sizes
  icon: Sizes.s60,
  badge: Sizes.s40,
  h1: 26,
  h2: 20,
  h3: 18,
  title: Sizes.h44,
  header: Sizes.h38,
  body: Sizes.h32,
  caption: 12,
  margin: 20,
  marginHoz: Sizes.s30,
  marginVer: Sizes.s20,
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

export const navigate = {
  color: colors.black3,
  colorIcon: Colors.black,
  sizeNo: Sizes.s50,
  height: Sizes.s90 + sizes.sizeTopBar,
  sizeIcon: Sizes.s60,
};
export const leftMenu = {
  color: colors.black3,
  colorLine: colors.black,
  sizeImage: Sizes.s260,
  paddingTop: Sizes.s60,
  sizeName: Sizes.h52,
  sizeMail: Sizes.h30,
  colorText: colors.white,
};
export const tabBar = {
  color: colors.black3,
  colorIcon: colors.black,
  colorIconTint: colors.yellow,
  sizeText: sizes.title,
  sizeIcon: Sizes.s60,
};

export const dialog = {
  color: colors.black3,
  colorTitle: colors.black,
  sizeTitle: sizes.title,
  sizeDes: sizes.body,
  colorButton: colors.yellow,
  colorTitleButton: colors.white,
  sizeTitleButton: sizes.title,
  marginHozButton: Sizes.s5,
  marginHoz: Sizes.s20,
  marginVer: Sizes.s20,
  borderRadius: Sizes.s20,
};
export {colors, sizes, fonts};
