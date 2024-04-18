document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử DOM
    const addButton = document.getElementById('addBtn');
    const updateButton = document.getElementById('updateBtn');
    const deleteButton = document.getElementById('deleteBtn');
    const searchButton = document.getElementById('searchBtn');
    const cancelButton = document.getElementById('cancelBtn');
    const MaPhongInput = document.getElementById('MaPhongInput');
    const MaKhuInput = document.getElementById('MaKhuInput');
    const SoNguoiToiDaInput = document.getElementById('SoNguoiToiDaInput');
    const SoNguoiHienTaiInput = document.getElementById('SoNguoiHienTaiInput');
    const GiaInput = document.getElementById('GiaInput');
    const phongTableBody = document.getElementById('phongTableBody');
    const phongTable = document.getElementById('phongTable');
    const searchInput = document.getElementById('searchInput');

    let selectedPhongId = null;

    // Lấy dữ liệu sinh viên và hiển thị trên bảng khi trang được tải
    fetchPhongs();

    // Hàm để lấy dữ liệu sinh viên từ API và hiển thị trên bảng
    function fetchPhongs() {
        fetch('http://localhost/mvc-test/api/room/read.php')
            .then(response => response.json())
            .then(data => {
                if (data.message === 'No records found') {
                    // Hiển thị thông báo không có bản ghi nếu không có dữ liệu
                    console.log('No records found');
                } else {
                    // Hiển thị dữ liệu sinh viên trên bảng
                    displayPhongs(data.data);
                }
            })
            .catch(error => console.error('Error:', error));
        addButton.disabled = false;
        deleteButton.disabled = true;
        updateButton.disabled = true;
        addButton.style.opacity = '1';
        deleteButton.style.opacity = '0.5';
        updateButton.style.opacity = '0.5';
    }

    // Hàm để hiển thị dữ liệu sinh viên trên bảng
    function displayPhongs(phongs) {
        // Xóa hết dữ liệu cũ trên bảng
        phongTableBody.innerHTML = '';

        // Duyệt qua mảng sinh viên và thêm từng dòng vào bảng
        phongs.forEach(phong => {
            const row = `<tr data-phong-id="${phong.MaPhong}">
            <td>${phong.MaPhong}</td>
            <td>${phong.MaKhu}</td>
            <td>${phong.SoNguoiToiDa}</td>
            <td>${phong.SoNguoiHienTai}</td>
            <td>${phong.Gia}</td>
            </tr>`;
            phongTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Sự kiện click vào hàng trong bảng
    phongTable.addEventListener('click', function (event) {
        const selectedRow = event.target.closest('tr');
        if (selectedRow) {
            const selectedRows = phongTableBody.querySelectorAll('.selected-row');
            selectedRows.forEach(row => {
                row.classList.remove('selected-row');
            });
            // Thêm kiểu cho hàng được chọn
            selectedRow.classList.add('selected-row');

            // Lấy id của sinh viên được chọn
            selectedPhongId = selectedRow.getAttribute('data-phong-id');

            // Lấy thông tin của sinh viên từ API và hiển thị lên các ô input
            fetch(`http://localhost/mvc-test/api/room/show.php?MaPhong=${selectedPhongId}`)
                .then(response => response.json())
                .then(phong => {
                    MaPhongInput.value = phong.MaPhong;
                    MaKhuInput.value = phong.MaKhu;
                    SoNguoiToiDaInput.value = phong.SoNguoiToiDa;
                    SoNguoiHienTaiInput.value = phong.SoNguoiHienTai;
                    GiaInput.value = phong.Gia;

                    // Disable chỉnh sửa ô MaPhong
                    MaPhongInput.disabled = true;
                })
                .catch(error => console.error('Error:', error));

            addButton.disabled = true;
            deleteButton.disabled = false;
            updateButton.disabled = false;
            addButton.style.opacity = '0.5';
            deleteButton.style.opacity = '1';
            updateButton.style.opacity = '1';
        }
    });


    // Sự kiện click vào nút Thêm
    addButton.addEventListener('click', function () {
        const newPhong = {
            MaPhong: MaPhongInput.value,
            MaKhu: MaKhuInput.value,
            SoNguoiToiDa: SoNguoiToiDaInput.value,
            SoNguoiHienTai: SoNguoiHienTaiInput.value,
            Gia: GiaInput.value
        };

        // Kiểm tra xem Mã phòng đã tồn tại chưa bằng cách gửi yêu cầu GET đến API
        fetch(`http://localhost/mvc-test/api/room/show.php?MaPhong=${newPhong.MaPhong}`)
            .then(response => response.json())
            .then(existingPhong => {
                if (existingPhong && existingPhong.MaPhong === newPhong.MaPhong) {
                    // Nếu Mã phòng đã tồn tại, hiển thị thông báo lỗi
                    alert("Mã phòng đã tồn tại. Vui lòng nhập Mã phòng khác!");
                } else {
                    // Nếu Mã phòng chưa tồn tại, thêm mới
                    fetch('http://localhost/mvc-test/api/room/create.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newPhong)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            fetchPhongs();
                            alert("Thêm thành công!");
                        })
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));

        addButton.disabled = false;
        deleteButton.disabled = true;
        updateButton.disabled = true;
        addButton.style.opacity = '1';
        deleteButton.style.opacity = '0.5';
        updateButton.style.opacity = '0.5';
    });


    // Sự kiện click vào nút Sửa
    updateButton.addEventListener('click', function () {
        const updatedPhong = {
            MaPhong: selectedPhongId,
            MaKhu: MaKhuInput.value,
            SoNguoiToiDa: SoNguoiToiDaInput.value,
            SoNguoiHienTai: SoNguoiHienTaiInput.value,
            Gia: GiaInput.value
        };

        fetch('http://localhost/mvc-test/api/room/update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPhong)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchPhongs();
                alert("Sửa thành công!");
            })
            .catch(error => console.error('Error:', error));

        addButton.disabled = false;
        deleteButton.disabled = true;
        updateButton.disabled = true;
        addButton.style.opacity = '1';
        deleteButton.style.opacity = '0.5';
        updateButton.style.opacity = '0.5';
    });

    // Sự kiện click vào nút Xoá
    // deleteButton.addEventListener('click', function() {
    //     if (selectedPhongId) {

    //         fetch(`http://localhost/mvc-test/api/room/delete.php?MaPhong=${selectedPhongId}`, {
    //             method: 'DELETE'
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             fetchPhongs();
    //         })
    //         .catch(error => console.error('Error:', error));
    //     }
    // });

    deleteButton.addEventListener('click', function () {
        if (selectedPhongId) {
            // Hiển thị hộp thoại xác nhận
            var confirmation = confirm("Bạn có chắc chắn muốn xóa không?");

            if (confirmation) {
                // Nếu người dùng chọn "Có"
                fetch(`http://localhost/mvc-test/api/room/delete.php?MaPhong=${selectedPhongId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        fetchPhongs();
                        alert("Xóa thành công!");
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                // Nếu người dùng chọn "Hủy"
                console.log("Hủy xóa phòng");
                // Hoặc có thể thực hiện các hành động khác tùy theo yêu cầu
            }
        } else {
            console.log("Không có phòng được chọn để xóa");
            // Hoặc có thể thực hiện các hành động khác tùy theo yêu cầu
        }
        addButton.disabled = false;
        deleteButton.disabled = true;
        updateButton.disabled = true;
        addButton.style.opacity = '1';
        deleteButton.style.opacity = '0.5';
        updateButton.style.opacity = '0.5';
    });


    // Sự kiện click vào nút Hủy
    cancelButton.addEventListener('click', function () {
        // selectedPhongId = null;
        MaPhongInput.value = '';
        MaKhuInput.value = '';
        SoNguoiToiDaInput.value = '';
        SoNguoiHienTaiInput.value = '';
        GiaInput.value = '';

        addButton.disabled = false;
        deleteButton.disabled = true;
        updateButton.disabled = true;
        addButton.style.opacity = '1';
        deleteButton.style.opacity = '0.5';
        updateButton.style.opacity = '0.5';
    });

    // Gán sự kiện cho nút Tìm kiếm
    searchButton.addEventListener('click', function () {
        // Lấy giá trị ID từ input
        const searchId = searchInput.value;

        // Gọi hàm searchStudent để tìm kiếm sinh viên theo ID
        searchPhong(searchId);
    });

    // Hàm để tìm kiếm sinh viên theo ID và hiển thị kết quả trên bảng
    function searchPhong(MaPhong) {
        // Gọi API để lấy thông tin sinh viên theo ID
        fetch(`http://localhost/mvc-test/api/room/search.php?MaPhong=${MaPhong}`)
            .then(response => response.json())
            .then(data => {
                // Hiển thị kết quả trên bảng
                displayPhongs(data);
            })
            .catch(error => console.error('Error:', error));
    }


});
