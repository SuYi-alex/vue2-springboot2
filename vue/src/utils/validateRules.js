export function validateTelephone(rule, value, callback) {
    const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (value === '') {
        callback(new Error('手机号不能为空'));
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'));
    } else {
        callback();
    }
    rules: {
        acceptUrl: [{ validator: validateTelephone, trigger: ['blur', 'change'] }];
    }
}