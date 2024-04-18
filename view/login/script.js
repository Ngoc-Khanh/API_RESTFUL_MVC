document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn chuyển hướng mặc định

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            const loginData = {
                username: username,
                password: password
            };

            // Thực hiện yêu cầu API để kiểm tra đăng nhập
            fetch('http://localhost/mvc-test/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Đăng nhập thành công!');
                    // Thực hiện các hành động sau khi đăng nhập thành công (chẳng hạn chuyển hướng hoặc cập nhật giao diện)
                    window.location.href = data.redirect;
                } else {
                    alert('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
                }
            })
            .catch(error => console.error('Lỗi:', error));
        } else {
            alert('Vui lòng điền tên đăng nhập và mật khẩu.');
        }
    });
});
