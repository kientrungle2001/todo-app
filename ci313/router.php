<?php
// Get the requested URI
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Directly serve files if they exist
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Otherwise, route through CodeIgniter's index.php
$_SERVER['SCRIPT_NAME'] = '/index.php';
include_once __DIR__ . '/index.php';
