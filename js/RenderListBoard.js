document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);
    let selectedBoardId = parseInt(localStorage.getItem("selectedBoardId"), 10);

    let currentUser = users.find(user => user.id === currentUserId);
    if (!currentUser) {
        window.location.href = "./Sign-in.html";
        return;
    }

    // Gán tiêu đề board đang chọn
    let selectedBoard = currentUser.boards.find(b => b.id === selectedBoardId);
    if (selectedBoard) {
        let titleSection = document.querySelector(".title-section p");
        if (titleSection) {
            titleSection.textContent = selectedBoard.title;
        }
    }

    // Render danh sách board vào sidebar
    let boardListContainer = document.querySelector(".sidebar .list");
    boardListContainer.innerHTML = "";

    currentUser.boards.forEach(board => {
        boardListContainer.innerHTML += `
            <div class="list2" data-id="${board.id}">
                <img src="${board.backdrop || './assets/images/default.jpg'}" alt="Board Image">
                <p>${board.title}</p>
            </div>
        `;
    });

    // Gán sự kiện click sau khi render xong
    let boardItems = boardListContainer.querySelectorAll(".list2");
    boardItems.forEach(item => {
        item.addEventListener("click", () => {
            let boardId = parseInt(item.dataset.id, 10);
            localStorage.setItem("selectedBoardId", boardId);
            window.location.reload();
        });
    });
});
