module.exports = function(chunk, context) {
	var pages = [],
		count = context.get('totalCount'),
		query = context.get('query') || '',
		page = +_.last(query.match(/(^|&)page=(\d+)/)) || 0,
		perPage = +_.last(query.match(/(^|&)limit=(\d+)/)) || context.get('perPage'),
		search = '',
		number = 0,
		end = perPage && count/perPage;

	// remove page and empty params
	query = _.filter(query.split('&'), function(str) {
		return str.indexOf('page=') && _.last(str) != '=';
	}).join('&');

	if (query) {
		search = '?' + query;
		query += '&';
	}

	while (number < end) {
		number++;
		pages.push({ search: search, number: number });
		search = '?' + query + 'page=' + number;
	}

	if (page < pages.length)
		pages[page].current = true;

	return {
		firstIndex: page * perPage + 1,
		lastIndex: Math.min((page + 1) * perPage, count),
		pages: pages,
		prev: _.extend(pages[page - 1], { rel: 'prev' }),
		next: _.extend(pages[page + 1], { rel: 'next' }),
	};
};
