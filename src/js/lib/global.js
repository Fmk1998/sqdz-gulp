window.$host = location.protocol + '//' + location.host;
window.$context = 'esc-selfcare';

window.$get = async function (ops) {
    if (!/^http/.test(ops.url)) ops.url = $origin + ops.url;
    return sendAjax(ops);
};

window.$post = async function (ops) {
    if (!/^http/.test(ops.url)) ops.url = $origin + ops.url;
    ops.type = 'post';
    return sendAjax(ops);
};

function sendAjax(ops) {
    return new Promise((resolve) => {
        ops.dataType = 'json';
        ops.contentType = 'application/json; charset=utf-8';
        if (typeof ops.data === 'object')
            ops.data = JSON.stringify(ops.data);
        ops.xhrFields = {
            withCredentials: true
        };
        $.ajax({
            ...ops,
            success: function (result, status, xhr) {
                resolve({data: result});
            },
            error: function (xhr, status, error) {
                resolve({err: JSON.parse(xhr.responseText)});
            }
        });
    });
}

window.$msg = function (message) {
    showMsg(message);
};

window.$error = function (err) {
    if (typeof err === 'object' && err.type !== 'NODE_GATEWAY_ERROR') return;
    const message = typeof err === 'string' ? err : $errorFormat(err);
    showMsg(message, 'error');
};

let msgTimeout;

function showMsg(message, type) {
    if (msgTimeout) clearTimeout(msgTimeout);
    const box = $('#msg-box');
    box.removeClass('error');
    const title = $('#msg-box .title');
    const tips = $('#msg-box .tips');
    switch (type) {
        case 'error':
            title.text('错误');
            box.addClass('error');
            break;
        default:
            title.text('提示');
    }
    tips.text(message);
    box.show(300);
    msgTimeout = setTimeout(() => box.hide(300), 3000);
}

window.$errorFormat = function (err) {
    if (err.type === 'NODE_GATEWAY_ERROR') {
        return err.message;
    }
    return '';
};