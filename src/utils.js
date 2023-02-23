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