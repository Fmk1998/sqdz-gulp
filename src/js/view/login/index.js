import SMS from '../../lib/sms';
import Vcode from '../../lib/vcode';
import Login from './login';

export default {
    html: `
        <div class="login-box">
            <!-- 广告页 -->
            <div id="banner-box">
                <div class="banner-img"></div>
            </div>
            <!-- 登录 -->
            <div id="login-box">
                <form>
                    <div class="title">
                        统一身份认证登录
                    </div>
                    <div class="input-box phone">
                        <input name="phone" class="phone-val" placeholder="请输入手机号">
                    </div>
                    <div class="input-box vcode">
                        <input name="vcode" class="vcode-val" placeholder="请输入图片验证码">
                        <span class="right-box">
                            <img style="display: none">
                        </span>
                    </div>
                    <div class="input-box sms">
                        <input name="smscode" class="sms-val" placeholder="请输入验证码">
                        <span class="right-box">
                            <div class="sms-btn"></div>
                        </span>
                    </div>
                    <div class="check-tips">
                        <input type="checkbox" name="protocol">
                        <span>我已阅读并同意《用户条款》和《隐私政策》</span>
                    </div>
                    <div class="submit-btn">
                        登录
                    </div>
                </form>
            </div>
        </div>
        `,
    init() {
        // 初始化图形码
        this.vcode = new Vcode(this);
        // 初始化短信验证码
        this.sms = new SMS(this);
        // 初始化登录
        this.login = new Login(this);
    }
};