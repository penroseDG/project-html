let form = document.getElementById('signupForm');
let emailInput = document.getElementById('email');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let errorBox = document.getElementById('errorNotification');
let successBox = document.getElementById('successNotification');

// Đóng thông báo
function closeNotification(id) {
    let noti = document.getElementById(id);
    noti.style.display = 'none';
}

// Hiển thị thông báo lỗi
function showError(messages) {
    let textBox = errorBox.querySelector('.notification-text');
    textBox.innerHTML = "<h3>Lỗi</h3>" + messages.map(m => `<p>${m}</p>`).join('');
    errorBox.style.display = 'block';
    successBox.style.display = 'none';
}

// Hiển thị thông báo thành công
function showSuccess(message) {
    let textBox = successBox.querySelector('.notification-text');
    textBox.innerHTML = `<p>${message}</p>`;
    successBox.style.display = 'block';
    errorBox.style.display = 'none';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let email = emailInput.value.trim();
    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();
    let messages = [];

    if (email === '' || username === '' || password === '') {
        messages.push('Vui lòng điền đầy đủ thông tin!');
    }

    if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        messages.push('Email không đúng định dạng!');
    }

    if (password !== '' && password.length < 8) {
        messages.push('Mật khẩu phải từ 8 ký tự trở lên!');
    }

    if (messages.length > 0) {
        showError(messages);
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let isExisted = users.some(u => u.email === email);
    if (isExisted) {
        showError(['Email đã được đăng ký!']);
        return;
    }

    let user = {
        id: Date.now(),
        username,
        email,
        password,
        created_at: new Date().toISOString(),
        boards: []
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    showSuccess('Đăng ký thành công!');

    form.reset();

    setTimeout(() => {
        window.location.href = './Sign-in.html';
    }, 1000);
});
