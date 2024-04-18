# Làm WEB tĩnh sử dụng PHP MVC REST API (RESTFUL API)
<h1> Database Connection </h1>

> <p> Nhớ tạo một forder có tên (config) để sau này gộp bài dễ thay đổi SQL (Database) </p>

<p> Ở đây mình dùng MySQL và đặt tên là db.php </p>

```php
<?php
class db
{
    protected $servername = "localhost";
    protected $username = "root";
    protected $password = "";
    protected $db = "api_resful_kytucxa";
    private $conn;

    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->servername . ";dbname=" . $this->db, $this->username, $this->password);
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfull";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        return $this->conn;
    }
}
?>
```
