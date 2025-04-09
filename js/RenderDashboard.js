// Danh sách board mẫu
let boards = [
    {
        id: 1,
        title: "Board Title 01",
        background: "./assets/images/Hello-Falcon-d51d9.webp",
        starred: false
    },
    {
        id: 2,
        title: "Board Title 02",
        background: "./assets/images/d4285f4a-f365-420f-a835-8435836315ef-d51d9.webp",
        starred: false
    },
    {
        id: 3,
        title: "Board Title 03",
        background: "./assets/images/download.jfif",
        starred: false
    },
    {
        id: 4,
        title: "Important Board 01",
        background: "./assets/images/Hello-Kitty-Marvel-Characters-d51d9.webp",
        starred: true
    },
    {
        id: 5,
        title: "Important Board 02",
        background: "./assets/images/Captain-Adorable-d51d9.webp",
        starred: true
    }
];

function renderBoards() {
    let workspaceContainer = document.getElementById("workspaceBoards");
    let starredContainer = document.getElementById("starredBoards");

    boards.forEach(board => {
        let boardDiv = document.createElement("div");
        boardDiv.className = "board-card";
        boardDiv.style.backgroundImage = `url('${board.background}')`;

        let title = document.createElement("p");
        title.className = "board-title";
        title.innerText = board.title;

        let editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = `
      <img src="./assets/icon/Frame (3).png" alt width="15px" height="15px">
      <span>Edit this board</span>
    `;

        boardDiv.appendChild(title);
        boardDiv.appendChild(editBtn);

        if (board.starred) {
            starredContainer.appendChild(boardDiv);
        } else {
            workspaceContainer.appendChild(boardDiv);
        }
    });
}

document.addEventListener("DOMContentLoaded", renderBoards);
