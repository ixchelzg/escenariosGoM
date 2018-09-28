Date.prototype.addDays = function(days) {
       var dat = new Date(this.valueOf())
       dat.setDate(dat.getDate() + days);
       return dat;
}

Date.prototype.addHours= function(h){
    var copiedDate = new Date(this.getTime());
    copiedDate.setHours(copiedDate.getHours()+h);
    return copiedDate;
}

/* 
http://132.248.8.238:8080/atlasmeteorologicogom/API/rosadeviento/ PromediosDiarios / Promedios_Dia.nc / lat+"/"+lon+"/"+stime+"/"+etime; */
class WindRose {
  constructor(folder, lat, lon, month) {
    this.folder = folder;
    this.lat = lat;
    this.lon = lon;
    this.month = month;
  }

  /* 
   * This function adds a zero at the beggining in an attemp to format hour and dates 
   * @param {int} i
   */
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
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
    var shortNames = [1, 2,3 , 4 , 5 , 6 , 7 , 8 , 9 , 10, 11 , 12];
    var longNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for(var i=0; i<shortNames.length; i++){
      if(shortNames[i] === shortName){
        return longNames[i];
      }
    }
  }

  getData(){
    /*
    var date = this.day;
    var n = date.toISOString().slice(0,10);
    var hr = this.addZero(date.getHours())+':'+this.addZero(date.getMinutes());*/
    
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
        //console.log(data);
        //if(data.report.length != 0){
          var div = document.createElement("div");
          div.className = "one_chart";
          div.id = 'chart_'+this.est;
          document.getElementById("all_charts").appendChild(div);
          me.createChartFvsR(data,div);
        //} 
        
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

    //var date = this.day;
    //var hr = this.addZero(date.getHours())+':'+this.addZero(date.getMinutes());

    var windDataJSON;
    var windDirection = [];
    var windSpeed= [];
    var U = dataU;
    var V = dataV;

    for(i=0; i < U.length; i++){
      var T = Math.atan2(U[i],V[i])*(180/(Math.PI));
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
    
    var freqs = [0,3,6,9,12,15];
    
    var categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    var catdict = {
        freq1: {
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
        },freq2: {
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
        },freq3: {
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
        },freq4: {
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
        },freq5: {
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
        },freq6: {
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
        }           
    };
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
    for(i =0; i < windDirection.length; i++){
        if( windSpeed[i] >= freqs[0] && windSpeed[i]<freqs[1]){
            //va en la primera frecuencia falta checar en que CARDINAL va
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq1.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq1.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq1.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq1.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq1.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq1.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq1.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq1.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq1.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq1.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq1.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq1.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq1.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq1.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq1.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq1.NNW += 1;
            }
        } else if(windSpeed[i] >= freqs[1] && windSpeed[i]<freqs[2]){
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq2.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq2.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq2.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq2.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq2.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq2.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq2.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq2.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq2.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq2.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq2.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq2.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq2.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq2.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq2.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq2.NNW += 1;
            }
        } else if(windSpeed[i] >= freqs[2] && windSpeed[i]<freqs[3]){
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq3.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq3.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq3.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq3.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq3.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq3.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq3.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq3.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq3.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq3.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq3.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq3.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq3.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq3.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq3.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq3.NNW += 1;
            }
        } else if(windSpeed[i] >= freqs[3] && windSpeed[i]<freqs[4]){
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq4.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq4.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq4.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq4.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq4.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq4.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq4.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq4.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq4.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq4.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq4.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq4.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq4.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq4.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq4.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq4.NNW += 1;
            }
        } else if(windSpeed[i] >= freqs[4] && windSpeed[i]<freqs[5]){
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq5.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq5.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq5.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq5.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq5.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq5.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq5.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq5.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq5.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq5.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq5.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq5.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq5.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq5.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq5.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq5.NNW += 1;
            }
        } else {
            if( windDirection[i]>= 348.75 || windDirection[i]< 11.25 ){
                //N
                catdict.freq6.N += 1;
            }else if( windDirection[i]>= 11.25 && windDirection[i]< 33.75 ){
                //NNE
                catdict.freq6.NNE += 1;
            }else if( windDirection[i]>= 33.75 && windDirection[i]< 56.25 ){
                //NE
                catdict.freq6.NE += 1;
            }else if( windDirection[i]>= 56.25 && windDirection[i]< 78.75 ){
                //ENE
                catdict.freq6.ENE += 1;
            }else if( windDirection[i]>= 78.75 && windDirection[i]< 101.25 ){
                //E
                catdict.freq6.E += 1;
            }else if( windDirection[i]>= 101.25 && windDirection[i]< 123.75 ){
                //ESE
                catdict.freq6.ESE += 1;
            }else if( windDirection[i]>= 123.75 && windDirection[i]< 146.25 ){
                //SE
                catdict.freq6.SE += 1;
            }else if( windDirection[i]>= 146.25 && windDirection[i]< 168.75 ){
                //SSE
                catdict.freq6.SSE += 1;
            }else if( windDirection[i]>= 168.75 && windDirection[i]< 191.25 ){
                //S
                catdict.freq6.S += 1;
            }else if( windDirection[i]>= 191.25 && windDirection[i]< 213.75 ){
                //SSW
                catdict.freq6.SSW += 1;
            }else if( windDirection[i]>= 213.75 && windDirection[i]< 236.25 ){
                //SW                
                catdict.freq6.SW += 1;
            }else if( windDirection[i]>= 236.25 && windDirection[i]< 258.75 ){
                //WSW
                catdict.freq6.WSW += 1;
            }else if( windDirection[i]>= 258.75 && windDirection[i]< 281.25 ){
                //W
                catdict.freq6.W += 1;
            }else if( windDirection[i]>= 281.25 && windDirection[i]< 303.75 ){
                //WNW
                catdict.freq6.WNW += 1;
            }else if( windDirection[i]>= 303.75 && windDirection[i]< 326.25 ){
                //NW
                catdict.freq6.NW += 1;
            }else if( windDirection[i]>= 326.25 && windDirection[i]< 348.75 ){
                //NNW
                catdict.freq6.NNW += 1;
            }
        }

    }

    var unims = " m/s";
    var dataseries= [ 
            {
                "type": "column",
                "name": "0 - 3"+unims,
                "data" : [
                    ["N", catdict.freq1.N],
                    ["NNE", catdict.freq1.NNE],
                    ["NE", catdict.freq1.NE],
                    ["ENE", catdict.freq1.ENE],
                    ["E", catdict.freq1.E],
                    ["ESE", catdict.freq1.ESE],
                    ["SE", catdict.freq1.SE],
                    ["SSE", catdict.freq1.SSE],
                    ["S", catdict.freq1.S],
                    ["SSW", catdict.freq1.SSW],
                    ["SW", catdict.freq1.SW],
                    ["WSW", catdict.freq1.WSW],
                    ["W", catdict.freq1.W],
                    ["WNW", catdict.freq1.WNW],
                    ["NW", catdict.freq1.NW],
                    ["NNW", catdict.freq1.NNW]
                ]
            },
            {
                "type": "column",
                "name": "3 - 6"+unims,
                "data" : [
                    ["N", catdict.freq2.N],
                    ["NNE", catdict.freq2.NNE],
                    ["NE", catdict.freq2.NE],
                    ["ENE", catdict.freq2.ENE],
                    ["E", catdict.freq2.E],
                    ["ESE", catdict.freq2.ESE],
                    ["SE", catdict.freq2.SE],
                    ["SSE", catdict.freq2.SSE],
                    ["S", catdict.freq2.S],
                    ["SSW", catdict.freq2.SSW],
                    ["SW", catdict.freq2.SW],
                    ["WSW", catdict.freq2.WSW],
                    ["W", catdict.freq2.W],
                    ["WNW", catdict.freq2.WNW],
                    ["NW", catdict.freq2.NW],
                    ["NNW", catdict.freq2.NNW]
                ]
            },
            {
                "type": "column",
                "name": "6 - 9"+unims,
                "data" : [
                    ["N", catdict.freq3.N],
                    ["NNE", catdict.freq3.NNE],
                    ["NE", catdict.freq3.NE],
                    ["ENE", catdict.freq3.ENE],
                    ["E", catdict.freq3.E],
                    ["ESE", catdict.freq3.ESE],
                    ["SE", catdict.freq3.SE],
                    ["SSE", catdict.freq3.SSE],
                    ["S", catdict.freq3.S],
                    ["SSW", catdict.freq3.SSW],
                    ["SW", catdict.freq3.SW],
                    ["WSW", catdict.freq3.WSW],
                    ["W", catdict.freq3.W],
                    ["WNW", catdict.freq3.WNW],
                    ["NW", catdict.freq3.NW],
                    ["NNW", catdict.freq3.NNW]
                ]
            },
            {
                "type": "column",
                "name": "9 - 12"+unims,
                "data" : [
                    ["N", catdict.freq4.N],
                    ["NNE", catdict.freq4.NNE],
                    ["NE", catdict.freq4.NE],
                    ["ENE", catdict.freq4.ENE],
                    ["E", catdict.freq4.E],
                    ["ESE", catdict.freq4.ESE],
                    ["SE", catdict.freq4.SE],
                    ["SSE", catdict.freq4.SSE],
                    ["S", catdict.freq4.S],
                    ["SSW", catdict.freq4.SSW],
                    ["SW", catdict.freq4.SW],
                    ["WSW", catdict.freq4.WSW],
                    ["W", catdict.freq4.W],
                    ["WNW", catdict.freq4.WNW],
                    ["NW", catdict.freq4.NW],
                    ["NNW", catdict.freq4.NNW]
                ]
            },
            {
                "type": "column",
                "name": "12 - 15"+unims,
                "data" : [
                    ["N", catdict.freq5.N],
                    ["NNE", catdict.freq5.NNE],
                    ["NE", catdict.freq5.NE],
                    ["ENE", catdict.freq5.ENE],
                    ["E", catdict.freq5.E],
                    ["ESE", catdict.freq5.ESE],
                    ["SE", catdict.freq5.SE],
                    ["SSE", catdict.freq5.SSE],
                    ["S", catdict.freq5.S],
                    ["SSW", catdict.freq5.SSW],
                    ["SW", catdict.freq5.SW],
                    ["WSW", catdict.freq5.WSW],
                    ["W", catdict.freq5.W],
                    ["WNW", catdict.freq5.WNW],
                    ["NW", catdict.freq5.NW],
                    ["NNW", catdict.freq5.NNW]
                ]
            },
            {
                "type": "column",
                "name": ">15"+unims,
                "data" : [
                    ["N", catdict.freq6.N],
                    ["NNE", catdict.freq6.NNE],
                    ["NE", catdict.freq6.NE],
                    ["ENE", catdict.freq6.ENE],
                    ["E", catdict.freq6.E],
                    ["ESE", catdict.freq6.ESE],
                    ["SE", catdict.freq6.SE],
                    ["SSE", catdict.freq6.SSE],
                    ["S", catdict.freq6.S],
                    ["SSW", catdict.freq6.SSW],
                    ["SW", catdict.freq6.SW],
                    ["WSW", catdict.freq6.WSW],
                    ["W", catdict.freq6.W],
                    ["WNW", catdict.freq6.WNW],
                    ["NW", catdict.freq6.NW],
                    ["NNW", catdict.freq6.NNW]
                ]
            }
    ];
    //console.log(dataseries);  

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
            reversedStacks: false
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