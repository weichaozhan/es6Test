/**
 * @description Promise
 */
class newPromise {
  /**
   * @description 构造函数
   * @param {Function} executor function(resolve,reject){} 
   */
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined

    // 回调函数记录
    this.callbacksResolve = []
    this.callbacksReject = []

    let resolve = (data) => {
      if (this.status === 'pending') {
        this.status = 'resolve'
        this.value = data
        // 执行回调
        this.callbacksResolve.forEach(fun => {
          fun()
        })
      }
    }

    let reject = (data) => {
      if (this.status === 'pending') {
        this.status = 'reject'
        this.reason = data
        this.callbacksReject.forEach(fn => fun())
      }
    }

    try {
      executor(resolve, reject)
    } catch(err) {
      reject()
    }
  }

  then(onFufilled,onRejected) {
    if (this.status === 'pending') {
      this.callbacksResolve.push(() => {
        onFufilled(this.value)
      })
      this.callbacksReject.push(() => {
        onRejected(this.reason)
      })
    }
    if (this.status === 'resolve') {
      onFufilled(this.value)
    }
    if (this.status === 'reject') {
      onRejected(this.reason)
    }
  }
}

const a = new newPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('newPromise')
  }, 5000)
})

a.then((res) => {
  console.log(res)
})