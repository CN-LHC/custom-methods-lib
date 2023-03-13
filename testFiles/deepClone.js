let { deepCopy } = require('../lib/index')

let obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: {
            f: 4,
            g: {
                h: 5
            }
        }
    }
}
console.log(deepCopy(obj))