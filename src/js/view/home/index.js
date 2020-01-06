import topBar from './topbar';
import Account from './account';
import App from './app';

export default {
    html: `
            <!-- 首页 -->
         <div class="home-box">
            <div class="app-box">
               <div class="app-list"></div>
            </div>
            <div class="news-box">
               news
            </div>
        </div>
        `,
    init() {
        $('#top').append(topBar.html);
        topBar.init.call(this);
        this.home = new Home(this);
    }
};

class Home {
    constructor(parent) {
        this.parent = parent;
        this.app = new App(this);
        $('.home-box').append(Account.html);
        Account.init.call(this);
        this.init();
    }

    async init() {
        this.appList = $('.app-list');
        await this.getApp();
        this.appList.on('click', e => this.clickApp(e));
    }

    async getApp() {
        const apps = await this.app.list();
        this.appMap = {};
        this.appList.html('');
        apps.forEach((app) => {
            this.appMap[app.key] = app;
            this.appList.append(this.app.item(app));
        });
    }

    async clickApp(e) {
        const item = $(e.target).closest('.app-item');
        if (item.length === 0) return;
        const resKey = item.attr('key');
        const {err, data} = await $get({url: '/rest/app/account?resKey=' + resKey});
        if (err) {
            if (err.code === 401) return window.open(this.appMap[resKey].url);
            return $error(err);
        }
        if (data.hasAccount) {
            // 有账号
            window.open(data.url);
        } else {
            // 无账号
            this.account.edit(this.appMap[resKey]);
        }
    }
}
