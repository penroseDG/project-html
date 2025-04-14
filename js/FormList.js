document.addEventListener('DOMContentLoaded', function () {
    // Xử lý sự kiện cho tất cả nút thêm card
    let addCardButtons = document.querySelectorAll('.add-card');
    addCardButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let form = this.nextElementSibling; // Lấy form thêm card ngay sau nút thêm card
            form.style.display = 'flex';
        });
    });
    // Xử lý sự kiện cho tất cả nút đóng form thêm card
    let closeCardButtons = document.querySelectorAll('.closeCard');
    closeCardButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let form = this.closest('.formAddCard'); // Lấy form thêm card chứa nút đóng
            form.style.display = 'none';
        });
    });
    // Xử lý sự kiện cho nút thêm danh sách mới
    let addListButtons = document.querySelectorAll('.add-list-button');
    addListButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let form = this.nextElementSibling;
            form.style.display = 'flex';
        });
    });
    // let addListFormButtons = document.querySelectorAll('.addList button');
    // addListFormButtons.forEach(function (button) {
    //     button.addEventListener('click', function () {
    //         let input = this.parentNode.querySelector('input'); // Lấy input nhập tên danh sách
    //         let listName = input.value;
    //         console.log("Adding list with name:", listName);
    //         input.value = ''; 
    //         this.parentNode.style.display = 'none';
    //     });
    // });
    let templateIcons = document.querySelectorAll('.create-from-template-icon'); // Giả sử bạn đã thêm class này vào icon
    templateIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it !',
                cancelButtonText: 'No, cancel !'
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let closeBoardBtn = document.querySelector(".button-close");

    if (closeBoardBtn) {
        closeBoardBtn.addEventListener("click", function () {
            Swal.fire({
                title: 'Are you sure',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Close it !',
                cancelButtonText: 'No, cancel !'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Lấy dữ liệu từ localStorage
                    let users = JSON.parse(localStorage.getItem("users")) || [];
                    let currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);
                    let selectedBoardId = parseInt(localStorage.getItem("selectedBoardId"), 10);

                    let currentUser = users.find(user => user.id === currentUserId);
                    if (!currentUser) return;

                    // Đánh dấu is_closed = true cho board
                    let board = currentUser.boards.find(b => b.id === selectedBoardId);
                    if (board) {
                        board.is_closed = true;
                    }

                    // Cập nhật localStorage
                    localStorage.setItem("users", JSON.stringify(users));
                    localStorage.removeItem("selectedBoardId");

                    // Chuyển về dashboard
                    window.location.href = "../Dashboard.html";
                }
            });
        });
    }
});
