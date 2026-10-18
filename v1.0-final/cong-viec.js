// ==================================================
// CONG-VIEC.JS – JAVASCRIPT RIÊNG CỦA TRANG CÔNG VIỆC
// Nạp SAU script.js (xem thẻ <script> cuối cong-viec.html).
// Dùng các hàm và biến chung trong script.js, data.js.
// ==================================================

// ---------- Hàm tiện ích chỉ dùng ở trang này ----------

function badgeUuTien(mucDo) {
    let lop = "bg-info text-dark";

    if (mucDo === "Cao") {
        lop = "bg-danger";
    } else if (mucDo === "Trung bình") {
        lop = "bg-warning text-dark";
    }

    return '<span class="badge ' + lop + '">' + esc(mucDo) + "</span>";
}


// ---------- CÔNG VIỆC (danh sách + Kanban) ----------

function locCongViec() {
    const tuKhoa = ($("#timCongViec").val() || "").trim().toLowerCase();
    const trangThai = $("#locTrangThai").val() || "all";
    const nguoi = $("#locNguoiPhuTrach").val() || "all";
    const uuTien = $("#locUuTien").val() || "all";
    const sapXep = $("#sapXepCongViec").val() || "mac-dinh";

    const ketQua = tasks.filter(function (t) {
        const khop = t.name.toLowerCase().includes(tuKhoa) ||
            t.person.toLowerCase().includes(tuKhoa) ||
            (t.note || "").toLowerCase().includes(tuKhoa) ||
            (t.attachment || "").toLowerCase().includes(tuKhoa);

        return khop &&
            (trangThai === "all" || t.status === trangThai) &&
            (nguoi === "all" || t.person === nguoi) &&
            (uuTien === "all" || t.priority === uuTien);
    });

    const thuTuUuTien = { "Cao": 0, "Trung bình": 1, "Thấp": 2 };

    // Công việc chưa có hạn được đẩy xuống cuối
    const soHan = function (a, b, chieu) {
        if (!a.deadline && !b.deadline) { return 0; }
        if (!a.deadline) { return 1; }
        if (!b.deadline) { return -1; }
        return chieu * a.deadline.localeCompare(b.deadline);
    };

    if (sapXep === "ten-az") {
        ketQua.sort(function (a, b) { return a.name.localeCompare(b.name, "vi"); });
    } else if (sapXep === "ten-za") {
        ketQua.sort(function (a, b) { return b.name.localeCompare(a.name, "vi"); });
    } else if (sapXep === "han-tang") {
        ketQua.sort(function (a, b) { return soHan(a, b, 1); });
    } else if (sapXep === "han-giam") {
        ketQua.sort(function (a, b) { return soHan(a, b, -1); });
    } else if (sapXep === "uu-tien") {
        ketQua.sort(function (a, b) { return thuTuUuTien[a.priority] - thuTuUuTien[b.priority]; });
    }

    return ketQua;
}

function thongKeCongViec() {
    const tong = tasks.length;
    const dang = tasks.filter(function (t) { return t.status === "Đang thực hiện"; }).length;
    const xong = tasks.filter(function (t) { return t.status === "Hoàn thành"; }).length;
    const quaHan = tasks.filter(function (t) { return thongTinHan(t.deadline, t.status).quaHan; }).length;
    const ty = tyLePhanTram(xong, tong);

    $("#tkTong").text(tong);
    $("#tkDang").text(dang);
    $("#tkXong").text(xong);
    $("#tkQuaHan").text(quaHan);
    $("#tyLeCongViec").text(ty + "%");
    $("#thanhTienDo").css("width", ty + "%").attr("aria-valuenow", ty);

    // Cảnh báo quá hạn
    if (quaHan > 0) {
        $("#canhBaoQuaHan")
            .removeClass("d-none")
            .text("Có " + quaHan + " công việc đã quá hạn, cần xử lý sớm.");
    } else {
        $("#canhBaoQuaHan").addClass("d-none").text("");
    }
}

function nutThaoTac(id) {
    return '<button type="button" class="btn btn-outline-info btn-sm btn-xem" data-id="' + id + '" aria-label="Xem chi tiết">' +
            '<i class="bi bi-eye"></i></button> ' +
        '<button type="button" class="btn btn-outline-primary btn-sm btn-sua" data-id="' + id + '" aria-label="Sửa">' +
            '<i class="bi bi-pencil"></i></button> ' +
        '<button type="button" class="btn btn-outline-danger btn-xoa btn-sm" data-id="' + id + '" aria-label="Xóa">' +
            '<i class="bi bi-trash"></i></button>';
}

