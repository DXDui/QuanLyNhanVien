class Quanly {
  constructor() {
    this.arr = [];
  }

  // Thêm
  add(nhanvien) {
    this.arr.push(nhanvien);
  }

  _findIndex(id) {
    let index = -1;

    for (let i = 0; i < this.arr.length; i++) {
      const nhanvien = this.arr[i];

      if (String(nhanvien.id) === String(id)) {
        index = i;
        break;
      }
    }

    return index;
  }

  // Xóa theo ID
  delete(id) {
    // tìm vị trí cần xóa
    let index = this._findIndex(id);

    // nếu tìm thấy
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  // Chỉnh sửa thông tin
  getNhanVienById(id) {
    const index = this._findIndex(id);

    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  }

  // Cập nhật thông tin
  update(nhanvien) {
    const index = this._findIndex(nhanvien.id);

    if (index !== -1) {
      this.arr[index] = nhanvien;
    }
  }

  filterNhanVien(type) {
    if (type === "all") {
      return this.arr;
    }

    // Tạo mảng mới
    let listFilter = [];

    // Duyệt mảng
    for (let i = 0; i < this.arr.length; i++) {
      const nhanvien = this.arr[i];

      // Kiểm tra type
      if (nhanvien.type === type) {
        listFilter.push(nhanvien);
      }
    }

    return listFilter;
  }

  searchNhanVien(keyword) {
    // 1. Tạo danh sách listSearch
    let listSearch = [];

    // 2. Duyệt mảng
    for (let i = 0; i < this.arr.length; i++) {
      const nhanvien = this.arr[i];

      // 2.1 Kiểm tra tên có chứa keyword không
      if (nhanvien.loaiNhanVien.toLowerCase().includes(keyword.toLowerCase())) {
        // 2.2 Thêm nhanvien vào listSearch
        listSearch.push(nhanvien);
      }
    }

    // 3. Trả về danh sách tìm kiếm
    return listSearch;
  }
}

export default Quanly;
