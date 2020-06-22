const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(executor) {
    this._status = PENDING
    this._value = undefined
    this._resolvedQueue = []
    this._rejectedQueue = []

    const _resolve = val => {
      const run = () => {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val

        while (this._resolvedQueue.length) {
          const callback = this._resolvedQueue.shift()
          callback(val)
        }
      }

      setTimeout(run)
    }
    const _reject = val => {
      const run = () => {
        if (this._status !== PENDING) return
        this._status = REJECTED
        this._value = val

        while (this._rejectedQueue.length) {
          const callback = this._rejectedQueue.shift()
          callback(val)
        }
      }

      setTimeout(run)
    }

    executor(_resolve, _reject)
  }

  then(resolveFn, rejectFn) {
    // 先判断传入的参数是否是函数
    typeof resolveFn !== 'function' ? (resolveFn = v => v) : null
    typeof rejectFn !== 'function'
      ? (rejectFn = reason => {
          throw new Error(reason instanceof Error ? reason.message : reason)
        })
      : null

    return new MyPromise((resolve, reject) => {
      const resolvedFn = val => {
        try {
          let v = resolveFn(val)
          v instanceof MyPromise ? v.then(resolve, reject) : resolve(v)
        } catch (error) {
          reject(error)
        }
      }

      const rejectedFn = val => {
        try {
          let v = rejectFn(val)
          v instanceof MyPromise ? v.then(resolve, reject) : resolve(v)
        } catch (error) {
          reject(error)
        }
      }

      switch (this._status) {
        case PENDING:
          this._resolvedQueue.push(resolvedFn)
          this._rejectedQueue.push(rejectedFn)
          break
        case FULFILLED:
          resolvedFn(this._value)
          break
        case REJECTED:
          rejectedFn(this._value)
          break
      }
    })
  }

  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  finally(callback) {
    return this.then(
      val => MyPromise.resolve(callback()).then(() => val),
      reason =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }

  static all(promiseAll) {
    return new MyPromise((resolve, reject) => {
      let index = 0
      const result = []

      promiseAll.forEach((p, i) => {
        MyPromise.resolve(p).then(
          res => {
            result[i] = res
            index++

            if (index === promiseAll.length) {
              resolve(result)
            }
          },
          err => {
            reject(err)
          }
        )
      })
    })
  }

  static race(promiseAll) {
    return new MyPromise((resolve, reject) => {
      for (let p of promiseAll) {
        MyPromise.resolve(p).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }
}

const p1 = new MyPromise((resolve, reject) => {
  resolve(1) //同步executor测试
})

p1.then(res => {
  console.log(res)
  return 2 //链式调用测试
})
  .then() //值穿透测试
  .then(res => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
      resolve(3) //返回Promise测试
    })
  })
  .finally(() => {
    console.log('finally')
  })
  .then(res => {
    console.log(res)
    throw new Error('reject测试') //reject测试
  })
  .catch(err => {
    console.log('catch', err)
  })
  .then(
    () => {},
    err => {
      console.log(err)
    }
  )
