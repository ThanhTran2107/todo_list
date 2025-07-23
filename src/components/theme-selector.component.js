import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { some } from 'lodash-es';
import { useState } from 'react';
import styled from 'styled-components';

import {
  ATTRIBUTE_DATA,
  LOCALSTORAGE_KEYS,
  THEME_MODES,
  THEME_OPTIONS,
  THEME_OPTIONS_HASH,
} from '../utilities/constant';
import { getLocalStorage, setLocalStorage } from '../utilities/services/common';

const { LIGHT, DARK } = THEME_MODES;
const { THEME } = LOCALSTORAGE_KEYS;
const { DATA_THEME } = ATTRIBUTE_DATA;

const ThemeButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.1rem;
  margin: 0.5rem;
`;

export const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const currentTheme = getLocalStorage(THEME);

    const response = some(THEME_OPTIONS, data => data.mode === currentTheme) ? currentTheme : LIGHT;
    document.documentElement.setAttribute(DATA_THEME, response);

    return response;
  });

  const handleToggleTheme = () => {
    const newTheme = currentTheme === LIGHT ? DARK : LIGHT;

    document.documentElement.setAttribute(DATA_THEME, newTheme);
    setLocalStorage(THEME, newTheme);
    setCurrentTheme(newTheme);
  };

  return <ThemeButton key={currentTheme} icon={THEME_OPTIONS_HASH[currentTheme].icon} onClick={handleToggleTheme} />;
};
