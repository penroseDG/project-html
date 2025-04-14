document.addEventListener("DOMContentLoaded", function () {
    // Lấy danh sách users từ localStorage
    let storedUsers = localStorage.getItem("users");
    let storedUserId = localStorage.getItem("currentUserId");

    // Kiểm tra nếu không có người dùng đang đăng nhập thì quay lại trang đăng nhập
    if (!storedUsers || !storedUserId) {
        window.location.href = "./page/Sign-in.html";
        return;
    }

    // Parse dữ liệu
    window.users = JSON.parse(storedUsers);
    let currentUserId = parseInt(storedUserId, 10);
    let currentUser = window.users.find(user => user.id === currentUserId);

    // Nếu không tìm thấy user => quay về trang đăng nhập
    if (!currentUser) {
        window.location.href = "./page/Sign-in.html";
        return;
    }

    // Gán user hiện tại vào global nếu cần dùng ở chỗ khác
    window.currentUser = currentUser;

    // Hàm render board của user hiện tại
    window.renderBoards = function () {
        let workspaceContainer = document.getElementById("workspaceBoards");
        let starredContainer = document.getElementById("starredBoards");

        workspaceContainer.innerHTML = "";
        starredContainer.innerHTML = "";

        currentUser.boards.forEach(board => {
            let boardDiv = document.createElement("div");
            boardDiv.className = "board-card";
            boardDiv.style.backgroundImage = `url('${board.backdrop || board.background}')`;
            boardDiv.dataset.id = board.id;
            boardDiv.style.backgroundSize = "cover";
            boardDiv.style.backgroundPosition = "center";
            boardDiv.style.borderRadius = "10px";

            let titleEl = document.createElement("p");
            titleEl.className = "board-title";
            titleEl.textContent = board.title;
            boardDiv.appendChild(titleEl);

            boardDiv.addEventListener("click", (e) => {
                if (e.target.closest(".edit-btn")) return;

                localStorage.setItem("selectedBoardId", board.id);
                window.location.href = "../page/ListEvent.html";
            });

            let editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.innerHTML = `
                <img src="./assets/icon/Frame (3).png" alt="edit" width="15" height="15">
                <span>Edit this board</span>`;
            boardDiv.appendChild(editBtn);

            if (board.is_starred) {
                starredContainer.appendChild(boardDiv);
            } else {
                workspaceContainer.appendChild(boardDiv);
            }
        });
        // Nút tạo board mới
        let createButtonDiv = document.createElement("div");
        createButtonDiv.className = "board-card new-board";
        createButtonDiv.id = "openModalBtn";
        createButtonDiv.innerHTML = `<button onclick="openModal()">Create new board</button>`;
        workspaceContainer.appendChild(createButtonDiv);
    };

    renderBoards();
});
