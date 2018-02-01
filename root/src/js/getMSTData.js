     function getMSTData()
        {

          $.ajax({
           url:"MST.csv",
           dataType:"text",
           success:function(data)
           {

            var mst_data = data.split(/\r?\n|\r/);

            allMstData = mst_data;

            for (var i = 0; i < allMstData.length; i++)
            {

             if (i == 0)
              {
               //header skippen
              }

              else
              {
                var cell_data = mst_data[i].split(",");
                    cell_id = cell_data[0];
                var id = cell_data[0];
                    markerLat = cell_data[1];
                    markerLong = cell_data[2];
                var siteName = cell_data[3];
                //if startlat of andere coordinaat leeg is -> doe niks 
                //else drawLine
                var startLat = cell_data[4];
                var endLat = cell_data[6];
                var startLong = cell_data[5];
                var endLong = cell_data[7];

                if(startLat == "" || startLong == "" || endLat == "" || endLong == "")
                {
                    drawMarker(markerLat, markerLong,id);
                }

                drawLine (siteName, startLat, startLong, endLat, endLong, id);

              }

            }

           }
         });

         $( document ).ajaxComplete(function() {
          createClickListenerMap();

        });

        }