/* */ 
var arrayMap = require('./arrayMap'),
    baseIteratee = require('./baseIteratee'),
    baseMap = require('./baseMap'),
    baseSortBy = require('./baseSortBy'),
    compareMultiple = require('./compareMultiple');
function baseOrderBy(collection, iteratees, orders) {
  var index = -1,
      toIteratee = baseIteratee;
  iteratees = arrayMap(iteratees.length ? iteratees : Array(1), function(iteratee) {
    return toIteratee(iteratee);
  });
  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return {
      'criteria': criteria,
      'index': ++index,
      'value': value
    };
  });
  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}
module.exports = baseOrderBy;
