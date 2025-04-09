let form = document.getElementById('signupForm');
let emailInput = document.getElementById('email');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let goToLogin = document.getElementById('goToLogin');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = emailInput.value.trim();
    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();
    if (email === '' || username === '' || password === '') {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email không đúng định dạng!');
        return;
    }
    if (password.length < 8) {
        alert('Mật khẩu phải từ 8 ký tự trở lên!');
        return;
    }
    let user = { email, username, password };
    // Lấy danh sách người dùng hiện tại
    let users = JSON.parse(localStorage.getItem('trelloUsers')) || [];
    // Kiểm tra trùng email
    let isExisted = users.some(u => u.email === email);
    if (isExisted) {
        alert('Email đã được đăng ký!');
        return;
    }
    users.push(user);
    
    localStorage.setItem('trelloUsers', JSON.stringify(users));

    alert('Đăng ký thành công!');
    form.reset();
    window.location.href = './Sign-in.html';
});

goToLogin.addEventListener('click', function (e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('trelloUsers')) || [];
    if (users.length > 0) {
        window.location.href = './Sign-in.html';
    } else {
        alert('Chưa có tài khoản nào, vui lòng đăng ký!');
    }
});