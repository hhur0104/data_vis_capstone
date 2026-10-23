class trendCurve {

    constructor (number, state) {
        if (number == 1) {
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                .style("background-color","#20212e")
                .style("opacity","0")

            trendSVG.transition()
                .duration(500)
                .style("opacity","1")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.china_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.china_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
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
            var trendSVG =  d3.select("#context")
                .append("svg")
                .attr("height", 300)
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain([2011, 2021])
                .range([15, state.contextWidth - 15]);

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
                .attr('x',  + state.contextWidth - 100)
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
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
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
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.russia_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.russia_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
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
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.ukraine_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.ukraine_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
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

            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 350 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain([2011, 2021])
                .range([15, state.contextWidth - 15]);

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
                .style("color","white")
                .text(d => d[0].name);

            trendSVG.append("g")
                .attr("transform", "translate(0," + 260 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
                .call(d3.axisRight(yScale));

            let totalLength = trendSVG.selectAll('.line').node().getTotalLength();

            trendSVG.selectAll('.line')
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition() // Call Transition Method
                    .duration(1500) // Set Duration timing (ms)
                    .ease(d3.easeLinear) // Set Easing option
                    .attr("stroke-dashoffset", 0)
        } else if (number == 6) {
            //SaudiArabia
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.saudi_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.saudi_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.saudi_trend)
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
        } else if (number == 7) {
            //Iran
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                //.style("left",state.eur_left)
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.iran_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.iran_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.iran_trend)
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
        } else if (number == 8) {
            //Israel
            var trendSVG = d3.select("#context")
                .append("svg")
                .attr("height", 200 )
                .attr("width",state.contextWidth + "px")
                .style("position","relative")
                .style("background-color","#20212e")

            var xScale = d3.scaleLinear()
                .domain(d3.extent(state.israel_trend, d => parseInt(d.year)))
                .range([15, state.contextWidth - 15]);

            var yScale = d3.scaleLinear()
                .domain(d3.extent(state.israel_trend, d => parseFloat(d.value)))
                .range([160, 10]);  

            trendSVG.append("g")
                .attr("transform", "translate(0," + 160 + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("color","white")
                .attr("transform", "rotate(-65)");

            trendSVG.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .style("color","white")
                .call(d3.axisRight(yScale));

            var line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(parseInt(d.year)))
                .y(d => yScale(parseFloat(d.value)))

            trendSVG.append("path")
                .datum(state.israel_trend)
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
        }
    } 

    
}
export { trendCurve };