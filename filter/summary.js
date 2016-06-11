'use strict';

module.exports = function (str, context) {
  var summaryLength = 255;

  if (str.length < 255)
    return str;

  var _id = context.get('_id');

  return str.split(/<.*?>(?=$|[a-zA-Z])/).reduce(function (out, val, index, arr) {
    if (!val || summaryLength < 1) return out;


    out += '<p>' + val.substring(0, summaryLength);

    summaryLength -= val.length;

    if (summaryLength < 0 || summaryLength === 0 && index < arr.length - 1)
      out += '...';

    return out + '</p>';
  }, '') + '<a href="/nyheter/' + _id + '">Läs hela</a>';
};
