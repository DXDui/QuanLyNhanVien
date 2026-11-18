import { getId } from "./../controllers/main.js";

class Validation {
  checkEmpty(value, divId) {
    if (value === "") {
      this.showError(divId, "Vui long nhap id");
    }
    //hợp lệ
    return this.showSuccess(divId);
  }

  // Tài khoản: 4 - 6 ký số
  checkAccount(value, divId) {
    const regex = /^.{4,6}$/;

    if (!regex.test(value)) {
      return this.showError(divId, "Tài khoản phải có từ 4 - 6 ký số");
    }

    return this.showSuccess(divId);
  }

  checkCharacterString(value, divId) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      return this.showSuccess(divId);
    }

    return this.showError(divId, "Tên nhân viên chỉ được chứa chữ");
  }

  // Email
  checkEmail(value, divId) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
      return this.showError(divId, "Email không đúng định dạng");
    }

    return this.showSuccess(divId);
  }

  // Mật khẩu: 6 - 10 ký tự, ít nhất 1 số,
  // 1 chữ in hoa và 1 ký tự đặc biệt
  checkPassword(value, divId) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;

    if (!regex.test(value)) {
      return this.showError(
        divId,
        "Mật khẩu phải từ 6 - 10 ký tự, gồm ít nhất 1 chữ in hoa, 1 số và 1 ký tự đặc biệt",
      );
    }

    return this.showSuccess(divId);
  }

  // Ngày làm: mm/dd/yyyy
  checkDate(value, divId) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!regex.test(value)) {
      return this.showError(divId, "Ngày làm phải có định dạng mm/dd/yyyy");
    }

    const [month, day, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return this.showError(divId, "Ngày làm không hợp lệ");
    }

    return this.showSuccess(divId);
  }

  // Lương cơ bản: 1.000.000 - 20.000.000
  checkSalary(value, divId) {
    const salary = Number(value);

    if (
      value === "" ||
      isNaN(salary) ||
      salary < 1000000 ||
      salary > 20000000
    ) {
      return this.showError(
        divId,
        "Lương cơ bản phải từ 1.000.000 - 20.000.000",
      );
    }

    return this.showSuccess(divId);
  }

  // Chức vụ
  checkPosition(value, divId) {
    const positions = ["Sếp", "Trưởng phòng", "Nhân viên"];

    if (!positions.includes(value)) {
      return this.showError(divId, "Vui lòng chọn chức vụ hợp lệ");
    }

    return this.showSuccess(divId);
  }

  // Giờ làm: 80 - 200 giờ
  checkWorkingHours(value, divId) {
    const hours = Number(value);

    if (value === "" || isNaN(hours) || hours < 80 || hours > 200) {
      return this.showError(divId, "Số giờ làm phải từ 80 - 200 giờ");
    }

    return this.showSuccess(divId);
  }

  // ----------------
  // Hiển thị lỗi
  showError(divId, message) {
    getId(divId).innerHTML = message;
    getId(divId).style.display = "block";
    getId(divId).style.color = "#dc3545";
    return false;
  }

  // Ẩn lỗi
  showSuccess(divId) {
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }
}

export default Validation;
