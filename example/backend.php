<?php
include_once "scada.php";
include_once "provider.php";

$c  = new scada(new provider());
$d = $c->scadaTags();
//var_dump($d);
echo json_encode($d);

 ?>
