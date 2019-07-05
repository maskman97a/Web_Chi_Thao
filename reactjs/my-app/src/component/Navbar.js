import React, { Component } from 'react';
import ModelSignUp from './ModalSignUp';
import ModalSignIn from './ModalSignIn';

export default class extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse " id="navbar-fixed">
                    <div className="container-fluid"
                    >
                        <div className="navbar-header">
                            <a className="navbar-brand" href={"/"}>MrProfessor.vn</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href={"/"}>Trang chủ</a></li>
                            <li><a href="/admin" id="btn-admin" hidden>ADMIN</a></li>
                            <li><a href="">Page 2</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="ul-navbar">
                            <li><a href={""} data-toggle="modal" data-target="#signUpForm" id="btn-menu-signup"><span
                                className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href={""} data-toggle="modal" data-target="#signInForm" id="btn-menu-signin"><span
                                className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="ul-user-info" hidden>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <span id="navbar-username"></span>
                                    <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Sửa thông tin</a></li>
                                    <li><a href="#">Đổi mật khẩu</a></li>
                                    <li><a href="" id="btn-signout">Đăng xuất</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ModalSignIn />
                <ModelSignUp />
            </div>
        );
    }
}