<?php

include_once "conn.php";
session_start();


if (isset($_SESSION['success'])) {
    echo "Logged in";
    header('location: http://localhost/zavrsni/parking1.php');

}

$errors = [];
if (isset($_POST['login_user'])) {
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    if (empty($username)) {
        array_push($errors, "username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    if (count($errors) == 0) {
        $password = md5($password); //encrypt
        $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $results = mysqli_query($conn, $query);
        if (mysqli_num_rows(mysqli_query($conn, $query)) === 1) {
            echo "success";
            session_start();

            $_SESSION['username'] = $username;
            $_SESSION['success'] = "You are now logged in as admin";
            header('location: http://localhost/zavrsni/scripts/php/login.php');

        } else {
            array_push($errors, "Wrong username or password");
        }
    }
}
?>


<html>
<head>
    <link rel="stylesheet" href="../../public/css/login.css">
</head>
<body>

<?php if (!isset($_SESSION['success'])) { ?>

    <div class="login">

        <img src="../../public/prk1.png" class="logo">
        <h4>
            Login
        </h4>


        <form method="post" action="" class="form">

            <div>
                <label>Username</label>
                <input type="text" name="username">
                <span id="username_validate"></span>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password">
                <span id="pass_validate"></span>
            </div>
            <div>
                <button id="submit" type="submit" name="login_user" class="login_button">Login</button>
            </div>

        </form>

        <p class="err">
            <?php
            if (count($errors)) {
                foreach ($errors as $e)
                    echo $e . "<br>";
            }
            ?>
        </p>
    </div>

<?php } ?>
</body>


</html>
