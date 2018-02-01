      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(initializeTopTable);
      google.charts.setOnLoadCallback(initializeBottomTable);

      //Lege tabel aanmaken
      function initializeTopTable() {

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Name');
        data.addColumn('string', 'Value');
        data.addRows([
            ['Place of Origin',"" ],
            ['Destination', ""],
            ['Date',""],
            ['ID', ""],
            ['Startpoint_X', ""],
            ['Endpoint_X', ""],
            ['Startpoint_Y', ""],
            ['Endpoint_Y',""],
            ['Description',""]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
      }

      function initializeBottomTable() {

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Name');
        data.addColumn('string', 'Value');
        data.addRows([
            ['Place of Origin',"" ],
            ['Destination', ""],
            ['Date',""],
            ['ID', ""],
            ['Startpoint_X', ""],
            ['Endpoint_X', ""],
            ['Startpoint_Y', ""],
            ['Endpoint_Y',""],
            ['Description',""]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div2'));

        table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
      }

      function drawTableTop(streetNameStart, streetNameEnd, date, tempID, startX, endX, startY, endY, description) {

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Name');
        data.addColumn('string', 'Value');
        
        if(streetNameStart == null)
        {
            streetNameStart = "Unknown Value";
        }

        if(streetNameEnd == null)
        {
          streetNameEnd = "Unknown Value";
        }

        data.addRows([
            ['Place of Origin',String(streetNameStart) ],
            ['Destination', String(streetNameEnd)],
            ['Date', String(date)],
            ['ID', String(tempID)],
            ['Startpoint_X', String(startX)],
            ['Endpoint_X', String(startY)],
            ['Startpoint_Y', String(endX)],
            ['Endpoint_Y', String(endY)],
            ['Description',String(description)]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
      }


    function drawTableBottom(streetNameStart, streetNameEnd, date, tempID, startX, endX, startY, endY, description) {

      var data = new google.visualization.DataTable();

      data.addColumn('string', 'Name');
      data.addColumn('string', 'Value');

      if(streetNameStart == null)
      {
          streetNameStart = "Unknown Value";
      }

      if(streetNameEnd == null)
      {
        streetNameEnd = "Unknown Value";
      }

      data.addRows([
          ['Place of Origin',String(streetNameStart) ],
          ['Destination', String(streetNameEnd)],
          ['Date', String(date)],
          ['ID', String(tempID)],
          ['Startpoint_X', String(startX)],
          ['Endpoint_X', String(startY)],
          ['Startpoint_Y', String(endX)],
          ['Endpoint_Y', String(endY)],
          ['Description',String(description)]
      ]);

      var table = new google.visualization.Table(document.getElementById('table_div2'));

      table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
    }