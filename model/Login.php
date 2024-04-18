<?php

class Login
{
    private $conn;
    public $id_account;
    public $user_account;
    public $pass_account;
    public $type_account;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function login($username, $password)
    {
        $query = "SELECT * FROM accounts WHERE user_account = ? AND pass_account = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}
