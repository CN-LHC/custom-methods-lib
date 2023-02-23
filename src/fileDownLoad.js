
// 下载文件
export function downLoadFile(downloadName, url) {
    const tag = document.createElement("a");
    // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
    tag.setAttribute("download", downloadName);
    tag.href = url
    tag.click();
}
// 图片base64下载
export function downLoadImg(downloadName, url, callback) {
    const tag = document.createElement("a");
    // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
    tag.setAttribute("download", downloadName);
    if (url.indexOf('data:image') !== -1) {
        tag.href = url
        tag.click();
        if (callback) {
        callback()
        }
    } else {
        const image = new Image();
        // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
        image.src = url + "?time=" + new Date().getTime();
        //重要，设置 crossOrigin 属性，否则图片跨域会报错
        image.setAttribute("crossOrigin", "Anonymous");
        // 图片未加载完成时操作会报错
        image.onload = () => {
            tag.href = getImageDataURL(image);
            tag.click();
            if (callback) {
                callback()
            }
        };
    }
}
// 将图片资源转化为base64
export function getImageDataURL(image) {
    // 创建画布
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    // 以图片为背景剪裁画布
    ctx.drawImage(image, 0, 0, image.width, image.height);
    // 获取图片后缀名
    const extension = image.src
        .substring(image.src.lastIndexOf(".") + 1)
        .toLowerCase();
    // 某些图片 url 可能没有后缀名，默认是 png
    return canvas.toDataURL("image/" + extension, 1);
}
// 将base64转换为文件对象
export function dataURLtoFile(dataurl) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    // blob
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // File
    let file = new File([u8arr], "file", { type: mime });
    return file;
}
/**
 * 压缩图片
 *@param img 被压缩的img对象
 * @param type 压缩后转换的文件类型
 * @param mx 触发压缩的图片最大宽度限制
 * @param mh 触发压缩的图片最大高度限制
 */
 export function compressImg(img, type, mx, mh) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const {
        width: originWidth,
        height: originHeight
      } = img;
      // 最大尺寸限制
      const maxWidth = mx;
      const maxHeight = mh;
      // 目标尺寸
      let targetWidth = originWidth;
      let targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > 1) {
          // 宽图片
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          // 高图片
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片绘制
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob(function (blob) {
        resolve(blob);
      }, type || "image/png");
    });
}
//绘制视频封面图片
export function getVideoCover({ url, time, success }) {
    const video1 = document.createElement("video");
    video1.src = url;
    video1.crossOrigin = "anonymous"; //处理跨域
    video1.style.cssText = "position:fixed; top:0; left:-100%; visibility:hidden";
    video1.onloadeddata = function() {
        // console.log(url,time,success);
        let currentTime = time; //截图时间点
        video1.addEventListener("timeupdate", function() {
        clipAndCompressCover({
            media: video1,
            currentWidth: video1.videoWidth,
            currentHeight: video1.videoHeight,
            success: function(base64) {
            video1.remove(video1);
            success({
                base64: base64
            });
            }
        });
        });
        video1.currentTime = currentTime < 0 ? 1 : currentTime;
    };
    // edge浏览器必须要追加到dom中，才能顺利执行相关事件。
    document.body.appendChild(video1);
}
//压缩图片
export function clipAndCompressCover({ media, currentWidth, currentHeight, success }) {
    const that = this;
    const canvas = document.createElement("canvas");
    const area = canvas.getContext("2d");
    const currentScale = currentWidth / currentHeight;
    const targetScale = 750 / 420;
    let targetWidth = 0;
    let targetHeight = 0;
    let quality = 0.95; // 不要用1，会额外增大base64大小。
  
    // 根据视频宽高，决定截图大小
    if (currentScale >= targetScale) {
      targetHeight = currentHeight > 420 ? 420 : currentHeight;
      targetWidth = targetHeight * currentScale;
    } else {
      targetWidth = currentWidth > 750 ? 750 : currentWidth;
      targetHeight = targetWidth / currentScale;
    }
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  
    area.drawImage(media, 0, 0, targetWidth, targetHeight);
    var handler = function() {
      const base64 = canvas.toDataURL("image/jpeg", quality);
      getMediaSize({ src: base64 }).then(response => {
        if (response.size / 1024 > 100) {
          quality -= 0.1;
  
          if (quality > 0.2) {
            handler();
          }
        } else {
          success && success(base64);
        }
      });
    };
    handler();
}
// 获取媒体资源的大小，返回一个Promise对象。用于解决无法直接获取视频或图片的文件大小。
export function getMediaSize({ src }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      // eslint-disable-next-line no-unused-vars
      xhr.onreadystatechange = _ => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve({
              size: xhr.response.size
            });
          } else {
            reject();
          }
        }
      };
  
      xhr.open("get", URL.createObjectURL(transformBase64ToBlob(src)));
      xhr.responseType = "blob";
      xhr.send();
    });
}
// base64转blob
export function transformBase64ToBlob(base64) {
    let byteString;

    if (base64.split(",")[0].indexOf("base64") >= 0) {
        byteString = window.atob(base64.split(",")[1]);
    } else {
        byteString = unescape(base64.split(",")[1]);
    }

    const mimeString = base64
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
    const ia = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], {
        type: mimeString
    });

    return blob;
}


