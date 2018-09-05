<html lang="en">
<?php
//echo "hello world\r\n";

?>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Scada Example</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<style>
.outer{
  text-align: center;
}
.outer img{
  display: inline-block;
}

#mydiv {
    position:relative; //absolute;
    background-color: #f3f3f3;
	justify-content: center;
}
</style>

<body>

    <div id="wrapper">

        <!-- Page Content -->
        <!-- <div id="page-wrapper"> -->

		<div class="container-fluid">
			<div class="row">
				<!--
				<div class="col-lg-12">
					<h1 id='pageHeader' class="page-header"></h1>
				</div>
				-->
				<!-- /.col-lg-12 -->
			</div>
			<!-- /.row -->
		</div>

		<div id="mydiv">
			<img id="bg">
		</div>

		<script type="text/javascript" src="src/RunAjax.js"></script>
		<script type="text/javascript" src="src/ScadaTags.js"></script>

		<script type="text/javascript" src="scada.js"></script>
		<script type="text/javascript">


		var params = {
			defaultUrl: "scada.php",

			// params for getdata().
			getDataParams: {
				'method': "getInfo",
				'data': {
				}
			},

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

		var scada = new Scada( params )

		$( document ).ready(function() {
			scada.Start();
		});

		</script>

    </div>
</body>
</html>
