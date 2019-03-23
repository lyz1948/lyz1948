function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);    
    window.location.href = "iPhone.html";
} else if (/(Android)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);   
    window.location.href = "Android.html";
} else {
    window.location.href = "pc.html";
};


var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信   
            qq: u.match(/\sQQ/i) == " qq" //是否QQ  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
    browser.versions.iPhone || browser.versions.iPad) {
    window.location = "http://m.zhaizhainv.com";
}


var os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();

f(os.isAndroid || os.isPhone) {

    alert("-----");

}


if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    if (window.location.href.indexOf("?mobile") < 0) {
        try {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                window.location.href = "手机页面";
            } else if (/iPad/i.test(navigator.userAgent)) {
                window.location.href = "平板页面";
            } else {
                window.location.href = "其他移动端页面"
            }
        } catch (e) {}
    }
}

//平台、设备和操作系统    
var system = {
    win: false,
    mac: false,
    xll: false
};
//检测平台    
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//跳转语句，如果是手机访问就自动跳转到caibaojian.com页面    
if (system.win || system.mac || system.xll) {} else {
    window.location.href = "http://caibaojian.com";
}


function is_mobile() {
    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    var u = navigator.userAgent;
    if (null == u) {
        return true;
    }
    var result = regex_match.exec(u);

    if (null == result) {
        return false
    } else {
        return true
    }
}
if (is_mobile()) {
    document.location.href = 'http://caibaojian.com'; //修改http://caibaojian.com为你所需跳转目标页地址  
}


(function() {
    var res = GetRequest();
    var par = res['index'];
    if (par != 'gfan') {
        var ua = navigator.userAgent.toLowerCase();
        var contains = function(a, b) {
            if (a.indexOf(b) != -1) { return true; }
        };
        //将下面的http://caibaojian.com改成你的wap手机版页面地址 如我的 http://caibaojian.com  
        var toMobileVertion = function() {
            window.location.href = 'http://caibaojian.com/'
        }

        if (contains(ua, "ipad") || (contains(ua, "rv:1.2.3.4")) || (contains(ua, "0.0.0.0")) || (contains(ua, "8.0.552.237"))) { return false }
        if ((contains(ua, "android") && contains(ua, "mobile")) || (contains(ua, "android") && contains(ua, "mozilla")) || (contains(ua, "android") && contains(ua, "opera")) ||
            contains(ua, "ucweb7") || contains(ua, "iphone")) { toMobileVertion(); }
    }
})();

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}