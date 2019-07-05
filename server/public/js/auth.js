function register() {
    var json = {
        username: $('#register-input-username').val(),
        password: $('#register-input-password').val()
    }
    $.ajax({
        url: "user/create",
        type: "post",
        dataType: "json",
        data: json,
        success: function (result) {
            if (result.success == 1) {
                window.alert("Tạo tài khoản thành công!");
            } else {
                window.alert("Tạo tài khoản thất bại!");
            }
        }
    });
}

function login() {
    var json = {
        username: $('#login-input-username').val(),
        password: $('#login-input-password').val()
    }
    $.ajax({
        url: "auth/login",
        type: "post",
        dataType: "json",
        data: json,
        success: function (result) {
            if (result.success == 1) {
                window.alert("Tạo tài khoản thành công!");
            } else {
                window.alert("Tạo tài khoản thất bại!");
            }
        }
    });
}