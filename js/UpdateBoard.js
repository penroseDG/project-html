document.addEventListener("DOMContentLoaded", function () {
    // Khai báo biến dùng để lưu trạng thái hiện tại
    let currentBoardId = null;
    let updateChosenBackground = null;
    let updateChosenTextColor = "#ffffff";
    // Lấy phần tử container hiển thị board (cả workspace và starred)
    let workspace = document.getElementById("workspaceBoards");
    let starred = document.getElementById("starredBoards");
    // Gắn sự kiện click để xử lý khi nhấn vào nút "Edit this board"
    workspace.addEventListener("click", handleEditClick);
    starred.addEventListener("click", handleEditClick);
    function handleEditClick(e) {
        // Kiểm tra xem người dùng có click vào nút chỉnh sửa hay không
        let editBtn = e.target.closest(".edit-btn");
        if (!editBtn) return;
        // Tìm card chứa board được click
        let boardCard = editBtn.closest(".board-card");
        currentBoardId = parseInt(boardCard.dataset.id, 10); // Lưu ID của board đang được chỉnh
        // Tìm board trong danh sách user hiện tại
        let user = window.users[0];
        let board = user.boards.find(b => b.id === currentBoardId);
        if (!board) return;
        // Mở modal cập nhật
        document.getElementById("modalsOverlay").style.display = "flex";
        document.getElementById("updateBoardModal").style.display = "block";
        document.getElementById("createBoardModal").style.display = "none";
        document.body.style.overflow = "hidden"; // Ngăn scroll khi modal mở
        // Gán giá trị hiện tại vào các input/modal
        document.getElementById("update-board-title").value = board.title || "";
        updateChosenBackground = board.backdrop || null;
        updateChosenTextColor = board.textColor || "#ffffff";
        // Đánh dấu ảnh background đang được chọn
        let updateBgBoxes = document.querySelectorAll("#updateBoardModal .background-options .bg-box");
        updateBgBoxes.forEach(box => {
            let imgEl = box.querySelector(".bg-image");
            if (imgEl && imgEl.src === board.backdrop) {
                box.classList.add("selected");
            } else {
                box.classList.remove("selected");
            }
        });
        // Đánh dấu màu đang được chọn
        let updateColorButtons = document.querySelectorAll("#updateBoardModal .color-options .color");
        updateColorButtons.forEach(btn => {
            let btnColor = window.getComputedStyle(btn).backgroundColor;
            let rgbBoardColor = updateChosenTextColor;
            if (btnColor === rgbBoardColor) {
                btn.classList.add("selected");
            } else {
                btn.classList.remove("selected");
            }
        });
    }
    // Xử lý khi chọn ảnh nền trong modal update
    let updateBgBoxes = document.querySelectorAll("#updateBoardModal .background-options .bg-box");
    updateBgBoxes.forEach(box => {
        box.addEventListener("click", () => {
            let imgEl = box.querySelector(".bg-image");
            if (imgEl) {
                updateChosenBackground = imgEl.src;
            }
            updateBgBoxes.forEach(b => b.classList.remove("selected"));
            box.classList.add("selected");
        });
    });
    // Xử lý khi chọn màu chữ trong modal update
    let updateColorButtons = document.querySelectorAll("#updateBoardModal .color-options .color");
    updateColorButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            updateChosenTextColor = window.getComputedStyle(btn).backgroundColor;
            updateColorButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });
    // Hàm cập nhật thông tin board
    window.updateBoard = function () {
        if (currentBoardId == null) return;
        // Lấy tiêu đề mới và kiểm tra hợp lệ
        let newTitle = document.getElementById("update-board-title").value.trim();
        let errorMsg = document.querySelector("#updateBoardModal .error-msg");
        if (!newTitle) {
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none";
        }
        // Tìm board trong danh sách và cập nhật thông tin
        let user = window.users[0];
        let boardIndex = user.boards.findIndex(b => b.id === currentBoardId);
        if (boardIndex !== -1) {
            user.boards[boardIndex].title = newTitle;
            user.boards[boardIndex].backdrop = updateChosenBackground || user.boards[boardIndex].backdrop;
            user.boards[boardIndex].textColor = updateChosenTextColor || "#ffffff";
        }
        // Lưu lại thay đổi vào localStorage
        localStorage.setItem("users", JSON.stringify(window.users));
        // Gọi lại hàm render dashboard
        if (typeof renderBoards === "function") {
            renderBoards();
        }
        closeModal();
        currentBoardId = null;
    };
    // Hàm xóa board
    window.deleteBoard = function () {
        if (currentBoardId == null) return;
        // Lọc bỏ board theo ID
        let user = window.users[0];
        user.boards = user.boards.filter(b => b.id !== currentBoardId);
        // Cập nhật localStorage và UI
        localStorage.setItem("users", JSON.stringify(window.users));
        if (typeof renderBoards === "function") {
            renderBoards();
        }
        closeModal();
        currentBoardId = null;
    };
    // Đóng modal
    function closeModal() {
        document.getElementById("modalsOverlay").style.display = "none";
        document.getElementById("updateBoardModal").style.display = "none";
        document.body.style.overflow = "auto";
    }
});
