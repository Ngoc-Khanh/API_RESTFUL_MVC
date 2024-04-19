<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/db.php';
include_once '../../model/Student.php';

// Kiểm tra xem có tham số MaSV được truyền từ phía client không
if (isset($_GET['MaSV'])) {
    // Lấy MaSV từ tham số truy vấn
    $MaSV = $_GET['MaSV'];

    // Khởi tạo kết nối đến cơ sở dữ liệu
    $db = new db();
    $connect = $db->connect();

    // Khởi tạo đối tượng Student
    $student = new Student($connect);

    // Thực hiện tìm kiếm theo MaSV
    $result = $student->searchByMaSV($MaSV);

    // Kiểm tra kết quả tìm kiếm
    if ($result) {
        // Nếu tìm thấy sinh viên, trả về thông tin của sinh viên dưới dạng JSON
        echo json_encode($result);
    } else {
        // Nếu không tìm thấy sinh viên, trả về thông báo lỗi
        echo json_encode(array('message' => 'No record found for MaSV: ' . $MaSV));
    }
} else {
    // Nếu không có MaSV được truyền từ phía client, trả về thông báo lỗi
    echo json_encode(array('message' => 'MaSV not provided'));
}
