function validateBtnSignUp() {
    if ($('#input-username-signup').val().length < 6 || $('#input-password-signup').val().length < 6 || $('#input-password-signup').val() != $('#re-input-password-signup').val()) {
        $("#btn-sign-up").prop("disabled", true);
    } else {
        $("#btn-sign-up").prop("disabled", false);
    }
}
function validateUsernameSignUp() {
    if ($('#input-username-signup').val().length < 6) {
        $('#input-username-status').html("Chưa đủ 6 ký tự!");
    } else {
        $('#input-username-status').html("OK!");
    }
    validateBtnSignUp();
}

function validatePasswordSignUp() {
    if ($('#input-password-signup').val().length < 6) {
        $('#input-password-status').html("Chưa đủ 6 ký tự!");
    } else {
        $('#input-password-status').html("OK!");
    }
    validateBtnSignUp();
}
function validateRepasswordSignUp() {
    if ($('#input-password-signup').val() != $('#re-input-password-signup').val()) {
        $('#re-input-password-status').html("Nhập lại mật khẩu không đúng!");
    } else {
        $('#re-input-password-status').html("OK!");
    }
    validateBtnSignUp();
}