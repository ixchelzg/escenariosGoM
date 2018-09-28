//<!--
/*initialize positions to create charts*/
var posiciones = [ 
        [95.0162,25.9709, "25.9709_-95.0162"], 
        [95.2581,25.3611, "25.3611_-95.2581"], 
        [96.5649,24.7515, "24.7515_-96.5649"],
        [96.8252,23.5122, "23.5122_-96.8252"],
        [96.7157,20.9709, "20.9709_-96.7157"],
        [94.7673,20.0405, "20.0405_-94.7673"]
    ];

var slctdlocation = getQueryVariable("slctd_location")==false ? null : getQueryVariable("slctd_location");
var slctdmonth = $('#slct_month option:selected').val();
var slctdheight = $('#slctd_height option:selected').val();
var markers = [];

/*initiliaze the map*/
var southWest = L.latLng(17.9000, -98.2686),
    northEast = L.latLng(30.1131, -82.2447),
    bounds = L.latLngBounds(southWest, northEast);

var mymap = L.map('mapid', {
              crs: L.CRS.EPSG4326,
              maxBounds: bounds
            }).setView([23, -89], 5);

var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
    layers: 'nasa:bluemarble'
}).addTo(mymap);

// zoom the map to that bounding box
mymap.fitBounds(bounds);
//mymap.setMaxBounds(mymap.getBounds());

/* defining markers icon*/
var LeafIcon = L.Icon.extend({
                    options: {
                        iconSize:     [32, 32]
                    }
                });
var theeIcon = new LeafIcon({iconUrl: 'images/rosa1.png'});
var theeslctdIcon = new LeafIcon({iconUrl: 'images/selected.png'});

//catch event when user changes tab to reload map
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") // activated tab
  console.log(target);
  mymap.invalidateSize();
  mymap.fitBounds(bounds);
});

(function($){
  $(document).ready(function(){

    /*adding markers to map*/
    for( var i=0; i<posiciones.length; i++ ){
      lat = posiciones[i][1];
      lon = posiciones[i][0];
      folder = posiciones[i][2];

      if(slctdlocation==folder){
        var marker = L.marker([lat, -lon], {icon: theeslctdIcon }).addTo(mymap).on('click', onClick);
      } else {
        var marker = L.marker([lat, -lon], {icon: theeIcon}).addTo(mymap).on('click', onClick); //.bindPopup(div, { maxWidth: "auto" })
      }

      markers.push(marker);

    }

    $("#submit_btn").click(function(){
        var slctdmonth = $('#slct_month option:selected').val();
        var slctdheight = $('#slctd_height option:selected').val();
        window.location.href = 'index.php?slctd_month=' + slctdmonth + '&slctd_height=' + slctdheight + '&slctd_location=' + slctdlocation;
    });
      
  });
})(jQuery);

/*
for( var i=0; i<posiciones.length; i++ ){
  lat = posiciones[i][1];
  lon = posiciones[i][0];
  folder = posiciones[i][2]; 
}
*/

function onClick(e){ 
  console.log(this.getLatLng()); 
  slctdlocation=this.getLatLng().lat+"_"+this.getLatLng().lng; 
  console.log(slctdlocation);
  //this.setIcon(theeslctdIcon);
  
  for (var i = markers.length - 1; i >= 0; i--) {
    markers[i].setIcon(theeIcon);
  }

  e.target.setIcon(theeslctdIcon);
}

/* Creating animation */
var escenariosAnim;

$( window ).resize(function() {
  //escenariosAnim.updateSize();
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
  $('.popover-dismiss').popover({
    trigger: 'hover'
  });

  /*
  // This object contains the names of the escenarios images
  var escenariosNames = filterNames(img_names, 'escenarios');
  escenariosAnim = new Animation(escenariosNames, 'escenarios_canvas', 'escenariosAnim');
  //Start loading the images and playing the animation. 
  // It starts with a height of 50% of the window size
  escenariosAnim.init();
  */

});

function toggledisplay(elementID){
  (function(style) {
    style.display = style.display === 'none' ? '' : 'none';
  })(document.getElementById(elementID).style);
}

image_type = "jpg"; //"gif" or "jpg" or whatever your browser can display
first_image_name = 0; //Representa el nombre de la primer imagen
first_image = 0; //first image number
speed_text = 0;
var inicioPlayfwd = false; //Controla la animacion si esta en play o en stop
var inicioPlayBkw = false; //Controla la animacion cuando esta en reversa

//=== THE CODE STARTS HERE - no need to change anything below ===
//=== global variables ====
var theImages = new Array();
normal_delay = 1000;
delay = normal_delay; //delay between frames in 1/100 seconds
delay_step = 10;
delay_max = 30000;
delay_min = 1;
current_image = first_image; //number of the current image
timeID = null;
status = 1;  // 0-stopped, 1-playing
play_mode = 1; // 0-normal, 1-loop, 2-swing
size_valid = 0;
var loadCount = 1;
var last_image_;
var lewidth;
var leheight;
speed_text = 1;


function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
  //console.log(imgW,",",imgH,",",maxW,",",maxH);
  return(Math.min((maxW/imgW),(maxH/imgH)));
}

function naturalCompare(a, b) {
  var ax = [], bx = [];
  
  a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
  b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
  
  while(ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if(nn) return nn;
  }
  
  return ax.length - bx.length;
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

//-->