function hienThiCongViec() {
    luuTrangThai();

    const ds = locCongViec();

    thongKeCongViec();
    $("#thongBaoRong").toggleClass("d-none", ds.length > 0);

    // ----- Dạng danh sách (bảng) -----
    const tbody = $("#thanBangCongViec");
    tbody.empty();

    ds.forEach(function (t) {
        const han = thongTinHan(t.deadline, t.status);
        const tep = t.attachment
            ? '<i class="bi bi-paperclip"></i> ' + esc(t.attachment)
            : '<span class="text-muted">Không có</span>';

        tbody.append(
            "<tr>" +
                '<td data-label="Công việc"><strong>' + esc(t.name) + "</strong>" +
                    (t.note ? '<br><small class="text-muted">' + esc(t.note) + "</small>" : "") + "</td>" +
                '<td data-label="Phụ trách">' + esc(t.person) + "</td>" +
                '<td data-label="Ưu tiên">' + badgeUuTien(t.priority) + "</td>" +
                '<td data-label="Trạng thái">' + badgeTrangThai(t.status) + "</td>" +
                '<td data-label="Hạn">' + dinhDangNgay(t.deadline) +
                    '<br><small class="' + han.lop + '">' + han.chu + "</small></td>" +
                '<td data-label="Tệp đính kèm">' + tep + "</td>" +
                '<td data-label="Thao tác" class="text-nowrap">' + nutThaoTac(t.id) + "</td>" +
            "</tr>"
        );
    });

    // ----- Dạng Kanban -----
    TRANG_THAI.forEach(function (trangThai, i) {
        const cot = $("#cotKanban" + i);
        const trongCot = ds.filter(function (t) { return t.status === trangThai; });

        cot.empty();
        $("#demKanban" + i).text(trongCot.length);

        if (trongCot.length === 0) {
            cot.append('<p class="text-muted small text-center my-3">Không có công việc.</p>');
        }

        trongCot.forEach(function (t) {
            const han = thongTinHan(t.deadline, t.status);
            let tuyChon = "";

            TRANG_THAI.forEach(function (tt) {
                tuyChon += '<option value="' + tt + '"' + (tt === t.status ? " selected" : "") + ">" + tt + "</option>";
            });

            cot.append(
                '<div class="card the-kanban shadow-sm mb-3">' +
                    '<div class="card-body">' +
                        '<div class="d-flex justify-content-between align-items-start gap-2 mb-2">' +
                            '<h4 class="h6 mb-0">' + esc(t.name) + "</h4>" + badgeUuTien(t.priority) +
                        "</div>" +
                        '<p class="small mb-1"><i class="bi bi-person"></i> ' + esc(t.person) + "</p>" +
                        '<p class="small mb-1"><i class="bi bi-calendar-event"></i> ' + dinhDangNgay(t.deadline) +
                            ' · <span class="' + han.lop + '">' + han.chu + "</span></p>" +
                        (t.attachment ? '<p class="small mb-2"><i class="bi bi-paperclip"></i> ' + esc(t.attachment) + "</p>" : "") +
                        '<label class="visually-hidden" for="doiTT' + t.id + '">Đổi trạng thái</label>' +
                        '<select id="doiTT' + t.id + '" class="form-select form-select-sm doi-trang-thai mb-2" data-id="' + t.id + '">' +
                            tuyChon + "</select>" +
                        nutThaoTac(t.id) +
                    "</div>" +
                "</div>"
            );
        });
    });
}

