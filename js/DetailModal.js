document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);
    let selectedBoardId = parseInt(localStorage.getItem("selectedBoardId"), 10);

    let currentUser = users.find(user => user.id === currentUserId);
    if (!currentUser) return;

    let selectedBoard = currentUser.boards.find(b => b.id === selectedBoardId);
    if (!selectedBoard) return;

    const detailModal = document.querySelector(".detailModal");
    const cancelBtn = document.querySelector(".btn-cc");
    const deleteBtn = document.getElementById("btnDelete");
    const saveBtn = document.querySelector(".btn-sv");
    const selectList = document.getElementById("selectList");
    const modalMove = document.querySelector(".modalMove");
    const closeModal = document.getElementById("closeModal");

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

    document.querySelectorAll('.add-card').forEach(button => {
        button.addEventListener('click', function () {
            let form = this.nextElementSibling;
            form.style.display = 'flex';
        });
    });

    document.querySelectorAll('.closeCard').forEach(button => {
        button.addEventListener('click', function () {
            let form = this.closest('.formAddCard');
            form.style.display = 'none';
        });
    });

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
    // Xoá card từ modal
    deleteBtn?.addEventListener("click", () => {
        detailModal.style.display = "none";
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const listId = parseInt(detailModal.dataset.listId);
                const taskId = parseInt(detailModal.dataset.taskId);
                const list = selectedBoard.lists.find(l => l.id === listId);
                if (!list) return;
                list.tasks = list.tasks.filter(t => t.id !== taskId);
                localStorage.setItem("users", JSON.stringify(users));
                Swal.fire('Deleted!', 'Your card has been deleted.', 'success').then(() => {
                    location.reload();
                });
            } else {
                detailModal.style.display = "block";
            }
        });
    });

    saveBtn?.addEventListener("click", () => {
        const listId = parseInt(detailModal.dataset.listId);
        const taskId = parseInt(detailModal.dataset.taskId);
        const newDescription = document.getElementById("text").value;
        const newTitle = document.querySelector(".detailTitle p").textContent;

        const list = selectedBoard.lists.find(l => l.id === listId);
        if (!list) return;
        const task = list.tasks.find(t => t.id === taskId);
        if (!task) return;

        task.description = newDescription;
        task.title = newTitle;

        localStorage.setItem("users", JSON.stringify(users));
        detailModal.style.display = "none";
    });

    cancelBtn?.addEventListener("click", () => {
        detailModal.style.display = "none";
    });

    selectList?.addEventListener("click", () => {
        modalMove.style.display = "block";
    });

    closeModal?.addEventListener("click", () => {
        modalMove.style.display = "none";
    });
});