[SOURCES.md](https://github.com/user-attachments/files/33596253/SOURCES.md)

# Nguồn tham khảo và khai báo
## 1. Tài liệu
|STT |	Tên tài liệu |	Tác giả / Nơi phát hành |	URL	| Phần đã dùng |
|---|---|---|---|---|
|1 | Bootstrap 5.3 Documentation |	The Bootstrap Authors |	https://getbootstrap.com/docs/5.3/ | Cách dùng navbar, card, modal, alert, form, grid, progress bar |
|2 | Bootstrap Icons |	The Bootstrap Authors |	https://icons.getbootstrap.com/ | Chọn biểu tượng cho menu, nút, thẻ |
|3 | jQuery API Documentation |	OpenJS Foundation |	https://api.jquery.com/ | Chọn phần tử, gắn sự kiện, animate() cho slider |
|4 | W3school |	Refsnes Data |	https://www.w3schools.com/ | sử dụng `window.name`, `performance.getEntriesByType()` và `CSS clamp()` để xây dựng chức năng và giao diện website |
## 2. Mã tham khảo
|Thư viện |	Phiên bản |	URL |	Tác giả |	Ngày truy cập |	Phần đã dùng |	Cách chỉnh sửa |	Cách kiểm thử |
|---|---|---|---|---|---|---|---|
|Bootstrap CSS + JS bundle |	5.3.3 |	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/ | The Bootstrap Authors |	14/10/2026 |	Toàn bộ giao diện: navbar, card, modal, form, table, alert, carousel |	Không sửa thư viện; ghi đè bằng `style.css` | 	Mở từng trang, kiểm tra menu thu gọn, modal đóng/mở, carousel chạy |
|Bootstrap Icons |	1.11.3 |	https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/ | The Bootstrap Authors |	15/10/2026 |	Biểu tượng bi-*  |	Không sửa |	Kiểm tra biểu tượng hiển thị ở cả 6 trang |
|jQuery |	3.7.1 |	https://www.w3schools.com/ | OpenJS Foundation |	16/10/2026 |	Thao tác DOM, sự kiện, hiệu ứng cuộn slider |	Không sửa |	Kiểm tra Console không báo lỗi; thử tìm kiếm, lọc, thêm/sửa/xóa |

## 3. Ảnh / dữ liệu
## 3.1. Ảnh và logo
|Tệp |	Dùng ở |	Nguồn (URL / tự tạo) |	Chỉnh sửa | 
|---|---|---|---|
|`logo1.jpg` |	Logo menu và chân trang |	AI tạo trên yêu cầu của nhóm |	Cắt bo tròn |
|`logo2.png` |	Biểu tượng tab trình duyệt (favicon) |	AI tạo trên yêu cầu của nhóm |	Cắt bo tròn |
|`anhnhom.jpg` |	Ảnh banner trang chủ (ảnh 1) |	Nhóm tự chụp |	Không có |
|`anh3.jpg` |	Ảnh banner trang chủ (ảnh 2) |	https://tuyensinhso.vn/images/files/tuyensinhso.vn kinh%20nghiem%20gianh%20hoc%20bong%20tu%20nam%20nhat.jpg | Không có |
|`anh4.webp` |	Ảnh banner trang chủ (ảnh 3) |	https://tblpro.com/Data/Sites/1/News/65/3.jpg | Không có |
|`anhnen.jpg` |	Ảnh thẻ trong slider "Danh mục quản lý đồ án" |	https://media.istockphoto.com/id/1306949457/vi/vec-to/nh%E1%BB%AFng-ng%C6%B0%E1%BB%9Di-%C4%91ang-t%C3%ACm-ki%E1%BA%BFm-c%C3%A1c-gi%E1%BA%A3i-ph%C3%A1p-s%C3%A1ng-t%E1%BA%A1o-kh%C3%A1i-ni%E1%BB%87m-kinh-doanh-l%C3%A0m-vi%E1%BB%87c-nh%C3%B3m-minh-h%E1%BB%8Da.jpg?s=612x612&w=0&k=20&c=7Lav2mL407Cuiv_ab2-itQstAvqTRA9vocvtkOWmBa0= |	Không có |
## 3.2. Dữ liệu
|Dữ liệu |	Tệp	Nguồn |	Ghi chú |
|---|---|---|
|Danh sách thành viên và vai trò |	`data.js` (membersData) |	Nhóm tự nhập |	Thông tin thật của nhóm |
|Công việc, kế hoạch, nhật ký mẫu |	`data.js` (tasksSeed, plansSeed, journalSeed) |	Nhóm tự soạn |	Dữ liệu mẫu minh họa tiến độ; không lấy từ nguồn ngoài |
|Thông tin liên hệ ở chân trang	các tệp .html |	Nhóm tự nhập |	`nhom3@gmail.com` là địa chỉ của nhóm |
## 4. Công cụ AI
Lần 1
Công cụ: Claude (Anthropic)
Ngày: 9/10/2026
Prompt chính: Gửi đề bài và `v0.1-y-tuong.html`: "hãy lên ý tưởng cho v0.2-html" 
Phần tiếp nhận: 6 trang HTML
Phần loại bỏ: Các chi tiết giao diện, đoạn mã nhỏ chưa đáp ứng yêu cầu thiết kế.
Cách kiểm chứng: Đối chiếu từng chức năng trên website với yêu cầu đề bài; so sánh giao diện và nội dung với mẫu báo cáo của giảng viên.
Lần 2
Công cụ: ChatGPT
Ngày : 15/10/2026
Prompt chính: Gợi ý chỉnh sửa mã nguồn và xử lý lỗi.
Phần tiếp nhận/loại bỏ: Chọn lọc các giải thích và gợi ý phù hợp; loại bỏ nội dung không phù hợp với yêu cầu dự án.
Cách kiểm chứng: Đối chiếu với kiến thức đã học và chạy thử các phần liên quan trên trình duyệt.
Lần 3
Công cụ: Claude (Anthropic)
Ngày: 16/10/2026
Prompt chính: "viết mã nguồn lấy ở đâu để làm bài báo cáo"
Phần tiếp nhận: Gợi ý trích các đoạn mã tiêu biểu kèm giải thích
Phần loại bỏ: Không chép nguyên văn câu trả lời vào báo cáo
Cách kiểm chứng: Đối chiếu từng hàm được nhắc tên với script.js; đối chiếu yêu cầu với mẫu báo cáo của giảng viên

Cam kết
Nhóm 3 đã ghi đầy đủ các nguồn tham khảo đã sử dụng. Những phần không ghi nguồn là do nhóm tự thực hiện.

