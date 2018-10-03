<?php
?>
<html lang="en">
<head>
    <title>Scada Example</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>

<body>
	<div id="mydiv">
		<img id="bg">
	</div>

	<script type="text/javascript" src="src/RunAjax.js"></script>
	<script type="text/javascript" src="src/ScadaTags.js"></script>

	<script type="text/javascript" src="js/scada.js"></script>
	<script type="text/javascript">

	var params = {
        // backend relatived.
		defaultUrl: "backend/run.php",

		// params for getdata().
		getDataParams: {
			'method': "getInfo",
			'data': {
			}
		},

        //frontend relatived:
        // if set "noGetData: true", ScadaTags.js only create elements,
        // and nodisplay data.
        noGetData: true,

		// html relation:
		div: '#mydiv',
		image: {
		 	id: "bg",
			src: "images/scada.jpg",
		},

		getDataWithDisplay: true,

		// time for timer routine.
		time: {  // time for timer
			getData: 5000,
			create: 1000 //,
		}
	}

	var myScada = new scada( params )

	$( document ).ready(function() {
		myScada.Start();
	});

	</script>

</body>
</html>
