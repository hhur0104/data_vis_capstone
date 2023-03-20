class trendCurve {

    constructor (number, state) {
        if (number == 1) {
            console.log("make China Trend")
            console.log(d3.extent(state.china_trend, d=> parseFloat(d.value)))
            
            var trendSVG = d3.select("#china_trend")
                .attr("width", state.asia_width )
                .attr("height", 200 )
                .style("position","relative")
                .style("left",state.asia_left)
                .style("background-color","white")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.china_trend, d => parseInt(d.year)))
                .range([15, state.asia_width - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.china_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","black")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","black")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.china_trend)
                .attr("class","line")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 4)
                .attr("d", line )

            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        } else if (number == 2) {

            var trendSVG = d3.select("#EA_MNNA_trend")
                .attr("width", state.asia_width )
                .attr("height", 300 )
                .style("position","relative")
                .style("left",state.asia_left)
                .style("background-color","white")

            var xScale = d3.scaleLinear()
                .domain([2011, 2021])
                .range([15, state.asia_width - 15]);

            var yScale = d3.scaleLinear()
                .domain([9, 55]) // Hard Coding Min, Max of Three Countries
                .range([260, 10]);  

            
            var line = d3.line()
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))
                //.curve(d3.curveNatural)

            console.log("EA_MNNA", state.EA_MNNA)
            var colorScale = d3.scaleOrdinal()
                .domain(["Japan","SouthKorea","Taiwan"])
                .range(["red","yellow","green"])

            trendSVG.selectAll("path")
                .data(state.EA_MNNA)
                .join('path')
                .attr("class","line")
                .attr('d',line)
                .attr("fill", "none")
                .style('stroke', (d, i) => colorScale(d[i].name))
                .attr("stroke-width", 4)
        
            trendSVG.selectAll('text.label')
                .data(state.EA_MNNA)
                .join('text')
                .attr('class', 'label')
                .attr('x',  + state.asia_width - 100)
                .attr('y', d => yScale(d[d.length - 1].value) )
                .attr('dy', '0.35em')
                .style('font-family', 'sans-serif')
                .style('font-size', 12)
                .text(d => d[0].name);

            trendSVG.append("g")
                .attr("transform", "translate(0," + 260 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","black")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","black")
                .call(d3.axisRight(yScale));


            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        } else if (number == 3) {
            var trendSVG = d3.select("#rus_trend")
                .attr("width", state.asia_width )
                .attr("height", 200 )
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","white")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.russia_trend, d => parseInt(d.year)))
                .range([15, state.asia_width - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.russia_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","black")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","black")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.russia_trend)
                .attr("class","line")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 4)
                .attr("d", line )

            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        } else if (number == 4) {
            var trendSVG = d3.select("#ukr_trend")
                .attr("width", state.asia_width )
                .attr("height", 200 )
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","white")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.ukraine_trend, d => parseInt(d.year)))
                .range([15, state.asia_width - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.ukraine_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","black")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","black")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.ukraine_trend)
                .attr("class","line")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 4)
                .attr("d", line )

            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        }   else if (number == 5) {

            var trendSVG = d3.select("#nato_trend")
                .attr("width", state.asia_width )
                .attr("height", 300 )
                .style("position","relative")
                .style("background-color","white")

            var xScale = d3.scaleLinear()
                .domain([2011, 2021])
                .range([15, state.asia_width - 15]);

            var yScale = d3.scaleLinear()
                .domain([35, 70]) // Hard Coding Min, Max of Three Countries
                .range([260, 10]);  

            
            var line = d3.line()
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))
                //.curve(d3.curveNatural)

            var colorScale = d3.scaleOrdinal()
                .domain(["UK","Germany","France"])
                .range(["red","yellow","green"])

            trendSVG.selectAll("path")
                .data(state.nato_trend)
                .join('path')
                .attr("class","line")
                .attr('d',line)
                .attr("fill", "none")
                .style('stroke', (d, i) => colorScale(d[i].name))
                .attr("stroke-width", 4)
        
            trendSVG.selectAll('text.label')
                .data(state.nato_trend)
                .join('text')
                .attr('class', 'label')
                .attr('x',  "30px")
                .attr('y', d => yScale(d[0].value) )
                .attr('dy', '0.35em')
                .style('font-family', 'sans-serif')
                .style('font-size', 12)
                .text(d => d[0].name);

            trendSVG.append("g")
                .attr("transform", "translate(0," + 260 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","black")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","black")
                .call(d3.axisRight(yScale));

            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        }
    } 

    
}
export { trendCurve };