// ==================================================
// DỮ LIỆU MẪU DÙNG CHUNG CHO TẤT CẢ CÁC TRANG
// Dữ liệu chỉ tồn tại trong phiên đang mở (không dùng localStorage/cookie).
// Tải lại trang là dữ liệu trở về như dưới đây.
// ==================================================

const TEN_NHOM = "Nhóm 3";
const TEN_DE_TAI = "Website theo dõi tiến độ đồ án nhóm";

const TRANG_THAI = ["Chưa bắt đầu", "Đang thực hiện", "Hoàn thành"];
const MUC_UU_TIEN = ["Cao", "Trung bình", "Thấp"];

// Thành viên và vai trò (dùng cho bảng phân công)
const membersData = [
    { name: "Nguyễn Công Minh",    role: "Trưởng nhóm – điều phối, lập trình chức năng" },
    { name: "Lý Hương Giang",      role: "Thiết kế giao diện, HTML/CSS" },
    { name: "Lê Thị Yến Nhi",      role: "Nội dung, bảng phân công, báo cáo" },
    { name: "Nguyễn Phương Thanh", role: "Kiểm thử, tư liệu ảnh và nguồn" }
];

// Công việc. attachment = tên tệp kết quả (nếu có).
// Công việc ở trạng thái "Hoàn thành" sẽ tự động hiện ở trang Sản phẩm.
const tasksSeed = [
    {
        id: 1, name: "Viết nội dung và dựng trang chủ",
        person: "Lý Hương Giang", priority: "Trung bình", status: "Hoàn thành",
        assignedDate: "2026-09-28", deadline: "2026-10-03", updatedDate: "2026-10-02",
        attachment: "trang-chu.html", note: "Có ảnh nền, tên nhóm và tên đề tài."
    },
    {
        id: 2, name: "Thiết kế giao diện bằng Bootstrap",
        person: "Lý Hương Giang", priority: "Cao", status: "Hoàn thành",
        assignedDate: "2026-10-04", deadline: "2026-10-11", updatedDate: "2026-10-10",
        attachment: "giao-dien.css", note: "Menu, thẻ, bảng và chế độ sáng/tối."
    },
    {
        id: 3, name: "Lập trình thêm, sửa, xóa công việc",
        person: "Nguyễn Công Minh", priority: "Cao", status: "Đang thực hiện",
        assignedDate: "2026-10-12", deadline: "2026-10-18", updatedDate: "2026-10-14",
        attachment: "", note: "Cần kiểm tra dữ liệu nhập và báo lỗi rõ ràng."
    },
    {
        id: 4, name: "Xây dựng bảng phân công",
        person: "Lê Thị Yến Nhi", priority: "Trung bình", status: "Đang thực hiện",
        assignedDate: "2026-10-12", deadline: "2026-10-16", updatedDate: "2026-10-14",
        attachment: "", note: "Có thống kê số nhiệm vụ và tỷ lệ hoàn thành."
    },
    {
        id: 5, name: "Chuẩn bị ảnh và ghi nguồn tư liệu",
        person: "Nguyễn Phương Thanh", priority: "Trung bình", status: "Đang thực hiện",
        assignedDate: "2026-10-08", deadline: "2026-10-12", updatedDate: "2026-10-11",
        attachment: "", note: "Ghi vào SOURCES.md."
    },
    {
        id: 6, name: "Kiểm tra giao diện trên điện thoại",
        person: "Nguyễn Phương Thanh", priority: "Thấp", status: "Chưa bắt đầu",
        assignedDate: "2026-10-14", deadline: "2026-10-20", updatedDate: "2026-10-14",
        attachment: "", note: "Thử ở các độ rộng 360px, 768px, 1200px."
    },
    {
        id: 7, name: "Viết báo cáo và làm slide thuyết trình",
        person: "Lê Thị Yến Nhi", priority: "Cao", status: "Chưa bắt đầu",
        assignedDate: "2026-10-14", deadline: "2026-10-26", updatedDate: "2026-10-14",
        attachment: "", note: "Theo mẫu báo cáo của giảng viên."
    }
];

