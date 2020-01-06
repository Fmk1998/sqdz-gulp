class Vcode {
    constructor(parent) {
        this.parent = parent;
        this.input = $('.vcode-val');
        this.dom = $('.input-box.vcode .right-box');
        this.img = this.dom.find('img');
        this.img.on('click', () => this.image());
        this.image();
    }

    image() {
        this.img.attr('src', `${this.parent.origin}/rest/captcha/image?_=${Math.random()}`).show();
    }
}

export default Vcode;