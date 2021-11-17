<?php

    if(isset($_POST['fileName'])){
		$path = '../tmp/' . $_POST['fileName'];
		
		// Check file exist or not
		if( file_exists($path) ){
			// Remove file
			unlink($path);
			echo 'success';
		}else{
			echo 'error';
		}
	}
	exit;
?>