

function locKeHoach() {
    const tuKhoa = ($("#timKeHoach").val() || "").trim().toLowerCase();
    const trangThai = $("#locTrangThaiKeHoach").val() || "all";
    const sapXep = $("#sapXepKeHoach").val() || "start-asc";

    const ketQua = plans.filter(function (p) {
        const khop = p.name.toLowerCase().includes(tuKhoa) ||
            p.goal.toLowerCase().includes(tuKhoa) ||
            (p.note || "").toLowerCase().includes(tuKhoa);

        return khop && (trangThai === "all" || p.status === trangThai);
    });

    ketQua.sort(function (a, b) {
        switch (sapXep) {
            case "start-desc": return b.start.localeCompare(a.start);
            case "end-asc":    return a.end.localeCompare(b.end);
            case "end-desc":   return b.end.localeCompare(a.end);
            default:           return a.start.localeCompare(b.start);
        }
    });

    return ketQua;
}

function hienThiKeHoach() {
    luuTrangThai();

    const ds = locKeHoach();
    const hop = $("#danhSachKeHoach");

    const dem = function (t) {
        return plans.filter(function (p) { return p.status === t; }).length;
    };

    $("#tongKeHoach").text(plans.length);
    $("#keHoachChuaLam").text(dem("Chưa bắt đầu"));
    $("#keHoachDangLam").text(dem("Đang thực hiện"));
    $("#keHoachHoanThanh").text(dem("Hoàn thành"));

    const ty = tyLePhanTram(dem("Hoàn thành"), plans.length);
    $("#thanhTienDoKeHoach").css("width", ty + "%").attr("aria-valuenow", ty);
    $("#tyLeKeHoach").text(ty + "%");

    hop.empty();
    $("#thongBaoKeHoachRong").toggleClass("d-none", ds.length > 0);

    ds.forEach(function (p) {
        let lop = "moc-chua";
        let icon = "bi-circle";

        if (p.status === "Hoàn thành") {
            lop = "moc-xong";
            icon = "bi-check-lg";
        } else if (p.status === "Đang thực hiện") {
            lop = "moc-dang";
            icon = "bi-hourglass-split";
        }

        const han = thongTinHan(p.end, p.status);
        const soNgay = soNgayGiua(p.start, p.end) + 1;

        hop.append(
            '<li class="moc-ke-hoach ' + lop + '">' +
                '<span class="dau-moc" aria-hidden="true"><i class="bi ' + icon + '"></i></span>' +
                '<div class="card shadow-sm">' +
                    '<div class="card-body">' +
                        '<div class="d-flex flex-wrap justify-content-between gap-2 mb-2">' +
                            '<h3 class="h5 mb-0">' + esc(p.name) + "</h3>" +
                            badgeTrangThai(p.status) +
                        "</div>" +
                        '<p class="mb-2"><strong>Mục tiêu:</strong> ' + esc(p.goal) + "</p>" +
                        '<p class="mb-2 text-muted small">' +
                            '<i class="bi bi-calendar-event"></i> ' + dinhDangNgay(p.start) +
                            " → " + dinhDangNgay(p.end) + " (" + soNgay + " ngày) · " +
                            '<span class="' + han.lop + '">' + han.chu + "</span>" +
                        "</p>" +
                        (p.note ? '<p class="mb-3 small"><strong>Ghi chú:</strong> ' + esc(p.note) + "</p>" : "") +
                        '<button type="button" class="btn btn-outline-primary btn-sm btn-sua-ke-hoach" data-id="' + p.id + '">' +
                            '<i class="bi bi-pencil"></i> Sửa</button> ' +
                        '<button type="button" class="btn btn-outline-danger btn-sm btn-xoa-ke-hoach" data-id="' + p.id + '">' +
                            '<i class="bi bi-trash"></i> Xóa</button>' +
                    "</div>" +
                "</div>" +
            "</li>"
        );
    });
}

