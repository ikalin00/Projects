<?php
include("scripts/php/conn.php");
include "scripts/php/session_check.php";

$query = "SELECT * FROM sensors WHERE parking_id='2'";
$sensors = mysqli_query($conn, $query);
?>

<html>
<head>
    <link rel="stylesheet" href="public/css/style.css">
</head>
</head>

<body>

<!--MENU START-->

<!--MENU START-->
<div class="menu">
    <ul>
        <?php if (isset($_SESSION['success'])) { ?>
            <li>
                <form action="" method="post">
                    <input type="submit" name="logout" value="Logout">
                </form>
                <?php

                if (isset($_POST['logout'])) {

                    session_destroy();
                    session_unset();
                    session_abort();
                    unset($_SESSION['username']);
                    unset($_SESSION['success']);

                    if (!isset($_SESSION['success'])) {
                        echo "Unset session successful";
                        header('location: http://localhost/zavrsni/parking1.php');

                    } else
                        echo "Session present";


                }
                ?>
            </li>
        <?php } ?>

        <li>
            <!--RESERVE START-->
            <div class="reserve">
                <div>
                    <form action="scripts/php/reserveParking.php" method="post">
                        <select name="selectedSensor">
                            <?php while ($rows = mysqli_fetch_assoc($sensors)) { ?>
                                <option value="<?php echo $rows['id'] ?>">
                                    <?php echo "Slot " . substr($rows['id'], -1) ?>
                                </option>

                            <?php } ?>
                        </select>
                        <input type="submit" name="submit" value="Reserve"/>
                    </form>

                </div>

                <?php if (isset($_SESSION['success'])) { ?>
                    <div>
                        <form action="scripts/php/unreserveParking.php" method="post">
                            <select name="selectedSensor">
                                <?php
                                $sensors = mysqli_query($conn, $query);
                                while ($rows = mysqli_fetch_assoc($sensors)) {
                                    ?>
                                    <option value="<?php echo $rows['id'] ?>">
                                        <?php echo "Slot " . substr($rows['id'], -1) ?>
                                    </option>

                                <?php } ?>
                            </select>
                            <input type="submit" name="submit" value="Open"/>
                        </form>

                    </div>
                <?php } ?>
            </div>
            <!--RESERVE END-->

        </li>
        <li>
            <button>
                <a href="parking1.php">
                    <img src="public/prk1.png" class="parkingLink">
                </a>

            </button>
        </li>

        <li>
            <button>
                <a href="parking2.php">
                    <img src="public/prk2.png" class="parkingLink">
                </a>
            </button>
        </li>
    </ul>


</div>

<!--MENU END-->


<div id="parking2">

    <?php if (isset($_SESSION['success'])) { ?>
        <?php
        $sensors = mysqli_query($conn, $query);
        while ($rows = mysqli_fetch_assoc($sensors)) { ?>

            <?php if ($rows['is_available'] == 1) { ?>
                <form action="scripts/php/reserveOnClick.php" method="post">
                    <input type="hidden" name="sensor_id" value="<?php echo $rows['id'] ?>">
                    <button type="submit"
                            name="submit"
                            id="<?php echo "sensor" . $rows['id'] ?>"
                            style="background: forestgreen"
                            onclick="changeColor('<?php echo "sensor" . $rows["id"] ?>')">
                        <?php echo substr($rows['id'], -1) ?>
                    </button>
                </form>
            <?php } else { ?>
                <form action="scripts/php/unreserveOnClick.php" method="post">
                    <input type="hidden" name="sensor_id" value="<?php echo $rows['id'] ?>">
                    <button type="submit"
                            name="submit"
                            id="<?php echo "sensor" . $rows['id'] ?>"
                            style="background: red"
                            onclick="changeColor('<?php echo "sensor" . $rows["id"] ?>')">
                        <?php echo substr($rows['id'], -1) ?>
                    </button>
                </form>
            <?php } ?>
        <?php } ?>
    <?php } else { ?>
        <?php
        $sensors = mysqli_query($conn, $query);
        while ($rows = mysqli_fetch_assoc($sensors)) { ?>

            <?php if ($rows['is_available'] == 1) { ?>
                <button id="<?php echo "sensor" . $rows['id'] ?>" style="background: forestgreen">
                    <?php echo substr($rows['id'], -1) ?>
                </button>
            <?php } else { ?>
                <button id="<?php echo "sensor" . $rows['id'] ?>" style="background: red">
                    <?php echo substr($rows['id'], -1) ?>
                </button>
            <?php } ?>
        <?php } ?>
    <?php } ?>
    <img src="public/Parking2.png" alt="parkingImg"/>

    <script type="text/javascript" src="public/js/reserve.js"></script>

</div>
</body>
</html>