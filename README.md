# sprinkles

Dust filters and helpers.

Sprinkles has been built so developers only require the helpers and filters they actually need in a specific project. A file
that exports filters and helpers might look like so:

```
module.exports = {
	helpers: {
		contains: function(chunk, context, bodies, params) {
			return _.contains(params.array, params.value) ? chunk.render(bodies.block, context) : chunk;
		},
		pagination: require('sprinkles/helper/pagination'),
		if: require('sprinkles/helper/if')
	},
	
	filters: _.extend({
		lc: function(value) {
			return _.isString(value) ? value.toLowerCase() : value;
		},
		title: function(page) {
			return _.compact(['EnergyManagement', page && page.title]).join(' - ');
		}
	}, require('sprinkles/filters/date'))
};
```

## Dates

Can be used both in templates and free standing functions.

### TZ 

The `date-tz`/`dtz` filters require the date to have been transformed
with the TZ utilities.

If the date has not already been transformed with the timezone utility,
an empty timezone array using the systems own timezoneOffset will be created

```
date.tz = [ '', '', offset ];
```

#### Using the TZ util without filters

```
function twoDigits(val) {
	return val >= 10 ? val : '0' + val;
}

function datetimeString(date) {
	return dateString(date) + ' ' + timeString(date) + ' (' + date.tz[0] + ')';
}

function dateString(date) {
	return [
		date.getUTCFullYear(),
		date.getUTCMonth() + 1,
		date.getUTCDate()
	].map(twoDigits).join('-');
}

function timeString(date) {
	return [
		date.getUTCHours(),
		date.getUTCMinutes()
	].map(twoDigits).join(':');
}
var tz = require('sprinkles/util/tz');

var tzSweden = tz.factory('Europe/Stockholm');

var date, tzDate;
// Node.js timezone: Europe/Stockholm

// Standard Time
date = new Date(2016, 0, 1, 16, 20);

console.log(date.toString());// Fri Jan 01 2016 16:20:00 GMT+0100 (CET)
console.log(date.toISOString());// 2016-01-01T15:20:00.000Z

tzDate = tzSweden(date);

console.log(tzDate.toString());// Fri Jan 01 2016 17:20:00 GMT+0100 (CET)
console.log(tzDate.toISOString());// 2016-01-01T16:20:00.000Z

console.log(datetimeString(tzDate));// 2016-01-01 16:20 (CET)

console.log(tzDate.tz);// [ 'CET', 'GMT+1', 60 ]

// Summer Time
date = new Date(2016, 3, 20, 16, 20);

console.log(date.toString());// Wed Apr 20 2016 16:20:00 GMT+0200 (CEST)
console.log(date.toISOString());// 2016-04-20T14:20:00.000Z

tzDate = tzSweden(date);

console.log(tzDate.toString());// Wed Apr 20 2016 18:20:00 GMT+0200 (CEST)
console.log(tzDate.toISOString());// 2016-04-20T16:20:00.000Z

console.log(datetimeString(tzDate));// 2016-04-20 16:20 (CEST)

console.log(tzDate.tz);// [ 'CEST', 'GMT+2', 120 ]
next();
```
