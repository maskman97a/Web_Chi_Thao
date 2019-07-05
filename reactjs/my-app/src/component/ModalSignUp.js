import React, { Component } from 'react';

export default class extends Component {
    state = {
        fullname:'',
        username: '',
        password: '',
        repassword:''
    }

    handleSubmit() {
        // this.state;
    }
    render() {
        return (
            <div id="signUpForm" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Đăng ký</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Họ và tên:</label>
                                <input type="text" className="form-control" name="fullname" id="input-fullname-signup"></input>
                            </div>
                            <div className="form-group">
                                <label>Tên đăng nhập:</label> <span id="input-username-status">*</span>
                                <input type="text" className="form-control" name="username" id="input-username-signup"
                                    onKeyUp={this.validateUsernameSignUp} ></input>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu:</label> <span id="input-password-status">*</span>
                                <input type="password" className="form-control" name="password" id="input-password-signup"
                                    onKeyUp={this.validatePasswordSignUp} ></input>
                            </div>
                            <div className="form-group">
                                <label>Nhập lại mật khẩu:</label><span id="re-input-password-status">*</span>
                                <input type="password" className="form-control" name="repassword" id="re-input-password-signup"
                                    onKeyUp={this.validateRepasswordSignUp}></input>
                            </div>
                            <button type="button" onClick={this.handleSubmit} className="btn btn-default" id="btn-sign-up" disabled>Đăng ký</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    validateUsernameSignUp() {
        if (document.getElementById('input-username-signup').value.length < 6) {
            document.getElementById('input-username-status').innerHTML = "Chưa đủ 6 ký tự!";
        } else {
            document.getElementById('input-username-status').innerHTML = "OK!";
        }
        if (document.getElementById('input-username-signup').value.length < 6 || document.getElementById('input-password-signup').value.length < 6 || document.getElementById('input-password-signup').value !== document.getElementById('re-input-password-signup').value) {
            document.getElementById("btn-sign-up").disabled = "true";
        } else {
            document.getElementById("btn-sign-up").disabled = "false";
        }
    }

    validatePasswordSignUp() {
        if (document.getElementById('input-password-signup').value.length < 6) {
            document.getElementById('input-password-status').innerHTML = "Chưa đủ 6 ký tự!";
        } else {
            document.getElementById('input-password-status').innerHTML = "OK!";
        }
        if (document.getElementById('input-username-signup').value.length < 6 || document.getElementById('input-password-signup').value.length < 6 || document.getElementById('input-password-signup').value !== document.getElementById('re-input-password-signup').value) {
            document.getElementById("btn-sign-up").disabled = "true";
        } else {
            document.getElementById("btn-sign-up").disabled = "false";
        }
    }
    validateRepasswordSignUp() {
        if (document.getElementById('input-password-signup').value !== document.getElementById('re-input-password-signup').value) {
            document.getElementById('re-input-password-status').innerHTML = "Nhập lại mật khẩu không đúng!";
        } else {
            document.getElementById('re-input-password-status').innerHTML = "OK!";
        }
        if (document.getElementById('input-username-signup').value.length < 6 || document.getElementById('input-password-signup').value.length < 6 || document.getElementById('input-password-signup').value !== document.getElementById('re-input-password-signup').value) {
            document.getElementById("btn-sign-up").disabled = "true";
        } else {
            document.getElementById("btn-sign-up").disabled = "false";
        }
    }
}