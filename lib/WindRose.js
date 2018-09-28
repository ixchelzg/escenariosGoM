/* 
http://132.248.8.238:8080/atlasmeteorologicogom/API/rosadeviento/ PromediosDiarios / Promedios_Dia.nc / lat+"/"+lon+"/"+stime+"/"+etime; */
class WindRose {
  constructor(folder, lat, lon, month, divid) {
    this.folder = folder;
    this.lat = lat;
    this.lon = lon;
    this.month = month;
    this.divid = divid;
  }

  /**
   * This function draws the chart, 
   * first it calls the function that calls the webservice
   * and then when the data is retrieve this function calls the one that draws the chart
   */
  get theChart(){
  	this.getData();
  }

  /**
   * This function is used to obtain the correct title for each month 
   * @param {String} shortName
   * @returns {String}
   */
  getMonthName(shortName){
    var shortNames = ["1", "2","3" , "4" , "5" , "6" , "7" , "8" , "9" , "10", "11" , "12"];
    var longNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for(var i=0; i<shortNames.length; i++){
      if(shortNames[i] === shortName){
        return longNames[i];
      }
    }
  }

  /*
   * This is a handy little round function that takes precision
   * round(12345.6789, 2) // 12345.68
   */
  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  getData(){    
    //var elurl = "http://132.248.8.238:8080/atlasmeteorologicogom/API/rosadeviento/"+this.folder+"/"+this.filename+"/"+this.lat+"/"+this.lon+"/"+this.stime+"/"+this.etime;
    var elurl = "http://pronosticos.unam.mx/Json_files/"+this.folder+"/file_data_"+this.month+"_.json";
    //console.log(elurl);
    
    var me = this;
    var rdata = null;
    /*call rest web service for data to create highcharts*/
    $.ajax({
      url: elurl,
      async: true,
      crossDomain : true,
      type: "GET",
      dataType: 'json',
      success: function(data) {
        rdata = data;
        //console.log(me.divid);
        me.createChartFvsR(data,me.divid);        
      },
      error: function(ex) {
        console.log(ex);
        console.log('NOT!');
      }
    });
  }

