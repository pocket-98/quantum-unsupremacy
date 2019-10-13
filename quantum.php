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

$a = post_get("a");
$b = post_get("b");

//echo(shell_exec("python3 quantum_adder/quantum_fake.py '$a' '$b'"));
echo(shell_exec("python3 quantum_adder/quantum.py '$a' '$b'"));
?>
