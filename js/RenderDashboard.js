document.addEventListener("DOMContentLoaded", function () {
    let storedUsers = localStorage.getItem("users");
    let storedUserId = localStorage.getItem("currentUserId");

    if (!storedUsers || !storedUserId) {
        window.location.href = "./page/Sign-in.html";
        return;
    }

    window.users = JSON.parse(storedUsers);
    let currentUserId = parseInt(storedUserId, 10);
    let currentUser = window.users.find(user => user.id === currentUserId);

    if (!currentUser) {
        window.location.href = "./page/Sign-in.html";
        return;
    }

    window.currentUser = currentUser;

    window.renderBoards = function () {
        let workspaceContainer = document.getElementById("workspaceBoards");
        let starredContainer = document.getElementById("starredBoards");

        workspaceContainer.innerHTML = "";
        starredContainer.innerHTML = "";

        currentUser.boards.forEach((board, index) => {
            const boardHTML = `
                <div class="board-card" 
                    data-id="${board.id}" 
                    style="
                        background-image: url('${board.backdrop || board.background}');
                        background-size: cover;
                        background-position: center;
                        border-radius: 10px;">
                    <p class="board-title">${board.title}</p>
                    <button class="edit-btn">
                        <img src="./assets/icon/Frame (3).png" alt="edit" width="15" height="15">
                        <span>Edit this board</span>
                    </button>
                </div>
            `;

            workspaceContainer.innerHTML += boardHTML;

            if (board.is_starred) {
                starredContainer.innerHTML += boardHTML;
            }
        });

        // Tạo nút tạo board mới
        workspaceContainer.innerHTML += `
            <div class="board-card new-board" id="openModalBtn">
                <button onclick="openModal()">Create new board</button>
            </div>
        `;

        // Gắn lại sự kiện click cho từng board-card
        let allBoards = document.querySelectorAll(".board-card");
        allBoards.forEach((boardEl) => {
            let boardId = boardEl.dataset.id;

            boardEl.addEventListener("click", (e) => {
                if (e.target.closest(".edit-btn")) return;
                if (!boardId) return;
                localStorage.setItem("selectedBoardId", boardId);
                window.location.href = "../page/ListEvent.html";
            });

            let editBtn = boardEl.querySelector(".edit-btn");
            if (editBtn) {
                editBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // Mở modal sửa board ở đây nếu muốn
                });
            }
        });

    };

    renderBoards();
});
