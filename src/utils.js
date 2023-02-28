// 文本复制
export function copyText(value) {
    return new Promise((resolve) => {
      var input = document.createElement("input"); // js创建一个input输入框
      input.value = value; // 将需要复制的文本赋值到创建的input输入框中
      document.body.appendChild(input); // 将输入框暂时创建到实例里面
      input.select(); // 选中输入框中的内容
      document.execCommand("Copy"); // 执行复制操作
      document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
      resolve();
    });
}
  /*异步等待一段时间*/
export function sleep(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, seconds);
    });
}
/*
 * fn [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */
export function debounce(fn, delay) {
    console.log(fn, delay);
    let timer = null; //借助闭包
    return function() {
      if (timer) {
        clearTimeout(timer); //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
        timer = setTimeout(fn, delay);
      } else {
        timer = setTimeout(fn, delay); // 进入该分支说明当前并没有在计时，那么就开始一个计时
      }
    };
}
// 小数转化为百分比
export function toPercent(point, num = 2) {
    var str = Number(point * 100).toFixed(num);
    str += "%";
    return str;
}
// 解析url
// refers: https://www.sitepoint.com/get-url-parameters-with-javascript/
export function GET_URL_PARAMS(url) {
    const d = decodeURIComponent;
    let queryString = url ? url.split("?")[1] : window.location.search.slice(1);
    const obj = {};
    if (queryString) {
        queryString = queryString.split("#")[0]; // eslint-disable-line
        const arr = queryString.split("&");
        for (let i = 0; i < arr.length; i += 1) {
        const a = arr[i].split("=");
        let paramNum;
        const paramName = a[0].replace(/\[\d*\]/, v => {
            paramNum = v.slice(1, -1);
            return "";
        });
        const paramValue = typeof a[1] === "undefined" ? true : a[1];
        if (obj[paramName]) {
            if (typeof obj[paramName] === "string") {
            obj[paramName] = d([obj[paramName]]);
            }
            if (typeof paramNum === "undefined") {
            obj[paramName].push(d(paramValue));
            } else {
            obj[paramName][paramNum] = d(paramValue);
            }
        } else {
            obj[paramName] = d(paramValue);
        }
        }
    }
    return obj;
}

// 通过MessageChannel的方式实现
export function deepClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel
    port1.postMessage(obj)
    port2.onmessage((e) => {
      resolve(e.data)
    })
  })
}
// 传统方式实现
// 1、检查要复制的对象是否为 null 或非对象类型，如果是，直接返回该值。如果不是，继续执行下一步。
// 2、创建一个新的对象或数组，用于存储复制后的值。如果原始对象是数组，创建一个新数组，否则创建一个新对象。
// 3、遍历原始对象的所有属性，包括可枚举和不可枚举属性。对于每个属性，执行以下步骤：
//    a. 检查该属性是否是对象或数组。如果是，递归地调用深拷贝函数，将该属性的值复制到新的对象或数组中。
//    b. 如果不是对象或数组，直接将该属性的值复制到新的对象或数组中。
// 4、返回新的对象或数组，完成深拷贝操作。

// 返回新的对象或数组，完成深拷贝操作。
export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // 使用 hasOwnProperty 方法来判断属性是否为对象本身的属性，而不是原型链上的属性
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  // 由于copy是引用类型，就算return发生在递归结束之前，最后获取到的结果也会是最终值
  return copy;
}