class Login {
    constructor(parent) {
        this.parent = parent;
        this.form = $('#login-box > form');
        this.btn = $('#login-box .submit-btn');
        this.btn.on('click', () => this.login());
    }

    dom(name) {
        return this.form.find(`input[name="${name}"]`);
    }

    async login() {
        const phone = this.dom('phone').val();
        if (!phone) return $error('请输入手机号');
        const vcode = this.dom('vcode').val();
        if (!vcode) return $error('请输入验证码');
        const smscode = this.dom('smscode').val();
        if (!smscode) return $error('请输入短信验证码');
        const protocol = this.dom('protocol')[0].checked;
        if (!protocol) return $error('请阅读用户条款与隐私政策并且勾选同意后才可登录');
        console.log('login');
        const {data, err} = await $post({
            url: '/rest/user/login',
            data: {
                phone,
                vcode,
                smscode
            }
        });
        if (err) return $error(err);
        if (data.type === 'login')
            location.search = 'router=home';
        if (data.type === 'register')
            location.search = `router=register&token=${data.token}`;
    }
}

export default Login;