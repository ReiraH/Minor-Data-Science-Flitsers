        function getData_button1()
        {
          $.ajax({
           url:"MST_vandaag.csv",
           dataType:"text",
           success:function(data)
           {
                var mst_data = data.split(/\r?\n|\r/);
                allMstDataRealTime = mst_data;
           }
         });
        }

        function getData_button2()
        {
          $.ajax({
           url:"MST_vandaag.csv",
           dataType:"text",
           success:function(data)
           {
                var mst_data = data.split(/\r?\n|\r/);
                allMstDataRealTime = mst_data;
           }
         });
        }

        function getData_button3()
        {
          $.ajax({
           url:"MST_vandaag.csv",
           dataType:"text",
           success:function(data)
           {
                var mst_data = data.split(/\r?\n|\r/);
                allMstDataRealTime = mst_data;
           }
         });
        }