// Kế hoạch theo giai đoạn (khớp các mốc phiên bản trên GitHub)
const plansSeed = [
    {
        id: 1, name: "Giai đoạn 1 – Ý tưởng và phân tích yêu cầu (v0.1)",
        goal: "Chốt đề tài, người dùng và danh sách trang.",
        start: "2026-09-18", end: "2026-09-25", status: "Hoàn thành",
        note: "Kết quả: bảng ý tưởng giao diện."
    },
    {
        id: 2, name: "Giai đoạn 2 – Dựng cấu trúc HTML (v0.2)",
        goal: "Hoàn thành khung các trang và menu dùng chung.",
        start: "2026-09-26", end: "2026-10-03", status: "Hoàn thành",
        note: "Mỗi trang đều có menu và chân trang giống nhau."
    },
    {
        id: 3, name: "Giai đoạn 3 – Thiết kế giao diện CSS/Bootstrap (v0.3)",
        goal: "Giao diện thống nhất, xem được trên điện thoại.",
        start: "2026-10-04", end: "2026-10-11", status: "Hoàn thành",
        note: "Dùng navbar, card, modal, alert, form."
    },
    {
        id: 4, name: "Giai đoạn 4 – Lập trình tương tác JavaScript/jQuery (v0.4)",
        goal: "Hiển thị dữ liệu, tìm kiếm/lọc, kiểm tra form hoạt động ổn định.",
        start: "2026-10-12", end: "2026-10-20", status: "Đang thực hiện",
        note: "Không có lỗi Console trong luồng chính."
    },
    {
        id: 5, name: "Giai đoạn 5 – Kiểm thử, hoàn thiện và nộp bài (v1.0-final)",
        goal: "Website chạy trên GitHub Pages, đủ báo cáo, slide và video.",
        start: "2026-10-21", end: "2026-10-28", status: "Chưa bắt đầu",
        note: "Kiểm tra ở cửa sổ ẩn danh trước khi nộp."
    }
];

// Nhật ký hoạt động
const journalSeed = [
    {
        id: 1, date: "2026-10-12", person: "Nguyễn Công Minh",
        title: "Họp nhóm phân công giai đoạn lập trình",
        content: "Nhóm thống nhất chia việc cho từng thành viên và hạn nộp từng phần.",
        result: "Đã có bảng phân công."
    },
    {
        id: 2, date: "2026-10-13", person: "Lý Hương Giang",
        title: "Hoàn thiện giao diện các trang",
        content: "Chỉnh menu, màu sắc và chế độ sáng/tối cho đồng nhất.",
        result: "Giao diện dùng được trên điện thoại."
    },
    {
        id: 3, date: "2026-10-14", person: "Lê Thị Yến Nhi",
        title: "Nhập dữ liệu mẫu cho bảng phân công",
        content: "Nhập các nhiệm vụ và hạn hoàn thành của từng thành viên.",
        result: ""
    }
];

// Phân công nhiệm vụ: mỗi nhiệm vụ giao cho một hoặc nhiều thành viên,
// mỗi thành viên có phần việc riêng (members[].content).
const assignmentsSeed = [
    {
        id: 1, name: "Xây dựng giao diện website", deadline: "2026-10-20", status: "Đang thực hiện",
        members: [
            { name: "Nguyễn Công Minh",    content: "Thiết kế header và footer" },
            { name: "Lý Hương Giang",      content: "Làm trang chủ và banner" },
            { name: "Lê Thị Yến Nhi",      content: "Chỉnh sửa CSS, responsive" },
            { name: "Nguyễn Phương Thanh", content: "Kiểm tra giao diện trên các thiết bị" }
        ]
    },
    {
        id: 2, name: "Xây dựng dữ liệu thành viên", deadline: "2026-10-15", status: "Hoàn thành",
        members: [
            { name: "Nguyễn Công Minh",    content: "Nhập và xử lý dữ liệu thành viên" },
            { name: "Lý Hương Giang",      content: "Tạo mảng dữ liệu" },
            { name: "Lê Thị Yến Nhi",      content: "Kiểm tra dữ liệu" },
            { name: "Nguyễn Phương Thanh", content: "Sửa lỗi nếu có" }
        ]
    },
    {
        id: 3, name: "Kiểm tra giao diện", deadline: "2026-10-18", status: "Chưa bắt đầu",
        members: [
            { name: "Nguyễn Công Minh",    content: "Kiểm tra lỗi hiển thị trên các trình duyệt" },
            { name: "Lý Hương Giang",      content: "Kiểm tra chức năng nút bấm" },
            { name: "Lê Thị Yến Nhi",      content: "Kiểm tra form liên hệ" },
            { name: "Nguyễn Phương Thanh", content: "Ghi nhận và báo lỗi" }
        ]
    }
];
