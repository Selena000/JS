class MPromise {
  // 构造器
  constructor(executor){

  	this.state = 'pending'
  	this.value = undefined
  	this.reason = undefined

  	this.onResolvedCallbacks = []
  	this.onRejectedCallbacks = []

  	let resolve = value => {
  		if (this.state === 'pending') {
  			this.state = 'fulfilled'
  			this.value = value
  			this.onResolvedCallbacks.forEach(fn => fn)
  		}
  	}

  	let reject = reason => {
  		if (this.state === 'pending') {
  			this.state = 'rejected'
  			this.reason = reason
  			this.onRejectedCallbacks.forEach(fn => fn)
  		}
  	}

  	try {
  		executor(resolve, reject)
  	} catch (err) {
  		reject(err)
  	}
  }

  then(onFulfilled, onRejected) {
  	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  	onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

  	let promise2 = new MPromise((resolve, reject) => {
  		if (this.state === 'fulfilled') {
	  		setTimout(() => {
	  			try {
	  				let x = onFulfilled(this.value)
	  				resolvePromise(promise2, x, resolve, reject)
	  			} catch (e) {
	  				reject(e)
	  			}
	  		}, 0)
	  	}
	  	if (this.state === 'rejected') {
	  		setTimout(() => {
	  			try {
	  				let x = onRejected(this.reason)
	  				resolvePromise(promise2, x, resolve, reject)
	  			} catch (e) {
	  				reject(e)
	  			}
	  		}, 0)
	  	}

	  	if (this.state === 'pending') {
	  		this.onResolvedCallbacks.push(() => {
	  			setTimout(() => {
	  				try {
	  					let x = onFulfilled(this.value)
	  					resolvePromise(promise2, x, resolve, reject)
	  				} catch (e) {
	  					reject(e)
	  				}
	  			}, 0)
	  			
	  		})

	  		this.onRejectedCallbacks.push(() => {
	  			setTimout(() => {
	  				try {
			  			let x = onRejectedCallbacks(this.reason)
			  			resolvePromise(promise2, x, resolve, reject)
	  				} catch(e) {
	  					reject(e)
	  				}
	  			}, 0)

	  		})
	  	}

  	})
  	return promise2
  }

  resolve(val) {
  	return new MPromise((resolve, reject) => {
  		resolve(val)
  	})
  }

  reject(reason) {
  	return new MPromise((resolve, reject) => {
  		reject(reason)
  	})
  }

  race(promises) {
  	return new MPromise((resolve, reject) => {
  		for (let i = 0; i < promises.length; i++) {
  			promises[i].then(resolve, reject)
  		}
  	})
  } 

  all(promises) {
  	let arr = []
  	let i = 0

  	function proccessData(index, data) {
    	arr[index] = data
    	i ++;
    	if (i === promises.length) {
    		resolve(arr)
    	}
  	}

  	return new MPromise((resolve, reject) => {
  		for (let i = 0; i < promises.length; i++) {
  			promises[i].then(data => {
  				proccessData(i, data)
  			}, reject)
  		}
  	})
  }
}

function resolvePromise(promise2, x, resolve, reject) {
	if (x === promise2) {
		return reject(new TypeError('Chaining cycle detected for promise'))
	}

	let called

	if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			let then = x.then
			if (typeof then === 'function') {
				then.call(x, y => {
					if (called) {
						return
					}
					called = true
					resolvePromise(promise2, y, resolve, reject)
				}, err => {
					if (called) {
						return
					}
					called = true
					reject(err)
				})
			} else {
				resolve(x)
			}
		} catch (e) {
			if (called) {
				return
			}
			called = true
			reject(e)
		}
	} else {
		resolve(x)
	}
}

// 测试库：promises-aplus-tests promise.js
Promise.defer = MPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise





























