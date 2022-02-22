<?php
include("conn.php");

if(isset($_POST['submit'])){
    $selected_val = $_POST['selectedSensor'];  // Storing Selected Value In Variable
    echo "You have reserved :" .$selected_val;  // Displaying Selected Value

    $query="UPDATE sensors SET is_available='1' WHERE id=".$selected_val;
    echo $query;
    if($conn->query($query) === true){
        echo "Successfully reserved";
        if($selected_val<=10)
            header('location: http://localhost/zavrsni/parking1.php');
        else
            header('location: http://localhost/zavrsni/parking2.php');

    }
    else{
        echo "failure";
    }

}
