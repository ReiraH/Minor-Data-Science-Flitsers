function getAverageData(markerId)
{
    //tijdelijke array voor gevonden id's
    var _foundID = [];

    $.ajax({
    url:"average_multiple_datasets_all_new.csv",
    dataType:"text",
    success:function(data)
        {
            var _onthoudKM = [];
            var onthoudKM = 0.0;
            var average_data = data.split(/\r?\n|\r/);

            clickedMarkerId = _singleMarkerId[markerId];
            gemiddeldeKmStand = 0.0;

            for (var i = 0; i < average_data.length; i++)
            {
                cell_dataAvarage = average_data[i].split(",");

                if(clickedMarkerId == cell_dataAvarage[0])
                {
                    if(cell_dataAvarage[4] != "")
                    {
                        _onthoudKM.push(Number(cell_dataAvarage[4]));
                        onthoudKM += Number(cell_dataAvarage[4]);
                    }
                }
            }     
            onthoudDatum = cell_dataAvarage[6];    
            gemiddeldeKmStand = Number(onthoudKM / _onthoudKM.length);
            
            description = onthoudDatum;
            updateGaugeTop();
        }
    });
    
}

function getAverageData1(markerId)
{
$.ajax({
    url:"average_multiple_datasets_20_mins_new.csv",
    dataType:"text",
    success:function(data)
        {
            var _onthoudKM = [];
            var onthoudKM = 0.0;
            var average_data = data.split(/\r?\n|\r/);

            gemiddeldeKmStand = 0.0;
            for (var i = 0; i < average_data.length; i++)
            {
                cell_dataAvarage = average_data[i].split(",");

                if(clickedMarkerId == cell_dataAvarage[0])
                {
                    if(cell_dataAvarage[4] != "")
                    {
                        _onthoudKM.push(Number(cell_dataAvarage[4]));
                        onthoudKM += Number(cell_dataAvarage[4]);
                    }
                }
            }         
            gemiddeldeKmStand2 = Number(onthoudKM / _onthoudKM.length);
            
            updateGaugeBottom();
        }
    });

}


function getAverageData2(markerId)
{
    $.ajax({
        url:"average_multiple_datasets_20_mins_2_new.csv",
        dataType:"text",
        success:function(data)
            {
                var _onthoudKM = [];
                var onthoudKM = 0.0;
                var average_data = data.split(/\r?\n|\r/);
    
                gemiddeldeKmStand = 0.0;
                for (var i = 0; i < average_data.length; i++)
                {
                    cell_dataAvarage = average_data[i].split(",");

                    if(clickedMarkerId == cell_dataAvarage[0])
                    {
                        if(cell_dataAvarage[4] != "")
                        {
                            _onthoudKM.push(Number(cell_dataAvarage[4]));
                            onthoudKM += Number(cell_dataAvarage[4]);
                        }
                    }
                }         
                gemiddeldeKmStand2 = Number(onthoudKM / _onthoudKM.length);
                
                updateGaugeBottom();
            }
        });
    }

    function getAverageData3(markerId)
    {
        $.ajax({
            url:"average_multiple_datasets_20_mins_3_new.csv",
            dataType:"text",
            success:function(data)
                {
                    var _onthoudKM = [];
                    var onthoudKM = 0.0;
                    var average_data = data.split(/\r?\n|\r/);

                    gemiddeldeKmStand = 0.0;
                    for (var i = 0; i < average_data.length; i++)
                    {
                        cell_dataAvarage = average_data[i].split(",");
        
                        if(clickedMarkerId == cell_dataAvarage[0])
                        {
                            if(cell_dataAvarage[4] != "")
                            {
                                _onthoudKM.push(Number(cell_dataAvarage[4]));
                                onthoudKM += Number(cell_dataAvarage[4]);
                            }

                            //onthoudDatum2 = cell_dataAvarage[6];
                        }
                    }         
                    gemiddeldeKmStand2 = Number(onthoudKM / _onthoudKM.length);
                    
                    //description = onthoudDatum2;
                    updateGaugeBottom();
                }
            });
        }

                            // if(cell_dataAvarage[0] !== tempID)
                            // {
                            //     description = "Unknown kilometers";
                            // }
                            // else{
                            //     //_foundID.push(cell_dataAvarage[4]);
                            //     //_kmStand.push(cell_dataAvarage[4]);
                            //     onthoudKM += cell_dataAvarage[4];
                            // }