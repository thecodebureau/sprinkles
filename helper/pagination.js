module.exports = function(chunk, context) {
	var pages = [],
		count = context.get('totalCount'),
		query = context.get('query') || {},
		page = +query.page || 0,
		//page = +_.last(query.match(/(^|&)page=(\d+)/)) || 0,
		perPage = +query.limit || context.get('perPage'),
		//perPage = +_.last(query.match(/(^|&)limit=(\d+)/)) || context.get('perPage'),
		search = '',
		number = 0,
		end = perPage && count / perPage;

	// remove page and empty params
	//query = _.filter(query.split('&'), function(str) {
	//	return str.indexOf('page=') && _.last(str) != '=';
	//}).join('&');
	
	query = _.toPairs(_.omit(query, 'page')).map(function(arr) {
		return arr.map(encodeURIComponent).join('=');
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
		firstIndex: Math.min(page * perPage + 1, count),// min is for when totalCount is 0
		lastIndex: Math.min((page + 1) * perPage, count),// min is for last (not full) page
		pages: pages,
		prev: _.extend(pages[page - 1], { rel: 'prev' }),
		next: _.extend(pages[page + 1], { rel: 'next' }),
	};
};
