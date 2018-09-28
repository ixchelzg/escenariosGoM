<!DOCTYPE html>
<html lang="en">
  <?php
    include("queries.php");
  ?>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Escenarios del golfo de mexico gom">
    <meta name="author" content="Ixchel Zazueta">

    <title>Escenarios GoM</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
   <!--link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css">
   <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"-->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Favicon
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="icon" type="image/png" href="http://grupo-ioa.atmosfera.unam.mx/templates/beeze-cuau/favicon.ico">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/jumbotron.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
    integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
    crossorigin=""></script>
    <!--script type="text/javascript" src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script-->
    <script type="text/javascript" src="http://pronosticos.unam.mx/LYDAR/js/Animation.js"></script>
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <!--button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button-->
          <a class="navbar-brand" href="#">Escenarios GoM</a>
        </div>
        <!--div id="navbar" class="navbar-collapse collapse">
          content
        </div--><!--/.navbar-collapse -->
      </div>
    </nav>

    <div class="container">

      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="<?php if(!isset($_GET['slctd_location'])){ echo "active"; } ?>"><a href="#vars" aria-controls="1" role="tab" data-toggle="tab">Variables</a></li>
        <li role="presentation" class="<?php if(isset($_GET['slctd_location'])){ echo "active"; } ?>"><a href="#anim" aria-controls="2" role="tab" data-toggle="tab">Animación</a></li>
      </ul>

      <!-- Example row of columns -->
      <!--div class="row"-->

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane <?php if(!isset($_GET['slctd_location'])){ echo "active"; } ?>" id="vars">

        <!--div class="col-md-6 col-lg-6 col-xs-12"-->
          <!--h2>Variables</h2-->
          <div class="row">
            <div id="mapid" class="col-lg-8 col-md-8 col-xs-12"></div>
            <div class="col-lg-4 col-md-4 col-xs-12">


              <div class="form-group">
                <label for="sel1">Altura</label>
                <select class="form-control" id="slctd_height">
                  <option value="1" <?php if($slctdHeight == "1"){ echo "selected"; } ?> >1</option>
                  <option value="2" <?php if($slctdHeight == "2"){ echo "selected"; } ?> >2</option>
                  <option value="3" <?php if($slctdHeight == "3"){ echo "selected"; } ?> >3</option>
                  <option value="4" <?php if($slctdHeight == "4"){ echo "selected"; } ?> >4</option>
                </select>

                <br>

                <label for="slct_month">Mes</label>
                <select class="form-control" id="slct_month">
                  <option value="1" <?php if($slctdMonth == "1"){ echo "selected"; } ?> >Enero</option>
                  <option value="2" <?php if($slctdMonth == "2"){ echo "selected"; } ?>>Febrero</option>
                  <option value="3" <?php if($slctdMonth == "3"){ echo "selected"; } ?>>Marzo</option>
                  <option value="4" <?php if($slctdMonth == "4"){ echo "selected"; } ?>>Abril</option>
                  <option value="5" <?php if($slctdMonth == "5"){ echo "selected"; } ?>>Mayo</option>
                  <option value="6" <?php if($slctdMonth == "6"){ echo "selected"; } ?>>Junio</option>
                  <option value="7" <?php if($slctdMonth == "7"){ echo "selected"; } ?>>Julio</option>
                  <option value="8" <?php if($slctdMonth == "8"){ echo "selected"; } ?>>Agosto</option>
                  <option value="9" <?php if($slctdMonth == "9"){ echo "selected"; } ?>>Septiembre</option>
                  <option value="10" <?php if($slctdMonth == "10"){ echo "selected"; } ?>>Octubre</option>
                  <option value="11" <?php if($slctdMonth == "11"){ echo "selected"; } ?>>Noviembre</option>
                  <option value="12" <?php if($slctdMonth == "12"){ echo "selected"; } ?>>Diciembre</option>
                </select>

              </div>
              
              <br>
              <p><button id="submit_btn" class="btn btn-primary" type="button">Ver animación &raquo;</button></p>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane <?php if(isset($_GET['slctd_location'])){ echo "active"; } ?>" id="anim">
        <!--div class="col-md-6 col-lg-6 col-xs-12"-->
          
          <!-- animaciones -->
          <div class="row">
            <!--<div class="loader" id="loader" style="display: block;"></div>-->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <!--h2>Animación</h2-->
                <!--div class="panel panel-default">
                  <div class="panel-body"-->
                    <canvas id="escenarios_canvas" width="100%" ></canvas>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <?php 
                      $jsObj = 'escenariosAnim';//This name MUST be harcoded
                      include 'animControls.php';
                    ?>
                  <!--/div>
                </div-->   
            </div>   
          </div>  

        </div>
        
      </div>

      <hr>

      <footer>
        <p>&copy; 2018, <img src="images/logo.png" class="nav_logo_min"> </p>
      </footer>
    <!--/div--> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script > var img_names= <?php echo json_encode($img_names); ?>;</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>
