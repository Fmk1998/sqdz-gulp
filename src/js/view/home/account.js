export default {
    html: `
            <!-- 账号 -->
            <div class="dialog account-edit">
                <div class="form-box">
                    <div class="dialog-label"></div>
                    <div class="form-list"></div>
                    <div class="form-buttons">
                        <div class="form-button submit" style="width: 60px">
                            下一步
                        </div>
                    </div>
                </div>
            </div>
        `,
    init() {
        this.account = new Account(this);
    }
};

class Account {
    constructor(parent) {
        this.parent = parent;
        this.dialog = $('.account-edit.dialog');
        this.label = $('.dialog-label');
        this.formBox = $('.form-box');
        this.form = $('.form-list');
        this.btn = this.dialog.find('.form-button');
        this.btn.on('click', () => this.submit());
    }

    edit(app, account) {
        this.app = app;
        const label = app.name.length > 28 ? app.name.slice(0, 25) + '...' : app.name;
        this.label.html(`添加应用账号<span class="sub" title="${label}"> (${label})</span>`);
        const html = `
            ${this.createItem('应用账号:', 'account')}
            ${this.createItem('应用密码:', 'password')}
        `;
        this.form.html(html);
        this.formBox.css({
            left: (this.dialog.width() - this.formBox.width()) / 2,
            top: (this.dialog.height() - this.formBox.height()) / 3
        });
        this.dialog.show();
        if (account)
            Object.keys(account).forEach((key) => {
                if (!account[key]) return true;
                this.setItem(key, account[key]);
            });
    }

    createItem(label, key) {
        return `
            <div class="form-item" key="${key}">
                <span class="form-label">${label}</span>
                <input>
            </div>
        `;
    }

    getItem(key) {
        return this.form.find(`.form-item[key="${key}"] input`).val();
    }

    setItem(key, val) {
        return this.form.find(`.form-item[key="${key}"] input`).val(val);
    }

    getForm() {
        let data = {};
        this.form.find(`.form-item`).each(function () {
            const key = $(this).attr('key');
            data[key] = $(this).find('input').val();
        });
        return data;
    }

    async submit() {
        const formData = this.getForm();
        const {err, data} = await $post({
            url: '/rest/account/temp',
            data: {
                resKey: this.app.key,
                account: formData
            }
        });
        if (err) return $error(err);
        this.dialog.hide();
        window.open(data.url);
    }
}