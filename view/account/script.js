document.addEventListener("DOMContentLoaded", function () {

    const userInput = document.getElementById('userInput');
    const passInput = document.getElementById('passInput');
    const typeInput = document.getElementById('typeInput');

    const addButton = document.getElementById('addBtn');
    const updateButton = document.getElementById('updateBtn');
    const deleteButton = document.getElementById('deleteBtn');

    const accountTableBody = document.getElementById('accountTableBody');
    const accountTable = document.getElementById('accountTable');

    let selectedAccountId = null;

    // Lấy dữ liệu sinh viên và hiển thị trên bảng khi trang được tải
    fetchAccounts();

    // Hàm để lấy dữ liệu sinh viên từ API và hiển thị trên bảng
    function fetchAccounts() {
        fetch('http://localhost/mvc-test/api/account/read.php')
            .then(response => response.json())
            .then(data => {
                if (data.message === 'No records found') {
                    // Hiển thị thông báo không có bản ghi nếu không có dữ liệu
                    console.log('No records found');
                } else {
                    // Hiển thị dữ liệu sinh viên trên bảng
                    displayAccounts(data.data);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Hàm để hiển thị dữ liệu sinh viên trên bảng
    function displayAccounts(accounts) {
        // Xóa hết dữ liệu cũ trên bảng
        accountTableBody.innerHTML = '';

        // Duyệt qua mảng tài khoản và thêm từng dòng vào bảng
        accounts.forEach(account => {
            const row = `<tr data-account-id="${account.id_account}">
                        <td>${account.id_account}</td>
                        <td>${account.user_account}</td>
                        <td>${account.pass_account}</td>
                        <td>${account.type_account}</td>
                        <td>
                            <button type="button" id="updateBtn" class="btn-sua">Sửa</button>
                            <button type="button" id="deleteBtn" class="btn-xoa">Xóa</button>
                        </td>
                    </tr>`;
            accountTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Sự kiện click vào hàng trong bảng
    accountTable.addEventListener('click', function (event) {
        const selectedRow = event.target.closest('tr');
        if (selectedRow) {
            // Lấy id của tài khoản được chọn
            selectedAccountId = selectedRow.getAttribute('data-account-id');

            // Lấy thông tin của tài khoản từ API và hiển thị lên các ô input
            fetch(`http://localhost/mvc-test/api/account/show.php?id_account=${selectedAccountId}`)
                .then(response => response.json())
                .then(account => {
                    userInput.value = account.user_account;
                    passInput.value = account.pass_account;
                    typeInput.value = account.type_account;
                })
                .catch(error => console.error('Error:', error));
        }
    });

    // Sự kiện click vào nút Thêm tài khoản
    addButton.addEventListener('click', function () {
        // Kiểm tra xem các trường dữ liệu đã được điền đầy đủ chưa
        if (userInput.value && passInput.value && typeInput.value) {
            // Hiển thị hộp thoại xác nhận
            if (confirm('Bạn có chắc chắn muốn thêm tài khoản mới không?')) {
                const newAccount = {
                    user_account: userInput.value,
                    pass_account: passInput.value,
                    type_account: typeInput.value,
                };

                // Thực hiện yêu cầu API để thêm tài khoản mới
                fetch('http://localhost/mvc-test/api/account/create.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newAccount)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        fetchAccounts();
                    })
                    .catch(error => console.error('Error:', error));
            }
        } else {
            console.log('Vui lòng điền đầy đủ thông tin.');
        }
    });

    // Sự kiện click vào nút Cập nhật sinh viên
    updateButton.addEventListener('click', function () {
        const updatedAccount = {
            id_account: selectedAccountId,
            user_account: userInput.value,
            pass_account: passInput.value,
            type_account: typeInput.value,
        };

        fetch('http://localhost/mvc-test/api/account/update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAccount)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchAccounts();
            })
            .catch(error => console.error('Error:', error));
    });

    // Sự kiện click vào nút Xóa tài khoản
    deleteButton.addEventListener('click', function () {
        if (selectedAccountId) {
            fetch(`http://localhost/mvc-test/api/account/delete.php?id_account=${selectedAccountId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    fetchAccounts();
                })
                .catch(error => console.error('Error:', error));
        }
    });
});