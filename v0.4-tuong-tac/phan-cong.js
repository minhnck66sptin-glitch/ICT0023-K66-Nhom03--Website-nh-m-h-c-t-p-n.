// ==================================================
// PHAN-CONG.JS – JAVASCRIPT RIÊNG CỦA TRANG PHÂN CÔNG
// Nạp SAU script.js (xem thẻ <script> cuối phan-cong.html).
// Dùng các hàm và biến chung trong script.js, data.js.
// ==================================================

// ---------- PHÂN CÔNG NHIỆM VỤ ----------

const LOP_AVATAR = ["pc-av-1", "pc-av-2", "pc-av-3", "pc-av-4"];
let pcDangDong = {};   // nhiệm vụ nào đang thu gọn (theo id)

function chuCaiTen(ten) {
    const phan = ten.trim().split(/\s+/);
    return phan[phan.length - 1].charAt(0).toUpperCase();
}

function lopAvatar(ten) {
    const vt = membersData.findIndex(function (m) { return m.name === ten; });
    return LOP_AVATAR[(vt < 0 ? 0 : vt) % LOP_AVATAR.length];
}

function lopTrangThaiPC(trangThai) {
    if (trangThai === "Hoàn thành") { return "pc-xong"; }
    if (trangThai === "Đang thực hiện") { return "pc-dang"; }
    return "pc-chua";
}

function hienThiPhanCong() {
    luuTrangThai();

    const tuKhoa = ($("#timPhanCong").val() || "").trim().toLowerCase();

    const ds = assignments.filter(function (a) {
        return !tuKhoa ||
            a.name.toLowerCase().includes(tuKhoa) ||
            a.members.some(function (m) {
                return m.name.toLowerCase().includes(tuKhoa) || (m.content || "").toLowerCase().includes(tuKhoa);
            });
    });

    const hop = $("#danhSachPC");
    hop.empty();
    $("#thongBaoPhanCongRong").toggleClass("d-none", ds.length > 0);
    $("#dauBangPC").toggleClass("d-none", ds.length === 0);

    ds.forEach(function (a) {
        const stt = assignments.indexOf(a) + 1;
        const han = thongTinHan(a.deadline, a.status);
        const dong = pcDangDong[a.id] ? " pc-dong" : "";
        let tuyChon = "";
        let dsThanhVien = "";

        TRANG_THAI.forEach(function (tt) {
            tuyChon += '<option value="' + tt + '"' + (tt === a.status ? " selected" : "") + ">" + tt + "</option>";
        });

        a.members.forEach(function (m, vt) {
            dsThanhVien +=
                '<div class="pc-tv">' +
                    '<span class="pc-nguoi"><span class="pc-av ' + lopAvatar(m.name) + '">' + esc(chuCaiTen(m.name)) + "</span>" +
                        "<span>" + esc(m.name) + "</span></span>" +
                    '<input type="text" class="form-control form-control-sm pc-nd" maxlength="150" ' +
                        'data-id="' + a.id + '" data-vt="' + vt + '" value="' + esc(m.content) + '" ' +
                        'placeholder="Chưa nhập nhiệm vụ" aria-label="Nhiệm vụ của ' + esc(m.name) + '">' +
                "</div>";
        });

        hop.append(
            '<div class="pc-the ' + lopTrangThaiPC(a.status) + dong + '">' +
                '<div class="pc-dau" role="button" tabindex="0" data-id="' + a.id + '" aria-expanded="' + (dong ? "false" : "true") + '">' +
                    '<span class="pc-so">' + stt + "</span>" +
                    '<span class="pc-ten">' + esc(a.name) + "</span>" +
                    '<span class="pc-badge">' + esc(a.status) + "</span>" +
                    '<span class="pc-dau-phai">' +
                        '<button type="button" class="pc-xoa btn-xoa-pc" data-id="' + a.id + '" aria-label="Xóa nhiệm vụ ' + esc(a.name) + '"><i class="bi bi-trash"></i></button>' +
                        '<i class="bi bi-chevron-down pc-mui-ten"></i>' +
                    "</span>" +
                "</div>" +
                '<div class="pc-than">' +
                    '<div class="pc-o" data-label="STT">' + stt + "</div>" +
                    '<div class="pc-o" data-label="Tên công việc">' + esc(a.name) + "</div>" +
                    '<div class="pc-o" data-label="Thời gian">' + dinhDangNgay(a.deadline) +
                        '<br><small class="' + han.lop + '">' + han.chu + "</small></div>" +
                    '<div class="pc-o" data-label="Trạng thái">' +
                        '<select class="form-select form-select-sm pc-chon-tt doi-trang-thai-pc" data-id="' + a.id + '" aria-label="Trạng thái của ' + esc(a.name) + '">' +
                            tuyChon + "</select></div>" +
                    '<div class="pc-o" data-label="Phân công">' + dsThanhVien + "</div>" +
                "</div>" +
            "</div>"
        );
    });

    hienThiThongKeThanhVien();
}

