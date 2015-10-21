var dsts = {
	2014: [ '03-30', '10-26' ],
	2015: [ '03-29', '10-25' ],
	2016: [ '03-27', '10-30' ],
	2017: [ '03-24', '10-29' ],
	2018: [ '03-25', '10-28' ],
	2019: [ '03-31', '10-27' ],
	2020: [ '03-29', '10-25' ]
};

module.exports = (_.mapObject || _.mapValues)(dsts, function(dates, year) {
	return dates.map(function(date) {
		return new Date(year + '-' + date + 'T01:00:00.000Z');
	});
});
