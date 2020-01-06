export default {
    html: `
            <!-- 顶栏 -->
            <div class="top-bar"></div>
        `,
    init() {
        this.topBar = new TopBar(this);
    }
};

class TopBar {
    constructor(parent) {
        this.parent = parent;
        this.bar = $('.top-bar');
        this.menu = {
            'home': '首页',
            'logs': '访问日志',
            'selfcare': '自助服务'
        };
        this.createMenu();
    }

    createMenu(menu) {
        if (!menu) menu = this.menu;
        const keys = Object.keys(menu);
        keys.forEach((key) => {
            const label = menu[key];
            this.bar.append(`<div name="${key}" class="menu-item">${label}</div>`);
        });
    }

    dom(name) {
        return this.form.find(`input[name="${name}"]`);
    }
}
