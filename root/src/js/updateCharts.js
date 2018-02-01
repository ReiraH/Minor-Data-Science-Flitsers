function updateGaugeTop()
        {
                if(isNaN(gemiddeldeKmStand))
                {
                        segDisplay.value("9999");
                        gauge.value(gemiddeldeKmStand);
                }
                else
                {
                        segDisplay.value(gemiddeldeKmStand.toString());
                        gauge.value(gemiddeldeKmStand); 
                }
        }

function updateGaugeBottom()
        {
                if(isNaN(gemiddeldeKmStand2))
                {
                        segDisplay2.value("9999");
                        gauge2.value(gemiddeldeKmStand2);
                }
                else
                {
                        segDisplay2.value(gemiddeldeKmStand2.toString());
                        gauge2.value(gemiddeldeKmStand2); 
                }
        }


function updateTableTop(regel)
        {
                drawTableTop(vanLocatie, naarLocatie, 0, tempID, templatA, templatB, templongA, templongB, description);
        }

function updateTableBottom(regel)
        {
                drawTableBottom(vanLocatie, naarLocatie, 0, tempID, templatA, templatB, templongA, templongB, description);
        }