function myMap() {
          var Amersfoort = new google.maps.LatLng(52.1561113,5.3878266);
          var mapCanvas = document.getElementById("map");
          var mapOptions = {center: Amersfoort, zoom: 8};
          map = new google.maps.Map(mapCanvas,mapOptions);

          google.maps.event.addListener(map, 'zoom_changed', function() {
            var zoom = map.getZoom();
            var newSize = Math.pow(zoom,2) - 60;
        
            for(var i = 0; i < _singleMarkers.length; i++)
            {
                _singleMarkers[i].setIcon(
                    new google.maps.MarkerImage(
                        _singleMarkers[i].getIcon().url,
                        null,//size
                        null,//origin
                        null, //anchor
                        new google.maps.Size(newSize, newSize) //changes the scale
                    )
                );  
            }
            

        });

        }

function drawLine(siteName, startLat, startLong, endLat, endLong, id)
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
            _id.push(id);
            
        }

function drawMarker(markerLat, markerLong,id)
{
    markerLocation = new google.maps.LatLng(markerLat, markerLong);
    _singleMarkerId.push(id);

    var icon = {
        url: "../../images/cameramarker.png", // url
        scaledSize: new google.maps.Size(1,1), // scaled size
    };

    singleMarker = new google.maps.Marker({
        position: markerLocation,
        icon: icon
    });

    _singleMarkers.push(singleMarker);
    singleMarker.setMap(map);
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
        
                 lineLocationOne = flightpath.getPath().getArray()[0];
                 lineLocationTwo = flightpath.getPath().getArray()[1];
        
                 var foundMarkerOne;
                 var foundMarkerTwo;
        
                 // zoeken naar markers object in array zodat we weten welke marker hoort bij punt A ofzo
                for (var i = 0; i < _markers.length; i++)
                {

                    var markerPos = _markers[i].getPosition();

                    if (markerPos == lineLocationOne)
                    {
                        foundMarkerOne = _markers[i];
                    }

                    if (markerPos == lineLocationTwo)
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
                vanLocatie = _siteNames[lineCount].split("-")[0];
                naarLocatie = _siteNames[lineCount].split("-")[1];

                templatA = lineLocationOne.lat();
                templatB = lineLocationTwo.lat();

                templongA = lineLocationOne.lng();
                templongB = lineLocationTwo.lng();

                tempID = _id[lineCount];
        
                //laat infowindows zien op gevonden markers
                infowindowOne = new google.maps.InfoWindow (
                    {
                     content: "van " + vanLocatie
                    }
                );

                infowindowTwo = new google.maps.InfoWindow (
                    {
                        content: "naar " + naarLocatie
                    }
                );
                
                infowindowOne.open(map,foundMarkerOne);
                infowindowTwo.open(map,foundMarkerTwo);
                
                _infoWindows.push(infowindowOne);
                _infoWindows.push(infowindowTwo);
                
        }

function markerClicked()
{

}