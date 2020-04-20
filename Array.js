/**
	1.数组扁平化
*/

//(1)Array.flat ES10 Array.flat(n)是ES10扁平数组的api,n表示维度,n值为Infinity时维度为无限大
[1, 2, 3, [4, 5]].flat(1) 
[2, [3, 4, [5, 6]]].flat(Infinity)

// (2)递归
function flatten(arr) {
	while(arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr) // ...能将二维数组，变成一维数组
	}
	return arr
}


/**
	2.数组去重
*/

Array.prototype.distinct = function() {
	var obj = {}
	var result = []
	// for of 是ES6的新特性
	this.map(item => {
		if (!obj.hasOwnProperty(item)) {
			obj[item] = 1
			result.push(item)
		}
	})
	return result
}

/**
	3.排序
*/

var arr = [1, 23, 11, 9, 8]
arr.sort((a, b) => a - b) // 升序
arr.sort((a, b) => b - a) // 降序