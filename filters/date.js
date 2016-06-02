'use strict';

var defaultLanguage = ((typeof document !== 'undefined' ? document.documentElement.lang : process.env.NODE_LANG) || 'en').split('-')[0].toLowerCase();

function twoDigits(val) {
  return val >= 10 ? val : '0' + val;
}

function d_datetime_long(date, locale) {
  return _.compact([
    locale.days[date.getDay()].slice(0, 3),
    date.getDate(),
    locale.months[date.getMonth()],
    date.getFullYear(),
    [ date.getHours(),
      date.getMinutes()
    ].map(twoDigits).join(':'),
    date.tz && date.tz[0]
  ]).join(' ');
}

function d_datetime(date) {
  return d_date(date) + ' ' + d_time(date);
}

function d_datetime_tz(date) {
  return d_datetime(date) + (date.tz[0] ? ' ' + date.tz[0] : '');
}

function d_date(date) {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map(twoDigits).join('-');
}

function d_time(date) {
  return [
    date.getHours(),
    date.getMinutes()
  ].map(twoDigits).join(':');
}

function d_time_tz(date) {
  return d_time(date) + (date.tz[0] ? ' ' + date.tz[0] : '');
}

function d_day(date) {
  return date.getDate();
}

function d_day_short(date, locale) {
  return locale.days[date.getDay()].slice(0, 3);
}

function d_day_long(date, locale) {
  return locale.days[date.getDay()];
}

function d_month(date) {
  return date.getMonth() + 1;
}

function d_month_two_digit(date) {
  return twoDigits(date.getMonth() + 1);
}

function d_month_short(date, locale) {
  return locale.months[date.getMonth()].slice(0, 3);
}

function d_month_long(date, locale) {
  return locale.months[date.getMonth()];
}

function d_year(date) {
  return date.getFullYear();
}

function factory(fnc) {
  return function (date, context) {
    var locale = require('../util/locales')[context && context.get('lang') || defaultLanguage];

    if (!_.isDate(date)) date = new Date(date);

    return fnc(date, locale);
  };
}

module.exports = {
  d_date: factory(d_date),
  d_datetime: factory(d_datetime),
  d_datetime_tz: factory(d_datetime_tz),
  d_datetime_long: factory(d_datetime_long),
  d_day: factory(d_day),
  d_day_long: factory(d_day_long),
  d_day_short: factory(d_day_short),
  d_month: factory(d_month),
  d_month_two_digit: factory(d_month_two_digit),
  d_month_long: factory(d_month_long),
  d_month_short: factory(d_month_short),
  d_year: factory(d_year),
  d_time: factory(d_time),
  d_time_tz: factory(d_time_tz)
};
