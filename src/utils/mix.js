export function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
}
