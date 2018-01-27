<script>

var map;
var Amersfoort;

var _markers = [];
var _flightPaths = [];
var _infoWindows = [];
var _siteNames = [];
var _visibleMarkers = [];
var locationOne;
var locationTwo;
var gauge;
var segDisplay;
var markerOne;
var markerTwo;

var infoWindowOne;
var infoWindowTwo;

var gemiddeldeKmStand = 0;

function myMap() {
  var Amersfoort = new google.maps.LatLng(52.1561113,5.3878266);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: Amersfoort, zoom: 8};
  map = new google.maps.Map(mapCanvas,mapOptions);
}

function drawLine(siteName, startLat,startLong,endLat,endLong)
{
	//nieuwe locaties
    locationOne = new google.maps.LatLng(startLat,startLong);
    locationTwo = new google.maps.LatLng(endLat,endLong);    

	//Create markers
	markerOne = new google.maps.Marker({position:locationOne});
	markerTwo = new google.maps.Marker({position:locationTwo});

	//voeg markers aan de lijst(array) toe
	_markers.push(markerOne);
	_markers.push(markerTwo); 
	
    var flightPath = new google.maps.Polyline({
        path: [locationOne, locationTwo],
        strokeColor: "#0000FF",
        strokeOpacity: 0.4,
        strokeWeight: 6
    });
    flightPath.setMap(map);
	_flightPaths.push(flightPath);

    _siteNames.push(siteName);
	
}
function updateGauge()
{
        segDisplay.value(gemiddeldeKmStand.toString());
        gauge.value(gemiddeldeKmStand);
}

function getAverageData(regelnummer)
{
  $.ajax({
   url:"average_multiple_datasets.csv",
   dataType:"text",
   success:function(data)
   {
		var average_data = data.split(/\r?\n|\r/);
		var prevValue;
		var realCounter = 0;
        var tableData = '<tr><th>averageVehicleSpeed_value ofwel gemiddelde snelheid van aantal metingen</th></tr>';
		var kmStand = [];
        for(var count = 0; count<average_data.length; count++)
		{
            var cell_data = average_data[count].split(",");
            tableData += '<tr>';
			if(count == 1)
			{
				prevValue = cell_data[0];
			}
			if(count > 1)
			{
				if(prevValue == cell_data[0])
				{
				}
				else
				{
					realCounter++;
				}
				prevValue = cell_data[0];
			}
			if(realCounter == regelnummer)
			{	
			if(count > 0)
				{                    
                    kmStand.push(parseFloat(cell_data[4]))
                    
                    
				}
			}
            //als de regel die nodig is gevonden.. dan ga je stoppen met zoeken
            if(realCounter > regelnummer)
            {
                break;
            }
            tableData += '</tr>'
		}

        var onthoudKmStand = 0.0;

        kmStandL = kmStand.length;

        var isNotANumber;

        console.log(' getting there');
        for (k = 1; k < kmStandL; k++)
        {
            var valid = Number(kmStand[k]);

            if (valid) {
                 onthoudKmStand += kmStand[k];
            }
           
        }
        
        gemiddeldeKmStand = (onthoudKmStand  / kmStand.length);
        if (gemiddeldeKmStand > 0)
        {
            tableData += '<td>' + gemiddeldeKmStand.toString() +'</td>';
        }
        else
        {
            tableData += '<td>' + "Er zijn geen waardes van deze lijn" +'</td>';
        }
		$('#averageDataTable').html(tableData);
        updateGauge();
	}
  });
}

