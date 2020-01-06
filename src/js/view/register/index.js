import Register from './register';

export default {
    html: `
            <!-- 登录 -->
            <div id="register-box">
                <!-- 步骤条 -->
                <div class="step-box">
                    <div class="step">
                        <div class="count">1</div>
                        <div class="tips">验证手机号</div>
                    </div>
                    <div class="line"></div>
                    <div class="step">
                        <div class="count">2</div>
                        <div class="tips">填写用户信息</div>
                    </div>
                    <div class="line"></div>
                    <div class="step">
                        <div class="count">3</div>
                        <div class="tips">注册成功</div>
                    </div>
                </div>
                <form>
                    <div class="input-box">
                        <span class="label"><span class="required">*</span>经销商网络代码</span>
                        <input name="dealer" placeholder="请输入所属经销商在上汽大众的网络身份代码">
                    </div>
                    <div class="input-box">
                        <span class="label"><span class="required">*</span>对应经销商全称</span>
                        <input name="dealerName" disabled>
                    </div>
                    <div class="input-box">
                        <span class="label"><span class="required">*</span>用户姓名</span>
                        <input name="name" placeholder="请输入您的姓名">
                    </div>
                    <div class="input-box">
                        <span class="label"><span class="required">*</span>身份证号码</span>
                        <input name="IDcard" placeholder="请输入您的身份证号码">
                    </div>
                    <div class="check-tips">
                        <input type="checkbox" name="protocol">
                        <span>我已阅读并同意《用户条款》和《隐私政策》</span>
                    </div>
                    <div class="submit-btn">
                        立即注册
                    </div>
                </form>
                <div class="register-msg"></div>
            </div>
        `,
    init() {
        // 注册页面
        this.register = new Register(this);
    }
};