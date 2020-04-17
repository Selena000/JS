/**
	bind原理：
		1.返回了一个新函数
		2.将this（传入的参数）关键字绑定到该函数
		3.参数合并，将bind函数的参数与原来的函数参数合并作为参数传给创建的新的函数
		4.返回该函数
*/

if (!Function.prototype.bind) {
  // 这里名字要改下
  Function.prototype._bind = function() {
    var _arguments = Array.prototype.slice.call(arguments)
    var _target = _arguments.shift()
    var _this = this

    var fn = function() {
      var _args = Array.prototype.slice.call(arguments)
      var obj = this instanceof fn ? this : target // 解决new的问题
      _this.apply(obj, _arguments.concat(_args))
    }
    fn.prototype = Object.create(this.prototype)
    return fn
  }
}


// 测试
function A(a,b){
  this.a = a
  this.b = b
}
var c = {x: 10}
var a = A._bind(c, 1)
var b = new a(2) 

console.log(b) // {a: 1, b: 2}