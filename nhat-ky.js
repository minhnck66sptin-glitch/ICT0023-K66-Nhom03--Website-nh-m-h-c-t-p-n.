// ==================================================
// NHAT-KY.JS – JAVASCRIPT RIÊNG CỦA TRANG NHẬT KÝ
// Nạp SAU script.js (xem thẻ <script> cuối nhat-ky.html).
// Dùng các hàm và biến chung trong script.js, data.js.
// ==================================================

// ---------- NHẬT KÝ ----------

function hienThiNhatKy() {
    luuTrangThai();

    const tuKhoa = ($("#timNhatKy").val() || "").trim().toLowerCase();
    const nguoi = $("#locNguoiNhatKy").val() || "all";

    const ds = journal
        .filter(function (e) {
            return (e.title.toLowerCase().includes(tuKhoa) ||
                    e.content.toLowerCase().includes(tuKhoa) ||
                    (e.result || "").toLowerCase().includes(tuKhoa)) &&
                (nguoi === "all" || e.person === nguoi);
        })
        .sort(function (a, b) { return b.date.localeCompare(a.date) || b.id - a.id; });

    $("#tongNhatKy").text(journal.length);

    const hop = $("#danhSachNhatKy");
    hop.empty();
    $("#thongBaoNhatKyRong").toggleClass("d-none", ds.length > 0);

    ds.forEach(function (e) {
        hop.append(
            '<div class="col-12">' +
                '<div class="card the-nhat-ky shadow-sm">' +
                    '<div class="card-body">' +
                        '<div class="d-flex flex-wrap justify-content-between gap-2 mb-2">' +
                            '<span class="text-muted small"><i class="bi bi-calendar-event"></i> ' + dinhDangNgay(e.date) + "</span>" +
                            '<span class="badge bg-primary">' + esc(e.person) + "</span>" +
                        "</div>" +
                        '<h3 class="h5">' + esc(e.title) + "</h3>" +
                        "<p>" + esc(e.content) + "</p>" +
                        '<p class="mb-3"><strong>Kết quả:</strong> ' + (esc(e.result) || '<span class="text-muted">Chưa cập nhật</span>') + "</p>" +
                        '<button type="button" class="btn btn-outline-danger btn-sm btn-xoa-nhat-ky" data-id="' + e.id + '">' +
                            '<i class="bi bi-trash"></i> Xóa</button>' +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    });
}

function themNhatKy(event) {
    event.preventDefault();
    xoaLoi("#formNhatKy");

    const ngay = $("#ngayNhatKy").val();
    const nguoi = $("#nguoiNhatKy").val();
    const tieuDe = $("#tieuDeNhatKy").val().trim();
    const noiDung = $("#noiDungNhatKy").val().trim();
    const ketQua = $("#ketQuaNhatKy").val().trim();

    let coLoi = false;

    if (!ngay) {
        datLoi("#ngayNhatKy", "Vui lòng chọn ngày thực hiện.");
        coLoi = true;
    } else if (ngay > homNay()) {
        datLoi("#ngayNhatKy", "Ngày thực hiện không được ở tương lai.");
        coLoi = true;
    }

    if (!nguoi) {
        datLoi("#nguoiNhatKy", "Vui lòng chọn người ghi nhật ký.");
        coLoi = true;
    }

    if (tieuDe.length < 3) {
        datLoi("#tieuDeNhatKy", "Tiêu đề phải có ít nhất 3 ký tự.");
        coLoi = true;
    }

    if (noiDung.length < 5) {
        datLoi("#noiDungNhatKy", "Nội dung phải có ít nhất 5 ký tự.");
        coLoi = true;
    }

    if (coLoi) {
        return;
    }

    journal.push({
        id: idTiepTheo(journal), date: ngay, person: nguoi,
        title: tieuDe, content: noiDung, result: ketQua
    });

    $("#formNhatKy")[0].reset();
    $("#ngayNhatKy").val(homNay());

    hienThiNhatKy();
    showMessage("Đã thêm nhật ký.");
}

function khoiTaoNhatKy() {
    napThanhVien("#nguoiNhatKy", false, "-- Chọn thành viên --");
    napThanhVien("#locNguoiNhatKy", true, "Tất cả thành viên");

    $("#ngayNhatKy").val(homNay()).attr("max", homNay());

    hienThiNhatKy();

    $("#formNhatKy").on("submit", themNhatKy);
    $("#timNhatKy").on("input", hienThiNhatKy);
    $("#locNguoiNhatKy").on("change", hienThiNhatKy);

    $("#btnLamMoiNhatKy").on("click", function () {
        setTimeout(function () {
            xoaLoi("#formNhatKy");
            $("#ngayNhatKy").val(homNay());
        }, 0);
    });

    $("#btnDuLieuMauNhatKy").on("click", function () {
        journal = nhanBan(journalSeed);
        hienThiNhatKy();
        showMessage("Đã nạp lại dữ liệu mẫu.", "info");
    });

    ganSuKien("click", ".btn-xoa-nhat-ky", function () {
        const id = Number($(this).data("id"));

        if (confirm("Xóa nhật ký này?")) {
            journal = journal.filter(function (e) { return e.id !== id; });
            hienThiNhatKy();
            showMessage("Đã xóa nhật ký.");
        }
    });
}


// ---------- Khởi tạo khi trang tải xong ----------

$(document).ready(function () {
    khoiTaoNhatKy();
});
