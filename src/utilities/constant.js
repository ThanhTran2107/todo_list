import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { keyBy } from 'lodash-es';

export const CUSTOM_NOTIFICATION = Object.freeze({
  pauseOnHover: false,
  duration: 1,
  closeIcon: false,
});

export const LOCALSTORAGE_KEYS = Object.freeze({
  TODO_LIST: 'todoList',
  ORIGINAL_LIST: 'originalList',
  THEME: 'theme',
});

export const ATTRIBUTE_DATA = Object.freeze({
  DATA_THEME: 'data-theme',
});

export const THEME_MODES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

export const THEME_OPTIONS = [
  { mode: THEME_MODES.LIGHT, icon: faSun },
  { mode: THEME_MODES.DARK, icon: faMoon },
];

export const THEME_OPTIONS_HASH = keyBy(THEME_OPTIONS, 'mode');

export const MODAL_TITLES = Object.freeze({
  DELETE_A_TASK: 'Are you sure you want to delete this task?',
  DELETE_ALL_TASKS: 'Are you sure you want to delete all tasks?',
});

export const COLORS = Object.freeze({
  //NEUTRAL COLORS
  BLACK: '#000000',
  WHITE: '#FFFFFF',

  //BLUE COLORS
  BRIGHT_BLUE: '#1677ff',
  BLUE: '#4096ff',
  BLUE_GREEN: '#249995',

  //GRAY COLORS
  FOG_GRAY: '#726f6f75',
  DARK_GRAY: '#3b3b3b',
  LIGHT_GRAY: '#e6e6e6',
  MEDIUM_GRAY: '#666',

  //PINK COLORS
  DARK_PINK: '#70114b',
  DEEP_PINK: '#ca077e',

  //RED COLORS
  RED: 'red',

  //GREEN COLORS
  GREEN: 'green',
  BRIGHT_GREEN: '#47e247',

  //YELLOW COLORS
  CYBER_YELLOW: '#ffd809',

  //SHADE COLOR
  BLACK_55: 'rgb(0 0 0 / 55%)',
  GRAY_55: '#7f7f7f55',
});
