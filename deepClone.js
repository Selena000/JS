/**
	深拷贝
	@param source 原对象
	@return target 拷贝后的对象
	@todo 只能拷贝可枚举属性，且不能拷贝继承[[prototype]]属性
	其他拷贝方法：JSON.stringify JSON.parase
*/
function deepClone(source) {
	// 判断是数组还是对象：1.Array.isArray() 2.Object.prototype.toString.call(source) === '[object Object] / [object Array]'
	let targetObj = Array.isArray(source) ? [] : {}

	for (let key in source) { // for in 可枚举属性，且检查自身属性和原型链属性
		if (source.hasOwnProperty(key)) {// 检查对象，不检查原型链属性 不检查是否枚举
			if (source[key] && typeof source[key] === 'object') { // 值是对象 就递归
				targetObj[key] = deepClone(source[key])
			} else {
				targetObj[key] = source[key]
			}
		}
	}
	return targetObj
}