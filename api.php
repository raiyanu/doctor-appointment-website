<?php
header('Content-Type: application/json');

// Database connection
$host = "localhost";
$user = "root";  // Change if needed
$pass = "123";      // Change if needed
$dbname = "db_healthcare"; // Change to your database

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Get SQL query from URL
$query = isset($_GET['query']) ? $_GET['query'] : "";
if (empty($query)) {
    die(json_encode(["error" => "No query provided"]));
}

// Run query
$result = $conn->query($query);
if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

// Fetch and return data
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>