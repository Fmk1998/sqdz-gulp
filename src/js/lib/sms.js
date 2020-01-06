class SMS {
    constructor(parent) {
        this.parent = parent;
        this.input = $('.sms-val');
        this.dom = $('.sms-btn');
        this.dom.html('获取验证码');
        this.dom.on('click', () => this.send());
    }

    async send() {
        const phone = this.parent.phone.val();
        const vcode = this.parent.vcode.input.val();
        if (!phone) return $error('请输入手机号');
        if (!vcode) return $error('请输入图形验证码');
        const {data, err} = await $post({
            url: '/rest/sms/send',
            data: {
                vcode,
                phone
            }
        });
        console.log(data, err);
        if (err) return $error(err);
        $msg('验证码已发送成功,请注意查收!');
        return;
    }
}

export default SMS;