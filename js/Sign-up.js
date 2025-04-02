let form = document.getElementById('signupForm');
let emailInput = document.getElementById('email');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = emailInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let user = { email, username, password };
    // Lưu user vào localStorage
    localStorage.setItem('trelloUser', JSON.stringify(user));
    // Lấy danh sách user từ localStorage (nếu có), nếu chưa có thì tạo mảng mới
    let users = JSON.parse(localStorage.getItem('trelloUsers')) || [];
    // Thêm user mới vào danh sách
    users.push(user);
    // Cập nhật danh sách user 
    localStorage.setItem('trelloUsers', JSON.stringify(users));
    // Thông báo đăng ký thành công
    alert('Đăng ký thành công!');
    // Xóa dữ liệu trong form
    this.reset();
});
