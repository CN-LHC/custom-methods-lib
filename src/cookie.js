/*添加cookie*/
export function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
/*获取cookie*/
export function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
/*删除cookie*/
export function delCookie(name, path, domain, secure) {
    if (getCookie(name)) {
        var expires = new Date();
        expires.setTime(expires.getTime() + -10 * 1000);
        domain = domain ? domain : "";
        path = path ? path : "/";
        var newCookie =
        escape(name) +
        "=" +
        escape("") +
        (expires ? "; expires=" + expires.toGMTString() : "") +
        "; path=" +
        path +
        (domain ? "; domain=" + domain : "") +
        (secure ? "; secure" : "");
        document.cookie = newCookie;
    }
}

// 删除所有的cookie
export function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; ) document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }