/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-24 14:06:47 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-24 14:33:06
 * 测试发布订阅对象pubSub
 */

let { pubSub } = require('../lib/index')
let fun1 = (value) => {
    console.log(value)
}
let fun2 = (value) => {
    console.log(value)
}
// 添加订阅
pubSub.on('eventName', fun1)
pubSub.on('eventName', fun2)

// 删除订阅
pubSub.off('eventName', fun2)

// 发布订阅
pubSub.emit('eventName', '测试发布订阅')

// 添加一次订阅
pubSub.once('eventOnce', (value) => {
    console.log(value)
})

pubSub.emit('eventOnce', '测试发布订阅once1')
pubSub.emit('eventOnce', '测试发布订阅once2')