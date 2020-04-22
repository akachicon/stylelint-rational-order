const path = require('path');

const BORDER_IN_BOX_MODEL = 'borderInBoxModel';
const PRIORITY = 'priority';

// eslint-disable-next-line import/no-dynamic-require, global-require
const group = (name) => require(path.join(__dirname, './groups', name));

const positioning = group('positioning');
const boxModel = group('box-model');
const typography = group('typography');
const visual = group('visual');
const animation = group('animation');
const misc = group('misc');

const getDefaultOptions = () => ({
  [BORDER_IN_BOX_MODEL]: false,
  [PRIORITY]: 0,
});

module.exports = (generalOptions, specificOptions) => {
  const options = { ...getDefaultOptions(), ...generalOptions };
  const borderInBoxModel = options[BORDER_IN_BOX_MODEL];

  delete options[BORDER_IN_BOX_MODEL];

  return [
    ['positioning', positioning],
    ['boxModel', boxModel({ insertBorderProps: borderInBoxModel })],
    ['typography', typography],
    ['visual', visual({ insertBorderProps: !borderInBoxModel })],
    ['animation', animation],
    ['misc', misc],
  ].map(
    ([groupName, properties]) => ({
      ...options,
      ...(specificOptions ? specificOptions[groupName] : []),
      groupName,
      properties,
    }),
  ).sort(
    (a, b) => b[PRIORITY] - a[PRIORITY],
  ).map(
    // eslint-disable-next-line no-shadow
    (group) => {
      // eslint-disable-next-line no-param-reassign
      delete group[PRIORITY];
      return group;
    },
  );
};
