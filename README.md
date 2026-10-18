# ICT0023 – K66 | Nhóm 03

## Đề tài: Website nhóm học tập / đồ án – “KHÔNG GIAN ĐỒ ÁN”

 **Học phần:** ICT0023 – K66
 **Nhóm thực hiện:** Nhóm 03
 **Tên repository:** `ICT0023-K66-Nhom03--Website-nhom3doanhoctap`


---

## 1. Giới thiệu

**Không gian đồ án** là website giúp một nhóm sinh viên theo dõi tiến độ làm đồ án: lập kế hoạch, quản lý công việc, phân công nhiệm vụ cho từng thành viên, lưu các sản phẩm đã hoàn thành và ghi nhật ký hoạt động.

 **Đối tượng sử dụng:** nhóm sinh viên làm đồ án, bài tập nhóm.
**Vấn đề giải quyết:** công việc nhóm thường rời rạc, khó biết ai làm gì, việc nào đã xong, việc nào quá hạn. Website gom tất cả vào một nơi, có thống kê và cảnh báo trực quan.

---

## 2. Sản phẩm nộp và đường dẫn

| STT | Sản phẩm | Mô tả | Liên kết / Vị trí |
| --- | --- | --- | --- |
| 1 | **Repository GitHub** (Public) | Mã nguồn, lịch sử commit, issue, Pull Request, các mốc phiên bản | [github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap) |
| 2 | **Website (GitHub Pages)** | Website chạy trực tuyến | [minhnck66sptin-glitch.github.io/ICT0023-K66-Nhom03--Website-nhom3doanhoctap](https://minhnck66sptin-glitch.github.io/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/) |
| 3 | **Video YouTube** | Video giới thiệu và demo sản phẩm | (https://youtu.be/KkV2aQmIY4s?si=KwO-IQ_GsWgwrWgD/) |
| 4 | **Tệp nén `.zip`** | Toàn bộ mã nguồn và sản phẩm, nộp qua LMS | `ICT0023-K66-Nhom03--Website-nhom3doanhoctap.zip` |
| 5 | **Link Google Drive** | Chỉ dùng nếu tệp `.zip` quá lớn, không tải lên LMS được | [Dán link Google Drive tại đây nếu cần] |
| 6 | **Lịch sử commit** | Toàn bộ commit trên nhánh `main` | [Commits](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/commits/main) |
| 7 | **Issue** | Công việc được ghi và giao cho thành viên | [Issues](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/issues) |
| 8 | **Pull Request** | Các thay đổi được hợp nhất và review | [Pull requests](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/pulls?q=is%3Apr) |
| 9 | **Branch** | Các nhánh theo chức năng / thành viên | [Branches](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/branches) |
| 10 | **Mốc phiên bản** | 5 tag / release (xem mục 9) | [Tags](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/tags) · [Releases](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases) |
| 11 | **Đóng góp của thành viên** | Phân công, minh chứng, quy ước làm việc | [CONTRIBUTIONS.md](./CONTRIBUTIONS.md) |
| 12 | **Nguồn tài nguyên** | Thư viện, font, hình ảnh sử dụng | [SOURCES.md](./SOURCES.md) |


---


## 3. Chức năng chính

Website gồm 6 trang, dùng chung thanh điều hướng, chân trang và nút chuyển giao diện sáng / tối.

| Trang | Tệp | Nội dung |
| --- | --- | --- |
| Trang chủ | `index.html` | Giới thiệu nhóm và đề tài |
| Kế hoạch | `ke-hoach.html` | Kế hoạch thực hiện đồ án |
| Công việc | `cong-viec.html` | Quản lý công việc (chi tiết bên dưới) |
| Phân công | `phan-cong.html` | Giao nhiệm vụ cho thành viên (chi tiết bên dưới) |
| Sản phẩm | `san-pham.html` | Tổng hợp sản phẩm; công việc ở trạng thái **Hoàn thành** tự hiện ở đây |
| Nhật ký | `nhat-ky.html` | Nhật ký hoạt động của nhóm |

Ngoài ra có các trang ý tưởng của từng thành viên (mốc v0.1): `y-tuong-minh.html`, `y-tuong-giang.html`, `y-tuong-thanh.html`,`y-tuong-nhi.html`.

**Trang Công việc**

Thống kê nhanh: tổng công việc, đang thực hiện, hoàn thành, quá hạn; thanh tiến độ và tỷ lệ hoàn thành.
 Cảnh báo công việc quá hạn.
 Tìm kiếm theo tên, người phụ trách, ghi chú, tên tệp.
 Lọc theo trạng thái, người phụ trách, mức độ ưu tiên (Cao / Trung bình / Thấp).
 Sắp xếp: tên A–Z, Z–A, hạn gần nhất, hạn xa nhất, ưu tiên cao trước.
 Hai chế độ hiển thị: **Danh sách** và **Kanban** (Chưa bắt đầu / Đang thực hiện / Hoàn thành).
 Thêm, sửa công việc bằng cửa sổ (modal) có kiểm tra dữ liệu nhập; xem chi tiết công việc.
 Ghi tên tệp đính kèm (chỉ lưu tên, không tải lên máy chủ).
 Nút “Dùng dữ liệu mẫu” và “Đặt lại bộ lọc”.

**Trang Phân công**

Danh sách nhiệm vụ gồm tên công việc, thời gian, trạng thái, người được giao và nội dung nhiệm vụ của từng người.
Chuyển sang **Bảng phân công**: thống kê theo thành viên (số nhiệm vụ, hoàn thành, quá hạn, tỷ lệ hoàn thành).
Tìm kiếm nhiệm vụ.
Form thêm nhiệm vụ mới: giao cho một hoặc nhiều thành viên, có kiểm tra dữ liệu nhập, có thể sửa nội dung riêng từng người.

**Chung**

Giao diện responsive (Bootstrap), chuyển chế độ sáng / tối.
Thông báo nổi sau các thao tác

## 4. Các mốc phiên bản

| Mốc | Tag | Nội dung |  Liên kết |
| --- | --- | --- |--- |
| v0.1 | `v0.1-y-tuong` | Ý tưởng: mỗi thành viên một trang ý tưởng, chốt đề tài và danh sách chức năng |[Xem](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases/tag/v0.1-y-tuong%2C) |
| v0.2 | `v0.2-html` | Khung HTML các trang, thanh điều hướng, cấu trúc nội dung |  [Xem](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases/tag/v0.2-html) |
| v0.3 | `v0.3-giao-dien` | Hoàn thiện giao diện CSS, Bootstrap, responsive, giao diện sáng / tối | [Xem](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases/tag/v0.3-giao-dien) |
| v0.4 | `v0.4-tuong-tac` | JavaScript: tìm kiếm, lọc, sắp xếp, Kanban, form kiểm tra dữ liệu, thống kê |[Xem](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases/tag/v0.4-tuong-tac) |
| v1.0 | `v1.0-final` | Bản hoàn chỉnh nộp chấm, đã kiểm thử và hoàn thiện tài liệu | [Xem](https://github.com/minhnck66sptin-glitch/ICT0023-K66-Nhom03--Website-nhom3doanhoctap/releases/tag/v1.0-final) |


---


