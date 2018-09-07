<?php
require_once "scada.php";
require_once "provider.php";

$scada = new scada(new provider());

$d = $scada->scadaTags();
//var_dump($d);
echo json_encode($d);
 ?>
