let form = document.getElementById('loginForm');
let emailInput = document.getElementById('email');
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
    textBox.innerHTML = "<h3>Error</h3>" + messages.map(m => `<p>${m}</p>`).join('');
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
    let password = passwordInput.value.trim();
    let messages = [];

    if (email === '') {
        messages.push('Email không được bỏ trống');
    }

    if (password === '') {
        messages.push('Mật khẩu không được bỏ trống');
    }

    if (messages.length > 0) {
        showError(messages);
        return;
    }

    let users = JSON.parse(localStorage.getItem('trelloUsers')) || [];
    let foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
        showSuccess('Đăng nhập thành công');
        setTimeout(function () {
            window.location.href = '../Dashboard.html';
        }, 1000);
    } else {
        showError(['Email hoặc mật khẩu không đúng']);
    }
});