/**
 * elementToCustom: dom对象
 * time: 视频时长
 * callback: 视频生成后的回调
 * 依赖于RecordRTC
 */
export function htmltoVideo(elementToCustom, time, callback) {
    // 判断elementToCustom是否是canvas
    if (elementToCustom?.captureStream) {
      let stream = elementToCustom.captureStream()
      let recorder = new MediaRecorder(stream, { mimeType: 'video/webm'});
      const data = []
      recorder.ondataavailable = function(event) {
          if (event.data && event.data.size) {
              data.push(event.data);
          }
      }
      recorder.onstop = function() {
          var blob = new Blob(data, {
              type: "video/webm"
          });
          downLoadFile(generateUUID(), URL.createObjectURL(blob))
      }
      recorder.start()
      setTimeout(() => {
          recorder.stop();
          if (callback) {
            callback()
          }
      }, 5000);
    } else {
      let canvas2d = document.createElement('canvas')
      let context = canvas2d.getContext('2d');
      canvas2d.width = elementToCustom.clientWidth;
      canvas2d.height = elementToCustom.clientHeight;
      let isStoppedRecording = false;
      (function looper() {
          html2canvas(elementToCustom).then(function(canvas) {
              context.clearRect(0, 0, canvas2d.width, canvas2d.height);
              context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);
              if(isStoppedRecording) {
                  return;
              }
              requestAnimationFrame(looper);
          });
      })();
  
      let recorder = new RecordRTC(canvas2d, {
          type: 'canvas'
      });
      recorder.startRecording();
      // 录制时间
      setTimeout(() => {
          recorder.stopRecording(function() {
              isStoppedRecording = true;
              let blob = recorder.getBlob();
              downLoadFile(generateUUID(), URL.createObjectURL(blob))
          });
          if (callback) {
            callback()
          }
      }, time);
    }
  }
  /**
 * elementToCustom: dom对象
 * time: gif时长
 * callback: gif生成后的回调
 * 依赖于gif.js gif.worker.js
 */
export async function htmltoGif(elementToCustom, time, callback) {
let canvas2d = document.createElement('canvas')
    let context = canvas2d.getContext('2d');
    canvas2d.width = elementToCustom.clientWidth;
    canvas2d.height = elementToCustom.clientHeight;
    let isStoppedRecording = false;
    let gif = new GIF({
    quality: 10, // gif 清晰度，越低越清晰
    workerScript: '/gif.worker.js',
    debug: true, // 开启调试模式
    });
    (function looper() {
        html2canvas(elementToCustom).then(function(canvas) {
            context.clearRect(0, 0, canvas2d.width, canvas2d.height);
            context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);
            if(isStoppedRecording) {
                return;
            }
            // 将canvas节点追加到gif帧中，delay 是每一帧的时间间隔
            let image = new Image();
            image.src = canvas2d.toDataURL("image/png");
            image.onload = () => {
            gif.addFrame(image, {delay: 100});
            }
            requestAnimationFrame(looper);
        });
    })();
    // 监听渲染完毕，并输出 gif 地址
    gif.on('finished', function(blob) {
    const url = URL.createObjectURL(blob);
    downLoadFile(generateUUID(), url)
    if (callback) {
        callback()
    }
    });
    setTimeout(() => {
    isStoppedRecording = true;
    // 将每一帧渲染成一张完成的gif
    gif.render();
    }, time);
}
  /**
   * 裁剪图片
 * ele: dom对象
 * imgName: 生成的图片名称
 * 依赖于html2canvas
 */
export function cutLive(ele, imgName='未命名') {
    return new Promise((resove, reject) => {
      html2canvas(ele).then((canvas) => {
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.onload = () => {
            const width = 486
            const height = 414
            const new_canvas = document.createElement("canvas");
            new_canvas.width = width;
            new_canvas.height = height;
            const ctx = new_canvas.getContext("2d");
            // 将html2canvas生成的图片裁剪部分区域
            ctx.drawImage(image, 56, 40, width, height, 0, 0, width, height);
            new_canvas.toBlob((blob) => {
                // 获取File类型的图片资源
                let file = new File([blob], `${imgName}.png`)
                resove(file)
            })
        };
        image.onerror = () => {
            reject('图片加载失败')
        };
    })
    })
}