// ==================================================
// SCRIPT.JS – PHẦN DÙNG CHUNG CHO CẢ 6 TRANG
// Gồm: dữ liệu trong phiên, lưu/khôi phục khi đổi trang,
// hàm tiện ích, chế độ sáng/tối.
// JS riêng của từng trang nằm ở: index.js, ke-hoach.js, cong-viec.js,
// phan-cong.js, san-pham.js, nhat-ky.js (nạp SAU tệp này).
// Yêu cầu: nạp jQuery, Bootstrap và data.js trước tệp này.
// ==================================================

// ---------- 1. DỮ LIỆU TRONG PHIÊN ----------

function nhanBan(duLieu) {
    return JSON.parse(JSON.stringify(duLieu));
}

let tasks = nhanBan(tasksSeed);
let plans = nhanBan(plansSeed);
let journal = nhanBan(journalSeed);
let assignments = nhanBan(assignmentsSeed);

function idTiepTheo(danhSach) {
    return danhSach.reduce(function (max, item) {
        return Math.max(max, item.id);
    }, 0) + 1;
}


// ---------- Giữ dữ liệu khi chuyển giữa các trang ----------
// Không dùng localStorage hay cookie. Dữ liệu và chế độ sáng/tối được giữ tạm trong window.name của
// tab đang mở, nên bấm menu sang trang khác vẫn còn. Nhấn F5 (tải lại trang) hoặc
// mở trang trong tab mới thì dữ liệu trở về dữ liệu mẫu.

function luuTrangThai() {
    try {
        window.name = JSON.stringify({
            khoa: "nhom3-du-lieu",
            toi: document.body.classList.contains("dark-mode"),
            tasks: tasks,
            plans: plans,
            journal: journal,
            assignments: assignments
        });
    } catch (loi) {
        // Không lưu được thì bỏ qua, website vẫn dùng bình thường
    }
}

function khoiPhucDuLieu() {
    let daLuu = null;

    try {
        daLuu = JSON.parse(window.name);
    } catch (loi) {
        daLuu = null;
    }

    if (!daLuu || daLuu.khoa !== "nhom3-du-lieu") {
        return;
    }

    // Giao diện sáng/tối dùng chung cho mọi trang (kể cả khi tải lại)
    if (daLuu.toi) {
        document.body.classList.add("dark-mode");
    }

    let taiLai = false;

    try {
        const dieuHuong = performance.getEntriesByType("navigation")[0];
        taiLai = Boolean(dieuHuong) && dieuHuong.type === "reload";
    } catch (loi) {
        taiLai = false;
    }

    // Tải lại trang: dữ liệu quay về dữ liệu mẫu (giao diện sáng/tối vẫn giữ)
    if (taiLai) {
        return;
    }

    tasks = daLuu.tasks || tasks;
    plans = daLuu.plans || plans;
    journal = daLuu.journal || journal;
    assignments = daLuu.assignments || assignments;
}

khoiPhucDuLieu();
window.addEventListener("pagehide", luuTrangThai);


// ---------- 2. HÀM TIỆN ÍCH ----------

