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

$leftimg = explode(";", post_get("leftimg"))[1];
$rightimg = explode(";", post_get("rightimg"))[1];

//$digit1 = shell_exec("python3 cnn_digits/predict_fake.py '$leftimg'");
$digit1 = shell_exec("python3 cnn_digits/predict.py '$leftimg' '$rightimg' 2> err.txt");

//$digit2 = shell_exec("python3 cnn_digits/predict_fake.py '$rightimg'");
//$digit2 = shell_exec("python3 cnn_digits/predict.py '$rightimg' 2> err2.txt");

print_r($digit1);
?>
