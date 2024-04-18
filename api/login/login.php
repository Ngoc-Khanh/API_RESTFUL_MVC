<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Kết nối cơ sở dữ liệu
include_once '../../config/db.php';
include_once '../../model/Login.php';

// Lấy dữ liệu đăng nhập từ frontend
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

// Kết nối cơ sở dữ liệu8
$db = new db();
$connect = $db->connect();

// Khởi tạo đối tượng Account
$account = new Login($connect);

// Kiểm tra đăng nhập bằng model
if ($account->login($username, $password)) {
    echo json_encode(array('success' => true, 'redirect' => '../../view/account/index.html'));
} else {
    echo json_encode(array('success' => false));
}
