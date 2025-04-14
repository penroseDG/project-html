// Dashboard.js
document.addEventListener("DOMContentLoaded", function () {
    let modalsOverlay = document.getElementById("modalsOverlay");

    // Hàm mở modal cho Create/Update Board
    window.openModal = function () {
        // Mặc định mở modal Create Board
        let createModal = document.getElementById("createBoardModal");
        let updateModal = document.getElementById("updateBoardModal");
        modalsOverlay.style.display = "flex";
        createModal.style.display = "block";
        updateModal.style.display = "none";
        document.body.style.overflow = "hidden";
    };

    // Hàm đóng modal (cho cả Create và Update)
    window.closeModal = function () {
        modalsOverlay.style.display = "none";
        document.getElementById("createBoardModal").style.display = "none";
        document.getElementById("updateBoardModal").style.display = "none";
        document.body.style.overflow = "auto";
    };

    // Đóng modal khi click ra ngoài vùng modal (click vào overlay)
    modalsOverlay.addEventListener("click", function (e) {
        if (e.target === modalsOverlay) {
            closeModal();
        }
    });
});
