const REG_HEX = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i;

/*
 * hex字符串解析，十六进制转为RGB
 * accepts: #333 #accded (without # is also fine)
 * not accept yet: rgb(), rgba()
 */
export function hex2Rgb(str){
    if(typeof str === 'string' && REG_HEX.test(str) ){
        str = str.replace('#', '');
        let arr;
        if(str.length === 3){
            arr = str.split('').map(c => (c+c));
        }
        else if(str.length === 6){
            arr = str.match(/[a-zA-Z0-9]{2}/g);
        }
        else{
            throw new Error('wrong color format');
        }
        return arr.map((c) => parseInt(c, 16));
    }
    throw new Error('color should be string');
}
/*
 * rgb字符串解析，RGB转为十六进制
 * accepts: rgb(), rgba() (without # is also fine)
 * not accept yet: #333 #accded
 */
export function rgb2Hex(rgb) {
    if (/^rgb\((\d{1,3}\,){2}\d{1,3}\)$/i.test(rgb)) { //test RGB
        var hex = '#'; //定义十六进制颜色变量
        rgb.replace(/\d{1,3}/g, function(kw) { //提取rgb数字
            kw = parseInt(kw).toString(16); //转为十六进制
            kw = kw.length < 2 ? 0 + kw : kw; //判断位数，保证两位
            hex += kw; //拼接
        });
        return hex; //返回十六进制
    } else {
        console.log(`Input ${rgb} is wrong!`);
        return '#000'; //输入格式错误,返回#000
    }
}

// 生成十六进制随机颜色
export function randomHexColor() { //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
    }
    return '#' + hex; //返回‘#’开头16进制颜色
}

// 生成RGB格式随机颜色
export function randomRgbColor() { //随机生成RGB颜色
    var r = Math.floor(Math.random() * 256); //随机生成256以内r值
    var g = Math.floor(Math.random() * 256); //随机生成256以内g值
    var b = Math.floor(Math.random() * 256); //随机生成256以内b值
    return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
}

// 生成RGBA格式随机颜色
export function randomRgbaColor() { //随机生成RGBA颜色
    var r = Math.floor(Math.random() * 256); //随机生成256以内r值
    var g = Math.floor(Math.random() * 256); //随机生成256以内g值
    var b = Math.floor(Math.random() * 256); //随机生成256以内b值
    var alpha = Math.random(); //随机生成1以内a值
    return `rgb(${r},${g},${b},${alpha})`; //返回rgba(r,g,b,a)格式颜色
}

/*
 * rgb value to hsl 色相(H)、饱和度(S)、明度(L)
 */
function rgbToHsl(rgbStr){
    let [r, g, b] = hex2Rgb(rgbStr);
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

/*
 * 判断颜色属于深色还是浅色
 */
export function isColorDarkOrLight(rgbStr){
    let [h, s, l] = rgbToHsl(rgbStr);
    return (l > 0.5)? 'light' : 'dark';
}

