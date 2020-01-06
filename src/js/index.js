import './lib/jquery-1.9.1.min.js';
import './lib/global.js';

/* 路由 */
const router = {
    login: require('./view/login'),
    register: require('./view/register'),
    home: require('./view/home')
};

class Main {
    constructor(origin) {
        window.$origin = this.origin = origin;
        this.initPage();
        this.phone = $('.phone-val');
    }

    initPage() {
        const type = this.getUrlParam('router') || 'login';
        let page = router[type] || router['login'];
        page = page.default;
        $('#container').html(page.html);
        if (page.init) page.init.call(this);
    }

    getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
}

window.onload = () => new Main(`${$host}/${$context}`);
console.log('v 0.0.1');
