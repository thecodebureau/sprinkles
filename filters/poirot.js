// lower case
function lc(value, context) {
	return value.toLowerCase();
}

// lower case
function uc(value) {
	return value.toUpperCase();
}

// pascal case
function pc(value) {
	return typeof value === 'string' ? value.toPascalCase() : null;
}

// camelcase
function cc(value) {
	return typeof value === 'string' ? value.toCamelCase() : null;
}

// spinalcase
function sc(value) {
	return typeof value === 'string' ? value.toSpinalCase() : null;
}

// space case
function Sc(value) {
	return typeof value === 'string' ? value.toSpaceCase() : null;
}

function SC(value) {
	return typeof value === 'string' ? value.toSpaceCase(true) : null;
}

module.exports = {
	cc: cc,
	lc: lc,
	pc: pc,
	sc: sc,
	Sc: Sc,
	SC: SC,
	uc: uc
};
