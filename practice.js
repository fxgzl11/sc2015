Number.prototype.plus = function ( num ) {
  return this + num;
};
Number.prototype.minus = function ( num ) {
  return this - num;
};
Number.prototype.kakeru = function ( num ) {
  return this * num;
};
Number.prototype.waru = function ( num ) {
  return this / num;
};

var number = 128;
var result = number.plus(2);
var result2 = number.minus(10);
var result3 = number.kakeru(2);
var result4 = number.waru(2);


console.log(result);
console.log(result2);
console.log(result3);
console.log(result4);