function loadWebFunction() {
    $.ajax({
        dataType: "json",
        headers: { 'Content-Type': 'application/json' },
        type: "GET",
        url: "/api",
        success: function (result) {
            if (result.success == 1) {
                if (result.userInfo != undefined && result.userInfo != null && result.userInfo != "") {
                    if (result.userInfo.roleId != '') {
                        $('#btn-menu-signup').hide();
                        $('#btn-menu-signin').hide();
                        $('#ul-user-info').show();
                        var admin = "";
                        if (result.userInfo.roleId == 1) {
                            admin = "<span style='color:red'>Đại ca<span>";
                            $('#btn-admin').show();
                        }
                        var innerUserInfo = "Xin chào: " + result.userInfo.fullname + " - " + admin;
                        $('#navbar-username').html(innerUserInfo);
                    } else {

                    }
                }
            }
        },
        error: function (result) {
            alert('error');
        }
    });
    $.ajax({
        dataType: "json",
        headers: { 'Content-Type': 'application/json' },
        type: "GET",
        url: "/item",
        success: function (result) {
            if (result.success == 1) {
                var html = "";
                for (var i = result.itemFound.length - 1; i >= 0; i--) {
                    html += "<div class='row'>" + `<div class='col-sm-7'><iframe width="100%" height="" src="`
                        + result.itemFound[i].itemLink
                        + `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
                        + "<div class='col-sm-5'>"
                        + "<a href='item/"
                        + result.itemFound[i].itemName
                        + "' style='color:black; font-weight:bold'>"
                        + "<p>"
                        + result.itemFound[i].itemName
                        + "</p>"
                        + "</a>"
                        + "<a href='item/"
                        + result.itemFound[i].itemName
                        + "' style='color:#7c00ff;'>"
                        + result.itemFound[i].author
                        + "</a>"
                        + "</div>" + "</div>"
                        + "<div class='clear'></div>"
                        ;
                }
                $('#list-item').html(html);
                var html2 = `<iframe width="100%" height="400px" src="` + result.itemFound[0].itemLink + `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    + "<div style='font-size:30px'>" + result.itemFound[0].itemName + "</div>"
                    ;
                $('#this-item').html(html2);
            }
        },
        error: function (result) {
            alert('error');
        }
    });
}

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) $(".lentop").fadeIn();
        else $(".lentop").fadeOut();
    });
    $(".lentop").click(function () {
        $("body,html").animate({ scrollTop: 0 }, "slow");
    });
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 40) {
    //         document.getElementById('navbar-fixed').style.top = "0";
    //         document.getElementById('navbar-fixed').style.position = "fixed";
    //     }else {
    //         document.getElementById('navbar-fixed').style.position = "relative";
    //     }
    // });
});