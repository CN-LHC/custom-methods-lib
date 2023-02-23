/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-23 11:01:29 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 11:05:08
 * AES加密 编码base64|hex 模式ECB 填充Pkcs7 密钥 偏移量
 * 值word 密钥key 偏移量iv
 * 在线加密解密地址https://www.mklab.cn/utils/aes
 */

import CryptoJS from 'crypto-js'

//Base64解密方法
export function Base64Decrypt(word, key, iv) {
    let key_Utf8 = CryptoJS.enc.Utf8.parse(key||'')
    let iv_Utf8 = CryptoJS.enc.Utf8.parse(iv || '')
    let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key_Utf8, { iv: iv_Utf8, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//Base64加密方法
export function Base64Encrypt(word, key, iv) {
    let key_Utf8 = CryptoJS.enc.Utf8.parse(key||'')
    let iv_Utf8 = CryptoJS.enc.Utf8.parse(iv || '')
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key_Utf8, { iv: iv_Utf8, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

//Hex解密方法
export function HexDecrypt(word, key, iv) {
    let key_Utf8 = CryptoJS.enc.Utf8.parse(key||'')
    let iv_Utf8 = CryptoJS.enc.Utf8.parse(iv || '')
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word); 解hex编码
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key_Utf8, { iv: iv_Utf8, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//Hex加密方法
export function HexEncrypt(word, key, iv) {
    let key_Utf8 = CryptoJS.enc.Utf8.parse(key||'')
    let iv_Utf8 = CryptoJS.enc.Utf8.parse(iv || '')
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key_Utf8, { iv: iv_Utf8, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString()
}
