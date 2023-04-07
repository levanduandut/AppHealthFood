import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const COLORS = {
  white:'#ffffff',
  black:'#000000',
  primary: '#46d49d',
  title: '#2c3522',
  red:'#ff0000',
  blue:'#2f00ff',
};

export const SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,

  width,
  height,

}
