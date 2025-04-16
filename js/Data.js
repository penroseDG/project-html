document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("users")) {
        const sampleData = [
            {
                id: 1,
                username: "penroseDG",
                email: "dudangdaide@gmail.com",
                password: "12345678",
                created_at: "2025-02-28T12:00:00Z",
                boards: [
                    {
                        id: 101,
                        title: "Dự án Website",
                        description: "Quản lý tiến độ dự án website",
                        backdrop: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
                        is_starred: true,
                        created_at: "2025-02-28T12:30:00Z",
                        lists: [
                            {
                                id: 201,
                                title: "Việc cần làm",
                                created_at: "2025-02-28T13:00:00Z",
                                tasks: [
                                    {
                                        id: 301,
                                        title: "Thiết kế giao diện",
                                        description: "Tạo wireframe cho trang chủ",
                                        status: "pending",
                                        due_date: "2025-03-05T23:59:59Z",
                                        tags: [
                                            {
                                                id: 401,
                                                content: "Urgent",
                                                color: "#fff"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 202,
                                title: "Đang tiến hành",
                                created_at: "2025-02-28T13:05:00Z",
                                tasks: []
                            }
                        ]
                    }
                ]
            }
        ];

        localStorage.setItem("users", JSON.stringify(sampleData));
        localStorage.setItem("currentUserId", "1");
        localStorage.setItem("selectedBoardId", "101");
        console.log("⚙️ Dữ liệu mẫu đã được khởi tạo.");
    }
});
