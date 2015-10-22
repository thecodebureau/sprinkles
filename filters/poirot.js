var poirot = require('poirot');

function lowerCase(value, context) {
	return typeof value === 'string' ? value.toLowerCase() : null;
}

function upperCase(value) {
	return typeof value === 'string' ? value.toUpperCase() : null;
}

module.exports = {
	camelCase: poirot.camelCase,
	cc: poirot.camelCase,
	pascalCase: poirot.pascalCase,
	pc: poirot.pascalCase,

	kebabCase: poirot.spinalCase,
	kc: poirot.spinalCase,
	spinalCase: poirot.spinalCase,
	sc: poirot.spinalCase,

	lowerCase: lowerCase,
	lc: lowerCase,
	upperCase: upperCase,
	uc: upperCase,

	spaceCase: poirot.spaceCase,
	Sc: poirot.spaceCase,
	capitalSpace: poirot.capitalSpaceCase,
	cSc: poirot.capitalSpaceCase
};