function hienThiThongKeThanhVien() {
    const tbody = $("#thanBangThongKe");
    tbody.empty();

    membersData.forEach(function (m) {
        const cua = assignments.filter(function (a) {
            return a.members.some(function (x) { return x.name === m.name; });
        });
        const xong = cua.filter(function (a) { return a.status === "Hoàn thành"; }).length;
        const quaHan = cua.filter(function (a) { return thongTinHan(a.deadline, a.status).quaHan; }).length;
        const ty = tyLePhanTram(xong, cua.length);

        tbody.append(
            "<tr>" +
                '<td data-label="Thành viên"><strong>' + esc(m.name) + "</strong></td>" +
                '<td data-label="Vai trò">' + esc(m.role) + "</td>" +
                '<td data-label="Số nhiệm vụ">' + cua.length + "</td>" +
                '<td data-label="Hoàn thành">' + xong + "</td>" +
                '<td data-label="Quá hạn">' + (quaHan > 0 ? '<span class="text-danger fw-bold">' + quaHan + "</span>" : "0") + "</td>" +
                '<td data-label="Tỷ lệ hoàn thành">' +
                    '<div class="d-flex align-items-center gap-2">' +
                        '<div class="progress flex-grow-1" role="progressbar" aria-label="Tỷ lệ hoàn thành của ' + esc(m.name) + '" ' +
                            'aria-valuenow="' + ty + '" aria-valuemin="0" aria-valuemax="100">' +
                            '<div class="progress-bar bg-success" style="width:' + ty + '%"></div></div>' +
                        '<span class="small">' + ty + "%</span>" +
                    "</div></td>" +
            "</tr>"
        );
    });
}

function datLaiFormPhanCong() {
    // chạy sau khi trình duyệt tự reset biểu mẫu
    setTimeout(function () {
        xoaLoi("#formPhanCong");
        $("#trangThaiPC").val("Đang thực hiện");
    }, 0);
}

function luuPhanCong(event) {
    event.preventDefault();
    xoaLoi("#formPhanCong");

    const ten = $("#tenPC").val().trim();
    const han = $("#hanPC").val();
    const trangThai = $("#trangThaiPC").val();
    const noiDung = $("#noiDungPC").val().trim();
    const chon = $(".pc-chon-tv:checked").map(function () { return this.value; }).get();

    let coLoi = false;

    if (ten.length < 3) {
        datLoi("#tenPC", "Tên công việc phải có ít nhất 3 ký tự.");
        coLoi = true;
    } else if (assignments.some(function (a) { return a.name.toLowerCase() === ten.toLowerCase(); })) {
        datLoi("#tenPC", "Đã có nhiệm vụ trùng tên này.");
        coLoi = true;
    }

    if (chon.length === 0) {
        $("#loiThanhVienPC").text("Vui lòng chọn ít nhất 1 thành viên.");
        coLoi = true;
    }

    if (coLoi) {
        return;
    }

    assignments.push({
        id: idTiepTheo(assignments),
        name: ten,
        deadline: han,
        status: trangThai,
        // giữ đúng thứ tự thành viên trong nhóm
        members: membersData
            .filter(function (m) { return chon.indexOf(m.name) !== -1; })
            .map(function (m) { return { name: m.name, content: noiDung }; })
    });

    $("#formPhanCong")[0].reset();
    datLaiFormPhanCong();
    hienThiPhanCong();
    showMessage("Đã thêm nhiệm vụ mới.");
}

