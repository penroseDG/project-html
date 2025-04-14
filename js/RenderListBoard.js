document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);
    let selectedBoardId = parseInt(localStorage.getItem("selectedBoardId"), 10);

    // Tìm user đang đăng nhập
    let currentUser = users.find(user => user.id === currentUserId);
    if (!currentUser) {
        window.location.href = "./Sign-in.html";
        return;
    }

    // Lấy ra board đang được chọn để hiện thông tin chính
    let selectedBoard = currentUser.boards.find(b => b.id === selectedBoardId);
    if (selectedBoard) {
        // Gán tên board lên header
        let titleSection = document.querySelector(".title-section p");
        if (titleSection) {
            titleSection.textContent = selectedBoard.title;
        }
    }

    // Hiển thị danh sách board của user 
    let boardListContainer = document.querySelector(".sidebar .list");
    boardListContainer.innerHTML = "";

    currentUser.boards.forEach(board => {
        let boardItem = document.createElement("div");
        boardItem.className = "list2";
        boardItem.innerHTML = `
            <img src="${board.backdrop || './assets/images/default.jpg'}" alt="Board Image">
            <p>${board.title}</p>
        `;

        boardItem.addEventListener("click", () => {
            localStorage.setItem("selectedBoardId", board.id);
            window.location.reload(); // reload trang để hiển thị board mới
        });

        boardListContainer.appendChild(boardItem);
    });
});
