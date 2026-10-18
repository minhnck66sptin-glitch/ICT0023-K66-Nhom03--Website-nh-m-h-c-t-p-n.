

function khoiTaoTrangChu() {
    const tong = tasks.length;
    const xong = tasks.filter(function (t) { return t.status === "Hoàn thành"; }).length;
    const ty = tyLePhanTram(xong, tong);

    $("#tkTongCongViec").text(tong);
    $("#tkHoanThanh").text(xong);
    $("#tkTyLe").text(ty + "%");
    $("#thanhTienDoChung").css("width", ty + "%").attr("aria-valuenow", ty);

    const giaiDoan = plans.filter(function (p) { return p.status === "Hoàn thành"; }).length;
    $("#tkGiaiDoan").text(giaiDoan + "/" + plans.length);

    const chuaXong = tasks
        .filter(function (t) { return t.status !== "Hoàn thành" && t.deadline; })
        .sort(function (a, b) { return a.deadline.localeCompare(b.deadline); });

    const hop = $("#hanGanNhat");

    if (chuaXong.length === 0) {
        hop.html('<span class="text-success">Tất cả công việc đã hoàn thành.</span>');
        return;
    }

    const t = chuaXong[0];
    const han = thongTinHan(t.deadline, t.status);

    hop.html(
        "<strong>" + esc(t.name) + "</strong><br>" +
        "<small>" + esc(t.person) + " · hạn " + dinhDangNgay(t.deadline) + "</small><br>" +
        '<span class="' + han.lop + '">' + han.chu + "</span>"
    );
}

function khoiTaoSlider() {
    const $danhSach = $("#danhSachThieuKhoaHoc");

    $("#btnCuonPhai").on("click", function () {
        $danhSach.animate({ scrollLeft: "+=300" }, 300);
    });

    $("#btnCuonTrai").on("click", function () {
        $danhSach.animate({ scrollLeft: "-=300" }, 300);
    });
}


$(document).ready(function () {
    khoiTaoTrangChu();
    khoiTaoSlider();
});
