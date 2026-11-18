// import
import Nhansu from "./../models/nhansu.js";
import Quanly from "./../models/quanly.js";
import Validation from "./../models/validation.js";

const quanly = new Quanly();
const validation = new Validation();

export function getId(id) {
  return document.getElementById(id);
}

function getInfoNhanSu() {
  // Dom tới các thẻ input/select lấy value
  const tknv = getId("tknv").value;
  const name = getId("name").value;
  const email = getId("email").value;
  const password = getId("password").value;
  const datepicker = getId("datepicker").value;
  const luongCB = getId("luongCB").value;
  const chucvu = getId("chucvu").value;
  const gioLam = getId("gioLam").value;
  let id = getId("nhanVienID").value;

  // flag
  let isValid = true;

  // check validation id
  isValid &= validation.checkEmpty(tknv, "tbTKNV");
  isValid &= validation.checkEmpty(name, "tbTen");
  isValid &= validation.checkEmpty(email, "tbEmail");
  isValid &= validation.checkAccount(tknv, "tbTKNV");
  isValid &= validation.checkCharacterString(name, "tbTen");
  isValid &= validation.checkEmail(email, "tbEmail");
  isValid &= validation.checkPassword(password, "tbMatKhau");
  isValid &= validation.checkDate(datepicker, "tbNgay");
  isValid &= validation.checkSalary(luongCB, "tbLuongCB");
  isValid &= validation.checkPosition(chucvu, "tbChucVu");
  isValid &= validation.checkWorkingHours(gioLam, "tbGiolam");

  if (!isValid) return null;

  // Set ID
  if (id == null || id === "") {
    id = Date.now();
  }

  const nhansu = new Nhansu(
    id,
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam,
  );

  // tinh gia khuyen mai
  nhansu.tongLuong = nhansu.calcTongLuong();
  nhansu.loaiNhanVien = nhansu.calcLoaiNhanVien();

  return nhansu;
}

function renderListNhanVien(data) {
  // 1. Khai báo content rỗng
  let content = "";

  // 2. Duyệt qua data
  for (let i = 0; i < data.length; i++) {
    // 2.1 Lấy nhanvien tại vị trí i
    const nhanvien = data[i];

    // console.log(nhanvien.id);

    // 2.2 Tích lũy HTML
    content += `
      <tr>
        <td>${nhanvien.taiKhoan}</td>
        <td>${nhanvien.hoTen}</td>
        <td>${nhanvien.email}</td>
        <td>${nhanvien.ngayLam}</td>
        <td>${nhanvien.chucVu}</td>
        <td>${nhanvien.tongLuong}</td>
        <td>${nhanvien.loaiNhanVien}</td>
        <td>
          <button data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="handleEdit('${nhanvien.id}')">Edit</button>
          <button onclick="handleDelete('${nhanvien.id}')" class="btn btn-danger">Delete</button>
        </td>
        <input type="hidden" id="nhanVienID">
      </tr>
    `;
  }
  // 3. Hiển thị lên giao diện
  getId("tableDanhSach").innerHTML = content;
}

// Lưu danh sách món ăn xuống localStorage
function setLocalStorage() {
  // convert "quanly.arr" => string
  const dataString = JSON.stringify(quanly.arr);
  localStorage.setItem("LIST_NHANVIEN", dataString);
}

// Lấy dữ liệu đã lưu từ localStorage
function getLocalStorage() {
  const dataString = localStorage.getItem("LIST_NHANVIEN");
  // convert string => Json
  if (dataString != null) {
    quanly.arr = JSON.parse(dataString);
    renderListNhanVien(quanly.arr);
  }
}

getLocalStorage();

getId("btnThemNV").onclick = function () {
  const nhanVien = getInfoNhanSu();
  if (!nhanVien) return; // stop
  //   thêm nhanVien vào danh sách
  quanly.add(nhanVien);

  renderListNhanVien(quanly.arr);
  // Gọi hàm setLocalStorage
  setLocalStorage();
};

// BUTTON ADD
getId("btnThem").onclick = function () {
  // Dom tới modal title => thêm
  getId("header-title").innerHTML = "Thêm nhân viên";
  // Dom tới id => gỡ disabled
  getId("tknv").disabled = false;
  getId("btnThemNV").style.display = "block";
  getId("btnCapNhat").style.display = "none";
  // reset form
  getId("nhanVienForm").reset();
};

// DELETE
function handleDelete(id) {
  quanly.delete(id);

  renderListNhanVien(quanly.arr);
  console.log("del");
  setLocalStorage();
}
window.handleDelete = handleDelete;

// EDIT
function handleEdit(id) {
  // Cập nhật lại tên modal
  getId("header-title").innerHTML = "Sửa thông tin";

  // Tìm nhân viên theo ID
  const nhanvien = quanly.getNhanVienById(id);

  if (nhanvien) {
    getId("tknv").value = nhanvien.taiKhoan;
    getId("tknv").disabled = true;

    getId("name").value = nhanvien.hoTen;
    getId("email").value = nhanvien.email;
    getId("password").value = nhanvien.matKhau;
    getId("password").disabled = true;

    getId("datepicker").value = nhanvien.ngayLam;
    getId("luongCB").value = nhanvien.luongCoBan;
    getId("chucvu").value = nhanvien.chucVu;
    getId("chucvu").disabled = true;

    getId("gioLam").value = nhanvien.gioLamTrongThang;

    // Lưu ID để sử dụng khi cập nhật
    getId("nhanVienID").value = nhanvien.id;
  }

  getId("btnThemNV").style.display = "none";
  getId("btnCapNhat").style.display = "block";
}
window.handleEdit = handleEdit;

// Cập nhật món
getId("btnCapNhat").onclick = function () {
  // lấy thông tin từ user mới nhất
  const nhanvien = getInfoNhanSu();

  quanly.update(nhanvien);

  renderListNhanVien(quanly.arr);

  setLocalStorage();
  console.log("Update thành công");
};

// SEARCH
getId("searchName").addEventListener("keyup", function () {
  const keyword = getId("searchName").value;
  const listSearch = quanly.searchNhanVien(keyword);
  renderListNhanVien(listSearch);
});

// SORT
let sortDirection = 0;
// 0: Mặc định
// 1: Tăng dần
// -1: Giảm dần

getId("sortTaiKhoan").onclick = function () {
  sortDirection++;

  if (sortDirection > 1) {
    sortDirection = -1;
  }

  if (sortDirection === 0) {
    // Trường hợp mặc định
    renderListNhanVien(quanly.arr);

    getId("sortTaiKhoan").innerHTML =
      'Tài khoản <i class="fa fa-sort ml-1"></i>';
  } else if (sortDirection === 1) {
    // Tăng dần A -> Z
    quanly.arr.sort((a, b) =>
      a.taiKhoan.localeCompare(b.taiKhoan, "vi", {
        numeric: true,
        sensitivity: "base",
      }),
    );

    getId("sortTaiKhoan").innerHTML =
      'Tài khoản <i class="fa fa-sort-up ml-1"></i>';

    renderListNhanVien(quanly.arr);
  } else {
    // Giảm dần Z -> A
    quanly.arr.sort((a, b) =>
      b.taiKhoan.localeCompare(a.taiKhoan, "vi", {
        numeric: true,
        sensitivity: "base",
      }),
    );

    getId("sortTaiKhoan").innerHTML =
      'Tài khoản <i class="fa fa-sort-down ml-1"></i>';

    renderListNhanVien(quanly.arr);
  }
};