  createChartFvsR(data,div){

  	var me = this;

    var dataU = data.U;
    var dataV = data.V;

    var latlon = "Latitud: "+me.lat+" Longitud: -"+me.lon;

    var windDataJSON;
    var windDirection = [];
    var windSpeed= [];
    var U = dataU;
    var V = dataV;

    for(i=0; i < U.length; i++){
      var T = Math.atan2(-U[i],-V[i])*(180/(Math.PI));
      if(T<0){
        T = 360+T;
      }       
      windDirection[i] = T;
      windSpeed[i] = Math.sqrt( Math.pow(U[i],2) + Math.pow(V[i],2) );
    } 
    /*console.log("*******************************");
    console.log(windDirection);
    console.log(windSpeed);*/
    
    windDataJSON = [];
    for (var i = 0; i < windDirection.length; i++) {
        windDataJSON.push([ windDirection[i], windSpeed[i] ]);
    }
    //console.log(windDataJSON);
    /*
     * number of freqs = 6
     * [ 0-3, 3-6, 6-9, 9-12, 12-15, >15 ]
     * 
     * */
    
    var freqs = [0,3,6,9,12,15,100];
    
    var categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    var catdict = {};

    for(var i=0; i<freqs.length-1; i++){
        
        catdict["freq"+(i+1)] = {
            N: 0,
            NNE: 0, 
            NE:0, 
            ENE:0, 
            E:0, 
            ESE:0, 
            SE:0,
            SSE:0,
            S:0,
            SSW:0,
            SW:0, 
            WSW:0, 
            W:0, 
            WNW:0, 
            NW:0, 
            NNW:0
        };
    }
    //console.log(catdict);
    
    /*
     * Cardinal Direction Degree Direction
            N                     348.75 - 11.25
            NNE                    11.25 - 33.75   
            NE                     33.75 - 56.25
            ENE                    56.25 - 78.75
            E                     78.75 - 101.25
            ESE                  101.25 - 123.75
            SE                   123.75 - 146.25
            SSE                  146.25 - 168.75
            S                    168.75 - 191.25
            SSW                  191.25 - 213.75
            SW                   213.75 - 236.25
            WSW                  236.25 - 258.75
            W                    258.75 - 281.25
            WNW                  281.25 - 303.75
            NW                   303.75 - 326.25
            NNW                  326.25 - 348.75
     */
    for(var i=0; i < windDirection.length; i++){

        for(var j=0; j<freqs.length-1; j++){

            if( windSpeed[i] >= freqs[j] && windSpeed[i]<freqs[j+1] ){
                //va en la primera frecuencia falta checar en que CARDINAL va
                if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                    //N
                    catdict[ "freq"+(j+1) ]["N"] +=1;
                }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                    //NNE
                    catdict["freq"+(j+1)]["NNE"] += 1;
                }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                    //NE
                    catdict["freq"+(j+1)]["NE"] += 1;
                }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                    //ENE
                    catdict["freq"+(j+1)]["ENE"] += 1;
                }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                    //E
                    catdict["freq"+(j+1)]["E"] += 1;
                }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                    //ESE
                    catdict["freq"+(j+1)]["ESE"] += 1;
                }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                    //SE
                    catdict["freq"+(j+1)]["SE"] += 1;
                }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                    //SSE
                    catdict["freq"+(j+1)]["SSE"] += 1;
                }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                    //S
                    catdict["freq"+(j+1)]["S"] += 1;
                }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                    //SSW
                    catdict["freq"+(j+1)]["SSW"] += 1;
                }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                    //SW                
                    catdict["freq"+(j+1)]["SW"] += 1;
                }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                    //WSW
                    catdict["freq"+(j+1)]["WSW"] += 1;
                }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                    //W
                    catdict["freq"+(j+1)]["W"] += 1;
                }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                    //WNW
                    catdict["freq"+(j+1)]["WNW"] += 1;
                }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                    //NW
                    catdict["freq"+(j+1)]["NW"] += 1;
                }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                    //NNW
                    catdict["freq"+(j+1)]["NNW"] += 1;
                }
            }

        }

    }

    var unims = " m/s";
    var dataseries= [ ] ;
    var totalfreqs=windDirection.length;

    for(var i=0;i< freqs.length-1;i++){
        if( i != freqs.length-2 ){
            dataseries.push({
                "type": "column",
                "name": freqs[i]+" - "+freqs[i+1]+unims,
                "data" : [
                    ["N", me.round((catdict["freq"+(i+1)]["N"])*100/totalfreqs,1)],
                    ["NNE", me.round(catdict["freq"+(i+1)]["NNE"]*100/totalfreqs,1)],
                    ["NE", me.round(catdict["freq"+(i+1)]["NE"]*100/totalfreqs,1)],
                    ["ENE", me.round(catdict["freq"+(i+1)]["ENE"]*100/totalfreqs,1)],
                    ["E", me.round(catdict["freq"+(i+1)]["E"]*100/totalfreqs,1)],
                    ["ESE", me.round(catdict["freq"+(i+1)]["ESE"]*100/totalfreqs,1)],
                    ["SE", me.round(catdict["freq"+(i+1)]["SE"]*100/totalfreqs,1)],
                    ["SSE", me.round(catdict["freq"+(i+1)]["SSE"]*100/totalfreqs,1)],
                    ["S", me.round(catdict["freq"+(i+1)]["S"]*100/totalfreqs,1)],
                    ["SSW", me.round(catdict["freq"+(i+1)]["SSW"]*100/totalfreqs,1)],
                    ["SW", me.round(catdict["freq"+(i+1)]["SW"]*100/totalfreqs,1)],
                    ["WSW", me.round(catdict["freq"+(i+1)]["WSW"]*100/totalfreqs,1)],
                    ["W", me.round(catdict["freq"+(i+1)]["W"]*100/totalfreqs,1)],
                    ["WNW", me.round(catdict["freq"+(i+1)]["WNW"]*100/totalfreqs,1)],
                    ["NW", me.round(catdict["freq"+(i+1)]["NW"]*100/totalfreqs,1)],
                    ["NNW", me.round(catdict["freq"+(i+1)]["NNW"]*100/totalfreqs,1)]
                ]
            });
        } else {
            dataseries.push({
                "type": "column",
                "name": " > "+freqs[i]+unims,
                "data" : [
                    ["N", me.round(catdict["freq"+(i+1)]["N"]*100/totalfreqs,1)],
                    ["NNE", me.round(catdict["freq"+(i+1)]["NNE"]*100/totalfreqs,1)],
                    ["NE", me.round(catdict["freq"+(i+1)]["NE"]*100/totalfreqs,1)],
                    ["ENE", me.round(catdict["freq"+(i+1)]["ENE"]*100/totalfreqs,1)],
                    ["E", me.round(catdict["freq"+(i+1)]["E"]*100/totalfreqs,1)],
                    ["ESE", me.round(catdict["freq"+(i+1)]["ESE"]*100/totalfreqs,1)],
                    ["SE", me.round(catdict["freq"+(i+1)]["SE"]*100/totalfreqs,1)],
                    ["SSE", me.round(catdict["freq"+(i+1)]["SSE"]*100/totalfreqs,1)],
                    ["S", me.round(catdict["freq"+(i+1)]["S"]*100/totalfreqs,1)],
                    ["SSW", me.round(catdict["freq"+(i+1)]["SSW"]*100/totalfreqs,1)],
                    ["SW", me.round(catdict["freq"+(i+1)]["SW"]*100/totalfreqs,1)],
                    ["WSW", me.round(catdict["freq"+(i+1)]["WSW"]*100/totalfreqs,1)],
                    ["W", me.round(catdict["freq"+(i+1)]["W"]*100/totalfreqs,1)],
                    ["WNW", me.round(catdict["freq"+(i+1)]["WNW"]*100/totalfreqs,1)],
                    ["NW", me.round(catdict["freq"+(i+1)]["NW"]*100/totalfreqs,1)],
                    ["NNW", me.round(catdict["freq"+(i+1)]["NNW"]*100/totalfreqs,1)]
                ]
            });
        }
    }

    Highcharts.chart({
        chart: {
          renderTo: div,
          polar: true,
          type: 'column'
        },
        series:dataseries,
        title: {
            text: 'Rosa de Vientos de '+me.getMonthName(me.month)
        },
        subtitle: {
            text: latlon
        },
        pane: {
            size: '85%'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },
        xAxis: {
            tickmarkPlacement: 'on',
            type:'category'
        },
        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            //title: {
                //text: 'Frecuencia (%)'
            //},
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
    }); /*end of highcharts definition*/			      
  }
}