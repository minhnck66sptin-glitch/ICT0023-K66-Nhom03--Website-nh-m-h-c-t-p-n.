// ==================================================
// SAN-PHAM.JS – JAVASCRIPT RIÊNG CỦA TRANG SẢN PHẨM
// Nạp SAU script.js (xem thẻ <script> cuối san-pham.html).
// Dùng các hàm và biến chung trong script.js, data.js.
// ==================================================

// ---------- Hàm tiện ích chỉ dùng ở trang này ----------

// Biểu tượng và nhóm theo đuôi tệp
function loaiTep(tenTep) {
    const duoi = (tenTep.split(".").pop() || "").toLowerCase();

    const bang = {
        "tai-lieu":   { ten: "Tài liệu",   icon: "bi-file-earmark-word",  ds: ["doc", "docx", "pdf", "txt", "md"] },
        "trinh-chieu": { ten: "Trình chiếu", icon: "bi-file-earmark-slides", ds: ["ppt", "pptx"] },
        "bang-tinh":  { ten: "Bảng tính",  icon: "bi-file-earmark-excel", ds: ["xls", "xlsx", "csv"] },
        "ma-nguon":   { ten: "Mã nguồn",   icon: "bi-file-earmark-code",  ds: ["html", "css", "js", "json", "zip", "rar"] },
        "hinh-anh":   { ten: "Hình ảnh",   icon: "bi-file-earmark-image", ds: ["png", "jpg", "jpeg", "gif", "svg", "webp"] }
    };

    for (const ma in bang) {
        if (bang[ma].ds.indexOf(duoi) !== -1) {
            return { ma: ma, ten: bang[ma].ten, icon: bang[ma].icon };
        }
    }

    return { ma: "khac", ten: "Khác", icon: "bi-file-earmark" };
}


// ---------- SẢN PHẨM ----------

function layDanhSachSanPham() {
    return tasks
        .filter(function (t) { return t.status === "Hoàn thành"; })
        .map(function (t) {
            const coTep = Boolean(t.attachment);

            return {
                ten: coTep ? t.attachment : t.name,
                coTep: coTep,
                congViec: t.name,
                nguoi: t.person,
                ngay: t.updatedDate || t.deadline,
                loai: coTep
                    ? loaiTep(t.attachment)
                    : { ma: "khac", ten: "Chưa đính kèm tệp", icon: "bi-check2-square" },
                ghiChu: t.note
            };
        });
}

function hienThiSanPham() {
    const tuKhoa = ($("#timSanPham").val() || "").trim().toLowerCase();
    const loai = $("#locLoaiSanPham").val() || "all";
    const sapXep = $("#sapXepSanPham").val() || "moi-nhat";

    const ds = layDanhSachSanPham().filter(function (s) {
        const khop = s.ten.toLowerCase().includes(tuKhoa) ||
            s.congViec.toLowerCase().includes(tuKhoa) ||
            s.nguoi.toLowerCase().includes(tuKhoa);

        return khop && (loai === "all" || s.loai.ma === loai);
    });

    ds.sort(function (a, b) {
        return sapXep === "ten"
            ? a.ten.localeCompare(b.ten, "vi")
            : b.ngay.localeCompare(a.ngay);
    });

    $("#tongSanPham").text(layDanhSachSanPham().length);

    const hop = $("#danhSachSanPham");
    hop.empty();
    $("#thongBaoSanPham").toggleClass("d-none", ds.length > 0);

    ds.forEach(function (s) {
        hop.append(
            '<div class="col-12 col-md-6 col-lg-4">' +
                '<div class="card the-san-pham shadow-sm h-100">' +
                    '<div class="card-body">' +
                        '<div class="bieu-tuong-tep"><i class="bi ' + s.loai.icon + '"></i></div>' +
                        '<h3 class="h5 card-title">' + esc(s.ten) + "</h3>" +
                        '<span class="badge bg-secondary mb-3">' + esc(s.loai.ten) + "</span>" +
                        (s.coTep ? '<p class="mb-1 small"><strong>Từ công việc:</strong> ' + esc(s.congViec) + "</p>" : "") +
                        '<p class="mb-1 small"><strong>Thực hiện:</strong> ' + esc(s.nguoi) + "</p>" +
                        '<p class="mb-0 small"><strong>Cập nhật:</strong> ' + dinhDangNgay(s.ngay) + "</p>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    });
}

function khoiTaoSanPham() {
    hienThiSanPham();

    $("#timSanPham").on("input", hienThiSanPham);
    $("#locLoaiSanPham, #sapXepSanPham").on("change", hienThiSanPham);

    $("#btnDatLaiSP").on("click", function () {
        $("#timSanPham").val("");
        $("#locLoaiSanPham").val("all");
        $("#sapXepSanPham").val("moi-nhat");
        hienThiSanPham();
    });
}


// ---------- Khởi tạo khi trang tải xong ----------

$(document).ready(function () {
    khoiTaoSanPham();
});
