


$(document).ready(function () {
    $("#btn-signout").click(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            headers: { 'Content-Type': 'application/json' },
            type: "DELETE",
            url: "/auth/logout",
            success: function (result) {
                if(result.success ==1){
                    alert("Đăng xuất thành công!");
                    window.location.href="";
                }
            },
            error: function (result) {
                alert('error');
            }
        });
    });
});