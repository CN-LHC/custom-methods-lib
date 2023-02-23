/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-23 11:05:19 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 14:08:29
 * 导出方法，通过script commonjs esmodule 方式引入
 */
// AES加密解密
import { Base64Decrypt, Base64Encrypt, HexDecrypt, HexEncrypt } from './secret'
// 颜色相关
import { hex2Rgb, rgb2Hex, randomHexColor, randomRgbColor, randomRgbaColor, isColorDarkOrLight } from './colorDetector'
// cookie相关
import { setCookie, getCookie, delCookie, clearAllCookie } from './cookie'
// 文件相关
import { downLoadFile, downLoadImg, getImageDataURL, dataURLtoFile, compressImg, getVideoCover } from './fileDownLoad'
// 通用
import { copyText, sleep, debounce, toPercent, GET_URL_PARAMS } from './utils'
export default {
    Base64Decrypt, Base64Encrypt, HexDecrypt, HexEncrypt,
    hex2Rgb, rgb2Hex, randomHexColor, randomRgbColor, randomRgbaColor, isColorDarkOrLight,
    setCookie, getCookie, delCookie, clearAllCookie,
    downLoadFile, downLoadImg, getImageDataURL, dataURLtoFile, compressImg, getVideoCover,
    copyText, sleep, debounce, toPercent, GET_URL_PARAMS
}