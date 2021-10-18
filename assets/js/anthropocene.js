( async function currentData() {

	var names = {
				pm25: "PM<sub>2.5</sub>",
				pm10: "PM<sub>10</sub>",
				o3: "Ozone",
				no2: "Nitrogen Dioxide",
				so2: "Sulphur Dioxide",
				co: "Carbon Monoxyde",
				t: "Temperature",
				w: "Wind",
				r: "Rain (precipitation)",
				h: "Relative Humidity",
				d: "Dew",
				p: "Atmostpheric Pressure"
			}
	var promise = new Promise(function(resolve, reject) {

            fetch('https://api.waqi.info/feed/here/?token=a5bcabdf37b376ee2eafa3f7c72b49ea520ddc69')
            .then(response => response.json())
            .then(data => {
                changeFont(data.data.aqi);
            });

	});
})();

/* Helper prototype per rimappare i valori */
Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function changeFont(num){
    console.log(`                 .*(%@@@@@@@@&%(*.                
          ./@@@@@@@@@@@@@@@@@@@@@@@@@@@#,         
       *&@@@@@@@@@#/*,.     ..,*(%@@@@@@@@@(      
     (@@@@@@@@*                      *&@@@@@@%.   
   .@@@@@@@%.                           (@@@@@@.  
  *@@@@@@@/                              .@@@@@@. 
 .%@@@@@@#                                *@@@@@# 
     ,#@@.                                (@@@@@& 
                                      ./&@@@@@@@& 
                      ..,,*/((##%@@@@@@@@&*&@@@@& 
         ,(&&@@@@@@@@@@@@@@@@@@@@@@@@@@/  ,@@@@@& 
    .#@@@@@@@@@@@@@@@@@@@@@@@@@&%/.       ,@@@@@& 
  *@@@@@@@@@%(*.                          ,@@@@@& 
 #@@@@@@#.                                ,@@@@@& 
/@@@@@&.                                  *@@@@@& 
&@@@@@.                                   &@@@@@& 
@@@@@&                                  .&@@@@@@& 
%@@@@@*                                *@@@@@@@@& 
 &@@@@@(                             #@@@@*@@@@@& 
 .%@@@@@@#.                      *%@@@@&, /@@@@@& 
    #@@@@@@@@&#/,.     .,*(#%@@@@@@@@/    #@@@@@&.
       (&@@@@@@@@@@@@@@@@@@@@@@@@/.       #@@@@@@*
            .*(%&&&&&&&%#/,                       `)
    console.log("This site is using the Anthropocene font, find more about it https://anthropocene-otf.github.io/")
    console.log("Your current AQI (Air  Quality Index) is "+num+", read more about it here https://aqicn.org/faq/")
    var userairdata = num
    userairdata >= 300 ? userairdata = 300 : userairdata = userairdata;
    var userairdataPercentage = Math.floor((userairdata/300) *100)
    var font_value = parseInt((response.data.aqi).map(0, 300, 100, 0));
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
    @font-face {\
        font-family: Anthropocene;\
        src: url('https://anthropocene-otf.github.io/cdn/fonts/Anthropocene-" + font_value + ".otf') format('opentype');\
    }\
    "));

    document.head.appendChild(newStyle);
}