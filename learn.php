<?php

// see if var is defined in get or post vars
function post_get($var) {
    if (isset($_GET[$var]) && strlen($_GET[$var]) > 0) {
        return $_GET[$var];
    } else if (isset($_POST[$var]) && strlen($_POST[$var]) > 0) {
        return $_POST[$var];
    } else {
        return null;
    }
}

$leftimg = post_get("leftimg");
$rightimg = post_get("rightimg");

$digit1 = shell_exec("python3 cnn_digits/predict_fake.py");
//$digit1 = shell_exec("python3 cnn_digits/predict.py $leftimg");

$digit2 = shell_exec("python3 cnn_digits/predict_fake.py");
//$digit2 = shell_exec("python3 cnn_digits/predict.py $rightimg");

print_r($digit_1);
?>
