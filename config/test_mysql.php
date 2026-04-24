<?php
error_reporting(E_ALL);
$link = mysqli_connect('127.0.0.1', 'root', 'root');
if (mysqli_connect_error()) {
    echo "Erro: " . mysqli_connect_error();
} else {
    echo "Conexão OK via TCP!";
}
?>