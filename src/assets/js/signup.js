document.getElementById("submit").addEventListener("click", async () => {
    // Lấy dữ liệu từ form
    const name = document.getElementById("username").value;
    const tel = document.getElementById("tele").value;
    const mail = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const pass2 = document.getElementById("pass2").value;
    const req ={name,pass,mail,tel};
    if (pass !== pass2) {
        alert("Confirm password and password must match");
    } else {
        // Gửi yêu cầu POST tới server bằng Fetch API
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        });
        console.log(response);
        const rs = await response.json();
        if (rs.message == "User registered successfully") {
            // Nếu đăng nhập thành công, chuyển hướng tới trang home
            window.location.href = "/login";
        } else {
            // Nếu không thành công, hiển thị thông báo lỗi
            alert(rs.error);
            document.getElementById("username").value = '';
            document.getElementById("password").value = '';
            document.getElementById("tele").value = '';
            document.getElementById("email").value = '';
            document.getElementById("pass2").value = '';
        }
    }
});
