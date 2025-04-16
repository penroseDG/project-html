document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);
    let selectedBoardId = parseInt(localStorage.getItem("selectedBoardId"), 10);

    let currentUser = users.find(user => user.id === currentUserId);
    if (!currentUser) return;

    let selectedBoard = currentUser.boards.find(b => b.id === selectedBoardId);
    if (!selectedBoard) return;

    const detailModal = document.querySelector(".detailModal");
    detailModal.classList.add("show-detail-modal");
    detailModal.style.display = "none";

    window.openDetailModal = function (listId, taskId) {
        let list = selectedBoard.lists.find(l => l.id === listId);
        if (!list) return;
        let task = list.tasks.find(t => t.id === taskId);
        if (!task) return;

        detailModal.style.display = "block";
        document.querySelector(".detailTitle p").textContent = task.title;
        document.getElementById("text").value = task.description || "";

        detailModal.dataset.listId = listId;
        detailModal.dataset.taskId = taskId;
    };

    selectedBoard.lists.forEach(list => {
        let parentBox = document.getElementById(list.title === 'Việc cần làm' ? 'todoList' : 'inProgressList');
        if (!parentBox) return;
        let taskList = parentBox.querySelector(".task-list");
        taskList.innerHTML = '';

        list.tasks.forEach((task, index) => {
            taskList.innerHTML += `
  <div class="card-item" draggable="true" data-index="${index}" data-list="${list.id}" data-task-id="${task.id}" onclick="openDetailModal(${list.id}, ${task.id})">
    <div class="card-content">
      <p>${task.title}</p>
    </div>
  </div>`;
        });
    });

    // Mở form thêm card
    document.querySelectorAll('.add-card').forEach(button => {
        button.addEventListener('click', function () {
            let form = this.nextElementSibling;
            form.style.display = 'flex';
        });
    });

    // Đóng form thêm card
    document.querySelectorAll('.closeCard').forEach(button => {
        button.addEventListener('click', function () {
            let form = this.closest('.formAddCard');
            form.style.display = 'none';
        });
    });

    // Thêm card
    document.querySelectorAll(".addCard-button").forEach(button => {
        button.addEventListener("click", function () {
            let parentBox = this.closest(".list-box");
            let input = parentBox.querySelector(".addCard-input");
            let value = input.value.trim();
            let listId = parentBox.id === 'todoList' ? 201 : 202;

            if (value === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning!',
                    text: 'Please enter a card title before adding.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            let list = selectedBoard.lists.find(l => l.id === listId);
            if (list) {
                list.tasks.push({
                    id: Date.now(),
                    title: value,
                    description: '',
                    status: 'pending',
                    due_date: '',
                    tags: []
                });
            }

            localStorage.setItem("users", JSON.stringify(users));
            input.value = "";
            input.closest(".formAddCard").style.display = "none";
            location.reload();
        });
    });

    // Icon template cảnh báo
    document.querySelectorAll('.create-from-template-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!'
            });
        });
    });

    // Đóng board
    let closeBoardBtn = document.querySelector(".button-close");
    if (closeBoardBtn) {
        closeBoardBtn.addEventListener("click", function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, close it!',
                cancelButtonText: 'No, cancel!'
            }).then((result) => {
                if (result.isConfirmed) {
                    selectedBoard.is_closed = true;
                    localStorage.setItem("users", JSON.stringify(users));
                    localStorage.removeItem("selectedBoardId");
                    window.location.href = "../Dashboard.html";
                }
            });
        });
    }
});
