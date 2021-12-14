// Object.prototype.toString.call(num),  // '[object Number]'
// Object.prototype.toString.call(str),  // '[object String]'
// Object.prototype.toString.call(bool),  // '[object Boolean]'
// Object.prototype.toString.call(arr),  // '[object Array]'
// Object.prototype.toString.call(obj),  // '[object Object]'
// Object.prototype.toString.call(func),  // '[object Function]'
// Object.prototype.toString.call(und),  // '[object Undefined]'
// Object.prototype.toString.call(nul),  // '[object Null]'
// Object.prototype.toString.call(date),  // '[object Date]'
// Object.prototype.toString.call(reg),  // '[object RegExp]'
// Object.prototype.toString.call(error)  // '[object Error]'

export enum PARAM_TYPE {
  Number = '[object Number]',
  String = '[object String]',
  Boolean = '[object Boolean]',
  Array = '[object Array]',
  Object = '[object Object]',
  Function = '[object Function]',
  Undefined = '[object Undefined]',
  Null = '[object Null]',
  Date = '[object Date]',
  RegExp = '[object RegExp]',
  Error = '[object Error]',
}