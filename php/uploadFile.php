<?php

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'error';
    }else{
        move_uploaded_file($_FILES['file']['tmp_name'], '../tmp/' . $_FILES['file']['name']);
		echo 'success';
    }
	exit;
?>