function chuyenTabPhanCong(xemBang) {
    $("#tabDanhSach").toggleClass("active", !xemBang).attr("aria-pressed", String(!xemBang));
    $("#tabBang").toggleClass("active", xemBang).attr("aria-pressed", String(xemBang));
    $("#khungDanhSachPC").toggleClass("d-none", xemBang);
    $("#khungTimPC").toggleClass("d-none", xemBang);
    $("#khungBangPC").toggleClass("d-none", !xemBang);
}

function khoiTaoPhanCong() {
    napTrangThai("#trangThaiPC", false);
    $("#trangThaiPC").val("Đang thực hiện");

    membersData.forEach(function (m, i) {
        $("#thanhVienPC").append(
            '<div class="form-check">' +
                '<input class="form-check-input pc-chon-tv" type="checkbox" id="tvPC' + i + '" value="' + esc(m.name) + '">' +
                '<label class="form-check-label" for="tvPC' + i + '">' + esc(m.name) + "</label>" +
            "</div>"
        );
    });

    hienThiPhanCong();

    $("#timPhanCong").on("input", hienThiPhanCong);
    $("#tabDanhSach").on("click", function () { chuyenTabPhanCong(false); });
    $("#tabBang").on("click", function () { chuyenTabPhanCong(true); });
    $("#formPhanCong").on("submit", luuPhanCong);
    $("#btnLamLaiPC").on("click", datLaiFormPhanCong);
    $(".pc-chon-tv").on("change", function () { $("#loiThanhVienPC").text(""); });

    // Thu gọn / mở rộng một nhiệm vụ
    ganSuKien("click", ".pc-dau", function (e) {
        if ($(e.target).closest(".btn-xoa-pc").length) {
            return;
        }

        const id = Number($(this).data("id"));
        pcDangDong[id] = !pcDangDong[id];
        $(this).closest(".pc-the").toggleClass("pc-dong", pcDangDong[id]);
        $(this).attr("aria-expanded", String(!pcDangDong[id]));
    });

    ganSuKien("keydown", ".pc-dau", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target === this) {
            e.preventDefault();
            $(this).trigger("click");
        }
    });

    // Sửa nhiệm vụ riêng của từng thành viên
    ganSuKien("change", ".pc-nd", function () {
        const a = assignments.find(function (x) { return x.id === Number($(this).data("id")); }.bind(this));

        if (a && a.members[Number($(this).data("vt"))]) {
            a.members[Number($(this).data("vt"))].content = $(this).val().trim();
            luuTrangThai();
            showMessage("Đã cập nhật nhiệm vụ của thành viên.");
        }
    });

    // Đổi trạng thái nhiệm vụ
    ganSuKien("change", ".doi-trang-thai-pc", function () {
        const a = assignments.find(function (x) { return x.id === Number($(this).data("id")); }.bind(this));

        if (a) {
            a.status = $(this).val();
            hienThiPhanCong();
            showMessage("Đã cập nhật trạng thái nhiệm vụ.");
        }
    });

    ganSuKien("click", ".btn-xoa-pc", function () {
        const id = Number($(this).data("id"));
        const a = assignments.find(function (x) { return x.id === id; });

        if (a && confirm("Xóa nhiệm vụ \"" + a.name + "\"?")) {
            assignments = assignments.filter(function (x) { return x.id !== id; });
            hienThiPhanCong();
            showMessage("Đã xóa nhiệm vụ.");
        }
    });
}


// ---------- Khởi tạo khi trang tải xong ----------

$(document).ready(function () {
    khoiTaoPhanCong();
});
