document.addEventListener("DOMContentLoaded", function () {
    let chosenBackground = null;
    let chosenTextColor = "#ffffff";
    let colorMappings = {
        "orange": "#f97316",
        "purple": "#8b5cf6",
        "green": "#22c55e",
        "blue": "#0ea5e9",
        "yellow": "#eab308",
        "pink": "#ec4899"
    };

    let backgroundBoxes = document.querySelectorAll("#createBoardModal .background-options .bg-box");
    backgroundBoxes.forEach(box => {
        box.addEventListener("click", function () {
            chosenBackground = this.querySelector(".bg-image").src;
            backgroundBoxes.forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    let colorButtons = document.querySelectorAll("#createBoardModal .color-options .color");
    colorButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const colorClass = btn.classList[1];
            chosenTextColor = colorMappings[colorClass] || "#ffffff";
            colorButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });

    // HÀM TẠO BOARD MỚI
    window.createNewBoard = function () {
        let boardTitleInput = document.getElementById("create-board-title");
        let boardTitle = boardTitleInput.value.trim();
        let errorMsg = document.querySelector("#createBoardModal .error-msg");

        if (!boardTitle) {
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none";
        }

        // Nếu chưa chọn ảnh thì random
        if (!chosenBackground) {
            let randomBackgrounds = [
                "./assets/images/Captain-Adorable-d51d9.webp",
                "./assets/images/Hello-Hawkeye-d51d9.webp",
                "./assets/images/Hello-Kitty-Marvel-Characters-d51d9.webp",
                "./assets/images/Iron-Kitty-d51d9.webp"
            ];
            chosenBackground = randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)];
        }

        // Khởi tạo board object
        let newBoard = {
            id: Date.now(),
            title: boardTitle,
            description: "",
            backdrop: chosenBackground,
            textColor: chosenTextColor,
            is_starred: false,
            created_at: new Date().toISOString(),
            lists: []
        };
        let user = window.users[0];
        user.boards.push(newBoard);

        localStorage.setItem("users", JSON.stringify(window.users));

        if (typeof renderBoards === "function") {
            renderBoards();
        }

        boardTitleInput.value = "";
        chosenBackground = null;
        chosenTextColor = "#ffffff";
        backgroundBoxes.forEach(b => b.classList.remove("selected"));
        colorButtons.forEach(b => b.classList.remove("selected"));
        closeModal();
    };

    function closeModal() {
        document.getElementById("modalsOverlay").style.display = "none";
        document.getElementById("createBoardModal").style.display = "none";
    }
});
