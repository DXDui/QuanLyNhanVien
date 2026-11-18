class Nhansu {
  constructor(
    id,
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLamTrongThang,
    tongLuong,
    loaiNhanVien,
  ) {
    this.id = id;
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLamTrongThang = gioLamTrongThang;
    this.tongLuong = tongLuong;
    this.loaiNhanVien = loaiNhanVien;
  }

  calcTongLuong() {
    if (this.chucVu === "Sếp") {
      return this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      return this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      return this.luongCoBan;
    }

    return 0;
  }

  // Xếp loại nhân viên
  calcLoaiNhanVien() {
    if (this.gioLamTrongThang >= 192) {
      return "Nhân viên xuất sắc";
    } else if (this.gioLamTrongThang >= 176) {
      return "Nhân viên giỏi";
    } else if (this.gioLamTrongThang >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  }
}

export default Nhansu;