function moFormKeHoach(id) {
    const form = $("#formKeHoach");

    form[0].reset();
    xoaLoi("#formKeHoach");
    $("#idKeHoach").val("");
    $("#trangThaiKeHoach").val("Chưa bắt đầu");

    if (id) {
        const p = plans.find(function (x) { return x.id === id; });

        if (!p) {
            return;
        }

        $("#idKeHoach").val(p.id);
        $("#tenKeHoach").val(p.name);
        $("#mucTieuKeHoach").val(p.goal);
        $("#ngayBatDauKeHoach").val(p.start);
        $("#ngayKetThucKeHoach").val(p.end);
        $("#trangThaiKeHoach").val(p.status);
        $("#ghiChuKeHoach").val(p.note);
        $("#tieuDeModalKeHoach").text("Sửa giai đoạn");
    } else {
        $("#tieuDeModalKeHoach").text("Thêm giai đoạn mới");
    }

    moModal("modalKeHoach");
}

function luuKeHoach(event) {
    event.preventDefault();
    xoaLoi("#formKeHoach");

    const id = $("#idKeHoach").val();
    const ten = $("#tenKeHoach").val().trim();
    const mucTieu = $("#mucTieuKeHoach").val().trim();
    const batDau = $("#ngayBatDauKeHoach").val();
    const ketThuc = $("#ngayKetThucKeHoach").val();
    const trangThai = $("#trangThaiKeHoach").val();
    const ghiChu = $("#ghiChuKeHoach").val().trim();

    let coLoi = false;

    if (ten.length < 3) {
        datLoi("#tenKeHoach", "Tên kế hoạch phải có ít nhất 3 ký tự.");
        coLoi = true;
    }

    if (mucTieu.length < 3) {
        datLoi("#mucTieuKeHoach", "Vui lòng nhập mục tiêu thực hiện.");
        coLoi = true;
    }

    if (!batDau) {
        datLoi("#ngayBatDauKeHoach", "Vui lòng chọn ngày bắt đầu.");
        coLoi = true;
    }

    if (!ketThuc) {
        datLoi("#ngayKetThucKeHoach", "Vui lòng chọn ngày kết thúc.");
        coLoi = true;
    }

    if (batDau && ketThuc && ketThuc < batDau) {
        datLoi("#ngayKetThucKeHoach", "Ngày kết thúc không được trước ngày bắt đầu.");
        coLoi = true;
    }

    if (coLoi) {
        return;
    }

    const duLieu = {
        name: ten, goal: mucTieu, start: batDau, end: ketThuc,
        status: trangThai, note: ghiChu
    };

    if (id) {
        const p = plans.find(function (x) { return x.id === Number(id); });

        if (p) {
            Object.assign(p, duLieu);
        }

        showMessage("Đã cập nhật giai đoạn.");
    } else {
        duLieu.id = idTiepTheo(plans);
        plans.push(duLieu);
        showMessage("Đã thêm giai đoạn mới.");
    }

    dongModal("modalKeHoach");
    hienThiKeHoach();
}

function khoiTaoKeHoach() {
    napTrangThai("#trangThaiKeHoach", false);
    napTrangThai("#locTrangThaiKeHoach", true);

    hienThiKeHoach();

    $("#timKeHoach").on("input", hienThiKeHoach);
    $("#locTrangThaiKeHoach, #sapXepKeHoach").on("change", hienThiKeHoach);

    $("#btnThemKeHoach").on("click", function () { moFormKeHoach(null); });
    $("#formKeHoach").on("submit", luuKeHoach);

    $("#btnDatLaiKeHoach").on("click", function () {
        $("#timKeHoach").val("");
        $("#locTrangThaiKeHoach").val("all");
        $("#sapXepKeHoach").val("start-asc");
        hienThiKeHoach();
    });

    $("#btnDuLieuMauKeHoach").on("click", function () {
        plans = nhanBan(plansSeed);
        hienThiKeHoach();
        showMessage("Đã nạp lại dữ liệu mẫu.", "info");
    });

    ganSuKien("click", ".btn-sua-ke-hoach", function () {
        moFormKeHoach(Number($(this).data("id")));
    });

    ganSuKien("click", ".btn-xoa-ke-hoach", function () {
        const id = Number($(this).data("id"));
        const p = plans.find(function (x) { return x.id === id; });

        if (p && confirm('Xóa giai đoạn "' + p.name + '"?')) {
            plans = plans.filter(function (x) { return x.id !== id; });
            hienThiKeHoach();
            showMessage("Đã xóa giai đoạn.");
        }
    });
}


$(document).ready(function () {
    khoiTaoKeHoach();
});
