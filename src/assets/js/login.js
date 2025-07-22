document.getElementById("submit").addEventListener("click", async () => {
    // Lấy dữ liệu từ form
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // Gửi yêu cầu POST tới server bằng Fetch API
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, pass })
    });
    console.log(response);
    const rs = await response.json();
    if (rs.success === true) {
        // Nếu đăng nhập thành công, chuyển hướng tới trang home
        window.location.href = "/home";
    } else {
        // Nếu không thành công, hiển thị thông báo lỗi
        alert(rs.message);
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    }
});