function moFormCongViec(id) {
    $("#formCongViec")[0].reset();
    xoaLoi("#formCongViec");
    $("#idCongViec").val("");
    $("#tepHienTai").text("");
    $("#trangThaiCongViec").val("Chưa bắt đầu");
    $("#mucUuTien").val("Trung bình");

    if (id) {
        const t = tasks.find(function (x) { return x.id === id; });

        if (!t) {
            return;
        }

        $("#idCongViec").val(t.id);
        $("#tenCongViec").val(t.name);
        $("#nguoiPhuTrach").val(t.person);
        $("#mucUuTien").val(t.priority);
        $("#trangThaiCongViec").val(t.status);
        $("#hanHoanThanh").val(t.deadline);
        $("#ghiChuCongViec").val(t.note);

        if (t.attachment) {
            $("#tepHienTai").text("Tệp hiện tại: " + t.attachment + " (chọn tệp mới để thay thế)");
        }

        $("#tieuDeModalCongViec").text("Sửa công việc");
        $("#btnLuuCongViec").html('<i class="bi bi-check-circle"></i> Lưu thay đổi');
    } else {
        $("#tieuDeModalCongViec").text("Thêm công việc mới");
        $("#btnLuuCongViec").html('<i class="bi bi-check-circle"></i> Thêm công việc');
    }

    moModal("modalCongViec");
}

function luuCongViec(event) {
    event.preventDefault();
    xoaLoi("#formCongViec");

    const id = $("#idCongViec").val();
    const ten = $("#tenCongViec").val().trim();
    const nguoi = $("#nguoiPhuTrach").val();
    const uuTien = $("#mucUuTien").val();
    const trangThai = $("#trangThaiCongViec").val();
    const han = $("#hanHoanThanh").val();
    const ghiChu = $("#ghiChuCongViec").val().trim();
    const tep = document.getElementById("tepDinhKem").files[0];

    let coLoi = false;

    if (ten.length < 3) {
        datLoi("#tenCongViec", "Tên công việc phải có ít nhất 3 ký tự.");
        coLoi = true;
    }

    if (!nguoi) {
        datLoi("#nguoiPhuTrach", "Vui lòng chọn người phụ trách.");
        coLoi = true;
    }

    if (!han) {
        datLoi("#hanHoanThanh", "Vui lòng chọn hạn hoàn thành.");
        coLoi = true;
    }

    if (coLoi) {
        return;
    }

    if (id) {
        const t = tasks.find(function (x) { return x.id === Number(id); });

        if (t) {
            if (han < t.assignedDate) {
                datLoi("#hanHoanThanh", "Hạn hoàn thành không được trước ngày giao (" + dinhDangNgay(t.assignedDate) + ").");
                return;
            }

            const daDoiTrangThai = t.status !== trangThai;

            t.name = ten;
            t.person = nguoi;
            t.priority = uuTien;
            t.status = trangThai;
            t.deadline = han;
            t.note = ghiChu;

            if (tep) {
                t.attachment = tep.name;
            }

            if (daDoiTrangThai || tep) {
                t.updatedDate = homNay();
            }
        }

        showMessage(trangThai === "Hoàn thành"
            ? "Đã cập nhật. Công việc hoàn thành đã được chuyển sang trang Sản phẩm."
            : "Đã cập nhật công việc.");
    } else {
        if (han < homNay() && trangThai !== "Hoàn thành") {
            // Vẫn cho lưu nhưng báo rõ để người dùng biết công việc sẽ bị tính là quá hạn
            showMessage("Lưu ý: hạn hoàn thành đã qua nên công việc sẽ bị tính là quá hạn.", "warning");
        }

        tasks.push({
            id: idTiepTheo(tasks),
            name: ten,
            person: nguoi,
            priority: uuTien,
            status: trangThai,
            assignedDate: homNay(),
            deadline: han,
            updatedDate: homNay(),
            attachment: tep ? tep.name : "",
            note: ghiChu
        });

        showMessage(trangThai === "Hoàn thành"
            ? "Đã thêm công việc. Công việc hoàn thành đã được chuyển sang trang Sản phẩm."
            : "Đã thêm công việc mới.");
    }

    dongModal("modalCongViec");
    hienThiCongViec();
}

