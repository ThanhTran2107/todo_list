export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = (key, defaultValue = undefined) => {
  let parsedValue = '';

  try {
    const value = localStorage.getItem(key);

    parsedValue = JSON.parse(value);
  } catch (e) {
    parsedValue = defaultValue;

    return parsedValue;
  }

  return parsedValue;
};

export const removeVietnameseTones = str =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