function lineClicked(flightpath,lineCount)
{
	//wis vorige infowindows en markers
		 if(_infoWindows.length > 0)
		 {
			_infoWindows[0].close();
			_infoWindows[1].close();
			_infoWindows.splice(0,2);
		 }
		 if(_visibleMarkers.length > 0)
		 {
			 _visibleMarkers[0].setMap(null);
			 _visibleMarkers[1].setMap(null);
			 _visibleMarkers.splice(0,2);
		 }

		 var lineLocationOne = flightpath.getPath().getArray()[0];
         var lineLocationTwo = flightpath.getPath().getArray()[1];

         var foundMarkerOne;
         var foundMarkerTwo;

         // zoeken naar markers object in array zodat we weten welke marker hoort bij punt A ofzo
		for(var i = 0; i < _markers.length;i++)
        {
            var markerPos = _markers[i].getPosition();
            if(markerPos == lineLocationOne)
            {
                foundMarkerOne = _markers[i];
            }
            if(markerPos == lineLocationTwo)
            {
                foundMarkerTwo = _markers[i];
            }
        }
		
		foundMarkerOne.setMap(map);
        foundMarkerTwo.setMap(map);
		_visibleMarkers.push(foundMarkerOne);
		_visibleMarkers.push(foundMarkerTwo);

        //Komt binnen : Algeraweg-Provincialeweg
        // na split functie wordt het een array : [Algeraweg,Provincialeweg]
        // index 0 = Algeraweg
        // index 1 = Provincialeweg
        var vanLocatie = _siteNames[lineCount].split("-")[0];
        var naarLocatie = _siteNames[lineCount].split("-")[1];

		//laat infowindows zien op gevonden markers
		infowindowOne = new google.maps.InfoWindow({
		content: "van " + vanLocatie
		});
		infowindowTwo = new google.maps.InfoWindow({
		content: "naar " + naarLocatie
		});
		
		infowindowOne.open(map,foundMarkerOne);
		infowindowTwo.open(map,foundMarkerTwo);
		
		_infoWindows.push(infowindowOne);
		_infoWindows.push(infowindowTwo);
		
}

function createClickListener()
{
	for (var i = 0; i < _flightPaths.length; i++)
	{
        var line = _flightPaths[i];
		google.maps.event.addListener(line, 'click', (function(line, i) {
			return function() {
				lineClicked(line,i);
                getAverageData(i);
			}
		}) (line, i));
        _flightPaths[i] = line;
	}
}

function getCSVData()
{
  $.ajax({
   url:"MST.csv",
   dataType:"text",
   success:function(data)
   {
    var mst_data = data.split(/\r?\n|\r/);
    for(var count = 0; count<50; count++)
    {
	 if(count == 0)
      {
       //header skippen
      }
	  else
	  {
	    var cell_data = mst_data[count].split(",");
		var siteName = cell_data[3];
        //if startlat of andere coordinaat leeg is -> doe niks 
        //else drawLine
	    var startLat = cell_data[4];
		var endLat = cell_data[6];
		var startLong = cell_data[5];
		var endLong = cell_data[7];
		drawLine(siteName, startLat,startLong,endLat,endLong);
	  }
    }
   }
 });
 $( document ).ajaxComplete(function() {
  createClickListener();
});
}


$(document).ready(function(){
    var svg = d3.select("#speedometer")
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 400);


        gauge = iopctrl.arcslider()
                .radius(120)
                .events(false)
                .indicator(iopctrl.defaultGaugeIndicator);
        gauge.axis().orient("in")
                .normalize(true)
                .ticks(12)
                .tickSubdivide(3)
                .tickSize(10, 8, 10)
                .tickPadding(5)
                .scale(d3.scale.linear()
                        .domain([0, 160])
                        .range([-3*Math.PI/4, 3*Math.PI/4]));

        segDisplay = iopctrl.segdisplay()
                .width(80)
                .digitCount(6)
                .negative(false)
                .decimals(0);

        svg.append("g")
                .attr("class", "segdisplay")
                .attr("transform", "translate(130, 200)")
                .call(segDisplay);

        svg.append("g")
                .attr("class", "gauge")
                .call(gauge);
    getCSVData();
  $('#refresh').click(function(){
    getCSVData();
  });
});

</script>