function xemCongViec(id) {
    const t = tasks.find(function (x) { return x.id === id; });

    if (!t) {
        return;
    }

    const han = thongTinHan(t.deadline, t.status);
    const laSanPham = t.status === "Hoàn thành";

    $("#noiDungChiTietCongViec").html(
        '<dl class="row mb-0">' +
            '<dt class="col-sm-4">Tên công việc</dt><dd class="col-sm-8">' + esc(t.name) + "</dd>" +
            '<dt class="col-sm-4">Người phụ trách</dt><dd class="col-sm-8">' + esc(t.person) + "</dd>" +
            '<dt class="col-sm-4">Mức độ ưu tiên</dt><dd class="col-sm-8">' + badgeUuTien(t.priority) + "</dd>" +
            '<dt class="col-sm-4">Trạng thái</dt><dd class="col-sm-8">' + badgeTrangThai(t.status) + "</dd>" +
            '<dt class="col-sm-4">Ngày giao</dt><dd class="col-sm-8">' + dinhDangNgay(t.assignedDate) + "</dd>" +
            '<dt class="col-sm-4">Hạn hoàn thành</dt><dd class="col-sm-8">' + dinhDangNgay(t.deadline) +
                ' (<span class="' + han.lop + '">' + han.chu + "</span>)</dd>" +
            '<dt class="col-sm-4">Tệp đính kèm</dt><dd class="col-sm-8">' +
                (t.attachment ? '<i class="bi bi-paperclip"></i> ' + esc(t.attachment) : "Không có") + "</dd>" +
            '<dt class="col-sm-4">Ghi chú</dt><dd class="col-sm-8">' + (esc(t.note) || "Không có") + "</dd>" +
        "</dl>" +
        (laSanPham
            ? '<div class="alert alert-success mt-3 mb-0"><i class="bi bi-box-seam"></i> Công việc đã hoàn thành nên được tính là sản phẩm ở trang <a href="san-pham.html" class="alert-link">Sản phẩm</a>.</div>'
            : "")
    );

    moModal("modalChiTietCongViec");
}

function khoiTaoCongViec() {
    napThanhVien("#nguoiPhuTrach", false, "-- Chọn thành viên --");
    napThanhVien("#locNguoiPhuTrach", true, "Tất cả thành viên");
    napTrangThai("#trangThaiCongViec", false);
    napTrangThai("#locTrangThai", true);

    hienThiCongViec();

    $("#timCongViec").on("input", hienThiCongViec);
    $("#locTrangThai, #locNguoiPhuTrach, #locUuTien, #sapXepCongViec").on("change", hienThiCongViec);

    $("#btnThemCongViec").on("click", function () { moFormCongViec(null); });
    $("#formCongViec").on("submit", luuCongViec);

    $("#btnDatLaiBoLoc").on("click", function () {
        $("#timCongViec").val("");
        $("#locTrangThai, #locNguoiPhuTrach, #locUuTien").val("all");
        $("#sapXepCongViec").val("mac-dinh");
        hienThiCongViec();
    });

    $("#btnDuLieuMau").on("click", function () {
        tasks = nhanBan(tasksSeed);
        hienThiCongViec();
        showMessage("Đã nạp lại dữ liệu mẫu.", "info");
    });

    // Chuyển giữa dạng danh sách và Kanban
    $("#nutDanhSach, #nutKanban").on("click", function () {
        const laKanban = this.id === "nutKanban";

        $("#khungDanhSach").toggleClass("d-none", laKanban);
        $("#khungKanban").toggleClass("d-none", !laKanban);
        $("#nutDanhSach").toggleClass("active", !laKanban).attr("aria-pressed", String(!laKanban));
        $("#nutKanban").toggleClass("active", laKanban).attr("aria-pressed", String(laKanban));
    });

    ganSuKien("click", ".btn-xem", function () {
        xemCongViec(Number($(this).data("id")));
    });

    ganSuKien("click", ".btn-sua", function () {
        moFormCongViec(Number($(this).data("id")));
    });

    ganSuKien("click", ".btn-xoa", function () {
        const id = Number($(this).data("id"));
        const t = tasks.find(function (x) { return x.id === id; });

        if (t && confirm('Xóa công việc "' + t.name + '"?')) {
            tasks = tasks.filter(function (x) { return x.id !== id; });
            hienThiCongViec();
            showMessage("Đã xóa công việc.");
        }
    });

    // Đổi trạng thái nhanh trong Kanban
    ganSuKien("change", ".doi-trang-thai", function () {
        const id = Number($(this).data("id"));
        const t = tasks.find(function (x) { return x.id === id; });

        if (t) {
            t.status = $(this).val();
            t.updatedDate = homNay();
            hienThiCongViec();
            showMessage(t.status === "Hoàn thành"
                ? "Đã hoàn thành. Công việc đã được chuyển sang trang Sản phẩm."
                : "Đã chuyển sang \"" + t.status + "\".");
        }
    });
}


// ---------- Khởi tạo khi trang tải xong ----------

$(document).ready(function () {
    khoiTaoCongViec();
});
