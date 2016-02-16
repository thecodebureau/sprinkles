var timeZones = {
	'UTC': {
		standard: [ 'UTC', 'UTC', 0 ]
	},

	'Europe/Copenhagen': {
		saving: [ 'CEST', 'GMT+2',	120 ],
		standard: [ 'CET', 'GMT+1', 60 ]
	},

	'Europe/London': {
		saving: [ 'BST', 'GMT+1', 60 ],
		standard: [ 'GMT', 'GMT', 0 ]
	}
};

var sames = {
	'Europe/Copenhagen': [ 'Europe/Stockholm' ]
};

_.each(sames, function(arr, key) {
	arr.forEach(function(tz) {
		timeZones[tz] = timeZones[key];
	});
});

module.exports = timeZones;
