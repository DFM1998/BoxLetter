
<?php
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($cities, JSON_PRETTY_PRINT);
?>