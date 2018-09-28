//<!--
/*initialize positions to create charts*/
var posiciones = [ 
        [95.0162,25.9709, "pos1"], 
        [95.2581,25.3611, "pos2"], 
        [96.5649,24.7515, "pos3"],
        [96.8252,23.5122, "pos4"],
        [96.7157,20.9709, "pos5"],
        [94.7673,20.0405, "pos6"]
      ] ;

(function($){
  $(document).ready(function(){

  	var slctdmonth = $('#slct_month option:selected').val();
  	createCharts(posiciones, slctdmonth);

    /*select handler on change*/
    $( "#slct_month" ).change(function() {
	    var slctdmonth = $('#slct_month option:selected').val();
  	  //responde y cambia animacion 
	  });
      
  });
})(jQuery);

/*initiliaze the map*/
//24.833446, -89.886760
var mymap = L.map('mapid', {
              crs: L.CRS.EPSG4326
            }).setView([24.833, -89.886], 5);

var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
    layers: 'nasa:bluemarble'
}).addTo(mymap);

/*adding markers to map*/
var LeafIcon = L.Icon.extend({
                    options: {
                        iconSize:     [32, 32]
                    }
                });

var theeIcon = new LeafIcon({iconUrl: 'windrose_icon_small.png'});

for( var i=0; i<posiciones.length; i++ ){
  lat = posiciones[i][1];
  lon = posiciones[i][0];
  folder = posiciones[i][2];
}

function createCharts(posiciones, month){

	//$("#all_charts").empty();

	for( var i=0; i<posiciones.length; i++ ){
    lat = posiciones[i][1];
    lon = posiciones[i][0];
    folder = posiciones[i][2];
    //"<div id=\"chart_"+folder+"\"></div>"
    var div = document.createElement("div");
    div.className = "mapchart";
    div.id = 'chart_'+folder;
    var marker = L.marker([lat, -lon], {icon: theeIcon}).addTo(mymap).bindPopup(div, { maxWidth: "auto" });

    //nuevoChart = new WindRose(folder, lat, lon, month, div);
    //nuevoChart.theChart;
 	}

}

/*making the header responsive*/
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "sticky") {
      x.className += " responsive";
  } else {
      x.className = "sticky";
  }
}
//-->