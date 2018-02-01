function createClickListenerMap()
        {
            for (i_mst = 0; i_mst < _flightPaths.length; i_mst++)
            {
                var line = _flightPaths[i_mst];
                google.maps.event.addListener(line, 'click', (function(line, i_mst) {
                    return function() {
                        lineClicked(line,i_mst);
                        updateTableTop(i_mst);
                    }
                }) (line, i_mst));
                _flightPaths[i_mst] = line;
            }

            for (j_average = 0; j_average < _singleMarkers.length; j_average++)
            {
                var marker = _singleMarkers[j_average];
                google.maps.event.addListener(marker, 'click', (function(marker, j_average) {
                    return function() {
                        //lineClicked(marker,j_average);
                        getAverageData(j_average);
                    }
                }) (marker, j_average));
                _singleMarkers[j_average] = marker;
            }
        }

function createClickListenerButtonToday()
        {
            updateTableBottom(i_mst);
            getAverageData1(j_average);
        }

function createClickListenerButtonYesterday()
        {
            updateTableBottom(i_mst);
            getAverageData2(j_average);
        }

function createClickListenerButtonTwodaysago()
        {
            updateTableBottom(i_mst);
            getAverageData3(j_average);
        }