var operators = [ 'typeof' ];

module.exports = function (chunk, context, bodies, params) {
  var body = bodies.block,
    skip = bodies['else'];

  if (params && params.test) {
    var str = params.test;

    if(/\w\(/.test(str)) return;

    str = str
      //.replace(/(^|\s|\()([a-zA-Z@.$_-]+)(\s|$|\))/g, function(match, p1, p2, p3) {
      .replace(/([a-zA-Z@.$_-]+)(\s|$|\))/g, function(match, p1, p2, p3) {
        //return operators.indexOf(p2) > -1 ? match : p1 + 'context.get(' + (p2 === '.' ? '[], true' : '"' + p2 + '"' ) + ')' + p3;
        return operators.indexOf(p1) > -1 ? match : 'context.get(' + (p1 === '.' ? '[], true' : '"' + p1 + '"' ) + ')' + p2;
      });

    var result = eval(str);

    if (result && body) {
      return chunk.render(bodies.block, context);
    }

    if (!result && skip) {
      return chunk.render(bodies['else'], context);
    }
  }

  return chunk;
};
