$(document).ready(function(){
        // bovenste speedometer
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
        
        // onderste speedometer
             var svg2 = d3.select("#speedometer2")
                        .append("svg:svg")
                        .attr("width", 400)
                        .attr("height", 400);

                gauge2 = iopctrl.arcslider()
                        .radius(120)
                        .events(false)
                        .indicator(iopctrl.defaultGaugeIndicator);
                gauge2.axis().orient("in")
                        .normalize(true)
                        .ticks(12)
                        .tickSubdivide(3)
                        .tickSize(10, 8, 10)
                        .tickPadding(5)
                        .scale(d3.scale.linear()
                                .domain([0, 160])
                                .range([-3*Math.PI/4, 3*Math.PI/4]));
        
                segDisplay2 = iopctrl.segdisplay()
                        .width(80)
                        .digitCount(6)
                        .negative(false)
                        .decimals(0);

        svg2.append("g")
                .attr("class", "segdisplay")
                .attr("transform", "translate(130, 200)")
                .call(segDisplay2);

        svg2.append("g")
                .attr("class", "gauge")
                .call(gauge2);

                getMSTData();

        });