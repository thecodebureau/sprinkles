module.exports = function(str) {
  var summaryLength = 255;

  if(str.charAt(0) !== '<')
    if(str.length > 255)
      return str.substring(0,255) + '...';
    else
      return str;

  return str.split(/<.*?>(?=$|[a-zA-Z])/).reduce(function(out, val, index, arr) {
    if(!val || summaryLength < 1) return out;

    out += '<p>' + val.substring(0, summaryLength);

    summaryLength -= val.length;

    if(summaryLength < 0 || summaryLength === 0 && index < arr.length - 1)
      out += "...";

    return out + '</p>';
  }, '');
};
