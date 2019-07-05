import React, { Component } from 'react';


export default class extends Component {
    validateUsernameSignIn() {
        if (document.getElementById("input-username-signin").value.length < 6) {
            document.getElementById("input-username-status-in").innerHTML = "Chưa đủ 6 ký tự!";
            document.getElementById("input-username-status-in").style.color = "red";
        } else {
            document.getElementById("input-username-status-in").innerHTML = "ok!";
            document.getElementById("input-username-status-in").style.color = "green";
        }
        if (document.getElementById("input-password-signin").value.length < 6 || document.getElementById("input-username-signin").value.length < 6) {
            document.getElementById('btn-sign-in').disabled = "true";
        } else {
            document.getElementById('btn-sign-in').disabled = "false";
        }
    }

    validatePasswordSignIn() {
        if (document.getElementById("input-password-signin").value.length < 6) {
            document.getElementById("input-password-status-in").innerHTML = "Chưa đủ 6 ký tự!";
            document.getElementById("input-password-status-in").style.color = "red";
        } else {
            document.getElementById("input-password-status-in").innerHTML = "ok!";
            document.getElementById("input-password-status-in").style.color = "green";
        }
        if (document.getElementById("input-password-signin").value.length < 6 || document.getElementById("input-username-signin").value.length < 6) {
            document.getElementById('btn-sign-in').disabled = "true";
        } else {
            document.getElementById('btn-sign-in').disabled = "false";
        }
    }

    render() {
        return (
            <div id="signInForm" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Đăng nhập</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Tên đăng nhập:</label> <span id="input-username-status-in">*</span>
                                <input type="text" className="form-control" id="input-username-signin"
                                    onKeyUp={this.validateUsernameSignIn}></input>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu:</label> <span id="input-password-status-in">*</span>
                                <input type="password" className="form-control" id="input-password-signin"
                                    onKeyUp={this.validatePasswordSignIn}></input>
                                <button type="button" className="btn btn-default" id="btn-sign-in" disabled>Đăng nhập</button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}