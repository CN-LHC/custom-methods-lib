# custom-methods-lib

**AES加密解密方法**

| 方法名        | 参数详情                                                   | 描述                                                          |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Base64Decrypt | word（加密内容）, key（密钥）, iv（偏移量）                | 通过编码方式为base64、模式为ECB、填充为Pkcs7的方式进行RES加密 |
| Base64Encrypt | word（Base64Decrypt加密后结果）, key（密钥）, iv（偏移量） | 通过编码方式为base64、模式为ECB、填充为Pkcs7的方式进行RES解密 |
| HexDecrypt    | word（加密内容）, key（密钥）, iv（偏移量）                | 通过编码方式为Hex、模式为ECB、填充为Pkcs7的方式进行RES加密    |
| HexEncrypt    | word（HexDecrypt加密后结果）, key（密钥）, iv（偏移量）    | 通过编码方式为Hex、模式为ECB、填充为Pkcs7的方式进行RES解密    |

**颜色相关方法**

| 方法名             | 参数详情              | 描述                                         |
| ------------------ | --------------------- | -------------------------------------------- |
| hex2Rgb            | str（16进制颜色编码） | hex字符串解析，十六进制转为RGB               |
| rgb2Hex            | str（rgb, rgba）      | rgb字符串解析，RGB转为十六进制               |
| randomHexColor     | 无                    | 生成十六进制随机颜色                         |
| randomRgbColor     | 无                    | 生成Rgb随机颜色                              |
| randomRgbaColor    | 无                    | 生成Rgba随机颜色                             |
| rgbToHsl           | rgbStr（rgb)          | rgb value to hsl 色相(H)、饱和度(S)、明度(L) |
| isColorDarkOrLight | rgbStr（rgb)          | 判断颜色属于深色还是浅色，根据明度(L)判断    |

**cookie相关方法**

| 方法名         | 参数详情                                                                     | 描述           |
| -------------- | ---------------------------------------------------------------------------- | -------------- |
| setCookie      | cname（名称）,cvalue（值）,exdays（过期天数）                                | 设置cookie     |
| getCookie      | cname（名称）                                                                | 添加cookie     |
| delCookie      | name（名称）, path（路径，可选）, domain（域名，可选）, secure（安全，可选） | 删除cookie     |
| clearAllCookie | 无                                                                           | 删除所以cookie |

**文件相关方法**

| 方法名          | 参数详情                                                                                                                 | 描述                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| downLoadFile    | downloadName(文件名), url（地址、DataURL）                                                                               | 下载文件                                |
| downLoadImg     | downloadName(文件名), url（地址、DataURL）, callback（下载成功后的回调）                                                 | 会将图片文件或地址资源转化为DataURL下载 |
| getImageDataURL | image(通过new Image加载得到的图片资源)                                                                                   | 将图片资源转化为DataURL（base64）       |
| dataURLtoFile   | dataurl                                                                                                                  | 将DataURL转换为文件对象                 |
| compressImg     | img（被压缩的img对象）, type（压缩后转换的文件类型）, mx（触发压缩的图片最大宽度限制）, mh（触发压缩的图片最大高度限制） | 压缩图片                                |
| getVideoCover   | url（地址、DataURL）, time(截取时间点，可选), success（回调，可选）                                                      | 绘制视频时间节点图片                    |

**未分类方法**

| 方法名         | 参数详情                                                           | 描述             |
| -------------- | ------------------------------------------------------------------ | ---------------- |
| copyText       | value（文本内容）                                                  | 复制文字         |
| sleep          | seconds（毫秒）                                                    | 异步等待一段时间 |
| debounce       | fn（需要防抖的函数）, delay（毫秒，防抖期限值）                    | 防抖             |
| toPercent      | point（小数）, num（默认值为2，保留两位小数）                      | 数转化为百分比   |
| GET_URL_PARAMS | url地址（https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD&rsv_spt=1） | 解析url          |
|                |                                                                    |                  |

**订阅发布对象pubSub，包含以下方法**

| 方法名 | 参数详情                                           | 描述     |
| ------ | -------------------------------------------------- | -------- |
| on     | event（订阅标识）, fn（订阅执行方法）              | 订阅     |
| once   | event（订阅标识）, fn（订阅执行方法）              | 订阅一次 |
| off    | event（订阅标识）, fn（该方法应与订阅方法相等）    | 取消订阅 |
| emit   | event（订阅标识），arguments（由订阅执行方法接收） | 发布     |
