module.exports = function dst(date) {
	var weekday = date.getUTCDay(),
		month = date.getUTCMonth() + 1,
		monthday = date.getUTCDate(),
		hour = date.getUTCHours();

	if(month === 3) {
		if(monthday > 24 && monthday + (7 - weekday) >= 31 && (weekday > 0 || hour >= 1))
			return true;

		return false;
	}

	if(month === 10) {
		if(monthday > 24 && monthday + (7 - weekday) >= 31 && (weekday > 0 || hour >= 1))
			return false;

		return true;
	}

	return month > 3 && month < 10;
};
