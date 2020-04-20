// Proxy实现数据监听 - 简单demo
function deepProxy(object, handler) {
	if (!isPureObject(object)) {
		for (let prop in object) {
			// 只有对象才需要监听
			if (typeof object[prop] === 'object') {
				if (!isPureObject(object[prop])) {
					deepProxy(object[prop], handler)
				}
				object[prop] = new Proxy(object[prop], handler)
			}
		}
	}
	return new Proxy(object, handler)
}


// 暂无兼容处理
function isPureObject(object) {
	if (typeof object !== 'object') {
		return false
	} else {
		for (let prop in object) {
			if (typeof object[prop] === 'object') {
				return false
			}
		}
	}
	return true
}

// 以下是测试代码

let object = {
    name: {
        first: {
            four: 5,
            second: {
                third: 'ssss'
            }
        }
    },
    class: 5,
    arr: [1, 2, {arr1:10}],
    age: {
        age1: 10
    }
}
//这是一个嵌套了对象和数组的数组
let objectArr = [{name:{first:'ss'}, arr1:[1,2]}, 2, 3, 4, 5, 6]


let handler = {
	get(target, property) {
		console.log('get:::', property)
		return Reflect.get(target, property)
	},
	set(target, property, value) {
		console.log('set:::', property, '=', value)
		return Reflect.set(target, property, value)
	}
}

object = deepProxy(object, handler)
console.log('object.name.first.four:::::', object.name.first.four)

objectArr = deepProxy(object, handler)
objectArr.length






