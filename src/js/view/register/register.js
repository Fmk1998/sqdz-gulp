class Register {
    constructor(parent) {
        this.parent = parent;
        this.form = $('#register-box > form');
        this.btn = $('#register-box .submit-btn');
        this.btn.on('click', () => this.submit());
        this.step(2);
        this.dom('dealer').on('blur', () => this.checkDealer());
    }

    dom(name) {
        return this.form.find(`input[name="${name}"]`);
    }

    step(c) {
        $('.step-box > .active').removeClass('active');
        const active = $('.step-box > .step').eq(c - 1);
        active.addClass('active').prevAll().addClass('active');
    }

    // 校验经销商key
    async checkDealer() {
        const dealer = this.dom('dealer').val();
        if (!dealer) return;
        this.dom('dealerName').val('');
        const {data, err} = await $get({url: '/rest/dealer/check?dealer=' + dealer});
        if (err) return $error(err);
        this.dom('dealerName').val(data.dealerName);
    }

    checkIDcard(val) {
        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var code = val.substring(17);
        if (p.test(val)) {
            var sum = 0;
            for (var i = 0; i < 17; i++) {
                sum += val[i] * factor[i];
            }
            if (parity[sum % 11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    async submit() {
        const dealer = this.dom('dealer').val();
        if (!dealer) return $error('请输入经销商网络代码');
        const dealerName = this.dom('dealerName').val();
        if (!dealerName) return $error('请输入正确的经销商代码');
        const name = this.dom('name').val();
        if (!name) return $error('请输入用户姓名');
        const identityCode = this.dom('IDcard').val();
        if (!identityCode) return $error('请输入身份证');
        if (!this.checkIDcard(identityCode)) return $error('输入的身份证号码无效');
        if (!this.dom('protocol')[0].checked) return $error('请阅读用户条款与隐私政策并且勾选同意后才可注册');
        const {data, err} = await $post({
            url: '/rest/user/register', data: {
                dealer,
                dealerName,
                name,
                identityCode,
                brand: $projcet,
                token: this.parent.getUrlParam('token')
            }
        });
        if (err) return $error(err);
        this.step(3);
        $('.register-msg').html(`注册成功，前往<span class="btn" onclick="location.href='${$host}'">登陆</span>`).show();
        this.form.hide();
    }
}

export default Register;