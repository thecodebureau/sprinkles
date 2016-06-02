function pascalCase(value) {
  return _.upperFirst(_.camelCase(value));
}

module.exports = {
  camelCase: _.camelCase,
  cc: _.camelCase,

  pascalCase: pascalCase,
  pc: pascalCase,

  kebabCase: _.kebabCase,
  kc: _.kebabCase,

  lowerCase: _.lowerCase,
  lc: _.lowerCase,

  upperCase: _.upperCase,
  uc: _.upperCase,

  snakeCase: _.snakeCase,
  sc: _.snakeCase,

  startsCase: _.startsCase,
  Sc: _.startsCase,
};