// Chống chèn mã HTML khi hiển thị chữ người dùng nhập
function esc(text) {
    return String(text === null || text === undefined ? "" : text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Ngày hôm nay dạng yyyy-mm-dd (theo giờ máy)
function homNay() {
    const d = new Date();
    const thang = String(d.getMonth() + 1).padStart(2, "0");
    const ngay = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + thang + "-" + ngay;
}

// yyyy-mm-dd -> dd/mm/yyyy
function dinhDangNgay(giaTri) {
    if (!giaTri) {
        return "Chưa có";
    }

    const p = giaTri.split("-");

    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : giaTri;
}

// Số ngày từ ngày a đến ngày b (âm nghĩa là b trước a)
function soNgayGiua(a, b) {
    const ms = new Date(b + "T00:00:00") - new Date(a + "T00:00:00");
    return Math.round(ms / 86400000);
}

// Cho biết còn bao nhiêu ngày / đã quá hạn
function thongTinHan(han, trangThai) {
    if (trangThai === "Hoàn thành") {
        return { chu: "Đã hoàn thành", lop: "text-success", quaHan: false };
    }

    if (!han) {
        return { chu: "Chưa có hạn", lop: "text-muted", quaHan: false };
    }

    const n = soNgayGiua(homNay(), han);

    if (n < 0) {
        return { chu: "Quá hạn " + (-n) + " ngày", lop: "text-danger fw-bold", quaHan: true };
    }

    if (n === 0) {
        return { chu: "Hết hạn hôm nay", lop: "text-warning-emphasis fw-bold", quaHan: false };
    }

    return { chu: "Còn " + n + " ngày", lop: "text-muted", quaHan: false };
}

function badgeTrangThai(trangThai) {
    let lop = "bg-secondary";

    if (trangThai === "Đang thực hiện") {
        lop = "bg-primary";
    } else if (trangThai === "Hoàn thành") {
        lop = "bg-success";
    }

    return '<span class="badge ' + lop + '">' + esc(trangThai) + "</span>";
}

// Thông báo nổi ở góc màn hình
function showMessage(noiDung, loai) {
    const kieu = loai || "success";
    const hop = $("#thongBaoChung");

    if (hop.length === 0) {
        return;
    }

    const thongBao = $(
        '<div class="alert alert-' + kieu + ' alert-dismissible fade show shadow" role="alert">' +
        esc(noiDung) +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Đóng"></button>' +
        "</div>"
    );

    hop.empty().append(thongBao);

    setTimeout(function () {
        thongBao.fadeOut(300, function () {
            $(this).remove();
        });
    }, 3500);
}

// Gắn sự kiện cho cả trang một lần duy nhất (tránh bị gắn trùng khi chuyển trang)
function ganSuKien(suKien, selector, ham) {
    $(document).off(suKien + ".trang", selector).on(suKien + ".trang", selector, ham);
}

// Hiện / xóa lỗi dưới từng ô nhập
function datLoi(selector, thongDiep) {
    const o = $(selector);

    o.addClass("is-invalid");
    o.closest(".nhom-truong").find(".invalid-feedback").text(thongDiep);
}

function xoaLoi(formSelector) {
    $(formSelector).find(".is-invalid").removeClass("is-invalid");
    $(formSelector).find(".invalid-feedback").text("");
}

function moModal(id) {
    const el = document.getElementById(id);

    if (el && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(el).show();
    }
}

function dongModal(id) {
    const el = document.getElementById(id);

    if (el && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(el).hide();
    }
}

// Đổ danh sách thành viên vào một ô <select>
function napThanhVien(selector, coTatCa, nhanMacDinh) {
    const o = $(selector);

    if (o.length === 0) {
        return;
    }

    o.empty();
    o.append($("<option></option>").val(coTatCa ? "all" : "").text(nhanMacDinh));

    membersData.forEach(function (m) {
        o.append($("<option></option>").val(m.name).text(m.name));
    });
}

// Đổ danh sách trạng thái vào một ô <select>
function napTrangThai(selector, coTatCa) {
    const o = $(selector);

    if (o.length === 0) {
        return;
    }

    o.empty();

    if (coTatCa) {
        o.append($("<option></option>").val("all").text("Tất cả trạng thái"));
    }

    TRANG_THAI.forEach(function (t) {
        o.append($("<option></option>").val(t).text(t));
    });
}

function tyLePhanTram(tu, mau) {
    return mau === 0 ? 0 : Math.round((tu / mau) * 100);
}


// ==================================================
// CHẾ ĐỘ SÁNG / TỐI (dùng chung, nhớ khi đổi trang)
// ==================================================

function capNhatNutGiaoDien() {
    const toi = $("body").hasClass("dark-mode");

    $("#themeBtn")
        .attr("aria-pressed", String(toi))
        .attr("title", toi ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối")
        .html(toi
            ? '<i class="bi bi-sun-fill"></i> <span class="theme-text"></span>'
            : '<i class="bi bi-moon-stars-fill"></i> <span class="theme-text"></span>');
}


// ==================================================
// KHỞI TẠO CHUNG (nút sáng/tối). Mỗi trang tự khởi tạo ở tệp JS riêng.
// ==================================================

$(document).ready(function () {
    $("#themeBtn").on("click", function () {
        $("body").toggleClass("dark-mode");
        capNhatNutGiaoDien();
        luuTrangThai();
    });

    capNhatNutGiaoDien();
});
