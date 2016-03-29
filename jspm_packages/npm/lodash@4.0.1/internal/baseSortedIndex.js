/* */ 
var baseSortedIndexBy = require('./baseSortedIndexBy'),
    identity = require('../identity');
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array ? array.length : low;
  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = (low + high) >>> 1,
          computed = array[mid];
      if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy(array, value, identity, retHighest);
}
module.exports = baseSortedIndex;
