class stickyBar {
    
    constructor(state) {
        
        //This needs to be more Modular. // Get this from Regional.
        this.exdata  = [
            [{"src":"total", "val":2077095.3},
            {"src":"top10", "val":1577475.0}], 
            [{"src":"total", val:2077095.3},
            {"src":"top20", val:1798287.3}],
            [{"src":"total", val:2077095.3},
            {"src":"AsiaOceania", val:586066.7}]
        ]
        
        console.log("exampleData.val: ", this.exdata[0].map(d=> d.val))
        console.log("exampleData.src: ", this.exdata[0].map(d=> d.src))

        this.mar_LR = state.width * 0.15

        this.bar = d3.select("#worldmap")
            .append("svg")
            .attr("width", state.width - this.mar_LR)
            //.attr("height", state.height * 0.1)
            //.attr("width", d => xScale(d))
            //.attr("height", state.height - state.height * 0.1)

        this.colorScale = d3.scaleOrdinal()
            .domain(["total","top10","top20","AsiaOceania"])
            .range(["gray","yellow","yellow","green"])
        
        
    }

    animate(state) {    
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(this.exdata[state.index], d=> d.val)])
            .range([this.mar_LR, state.width - this.mar_LR ])

        this.bar.selectAll(".bar")
            .data(this.exdata[state.index])
            .join("rect")
            .attr("class", "bar")
            .attr("id", d => d.src)
            .attr("x", xScale(0))
            .attr("y", state.height * 0.93)
            .attr("height", 30)
            .attr("rx", 15)
        
        this.bar.selectAll("rect")
            .transition()
            .duration(2500)
            .attr("fill", d => this.colorScale(d.src))
            .attr("width",d => xScale(d.val) - this.mar_LR )
            //.delay(function(d, i){console.log(i); return(i*500)}); 

        this.bar.selectAll('text')
            .data(this.exdata[state.index])
            .join(
              enter => enter.append('text')
                    .attr("x", d => xScale(d.val))
                    .attr("y", state.height * 0.93 )
                    .attr("text-anchor", "end")
                    .style("font-size", "0.0em")
                    .style('opacity', 0)
                    .text(d => d.src)
                .transition().duration(1000)
                  .style("font-size", "0.75em")  
                  .style('opacity', 1)
                  // Note that as of v6, we have to call .selection() here
                  // This is because without it, we are returning the transition we've created,
                  // but selection.join() requires us to return a selection for enter and update groups
                  // (but not exit groups)
                  .selection()
              ,
              update => update
                  .transition().duration(1000)
                  .attr("x", d => xScale(d.val))
                  .text(d => d.src)
                  .style("font-size", "0.75em") 
                  .style('fill', 'black')
                  .selection(),
              exit => exit
                .style('font-size', "0.0em")
                .transition().duration(1000)
                  .remove()
            )

        console.log("exdata: ", xScale(this.exdata[state.index][1]["val"]))
        
        this.bar
            .append('circle')
            .attr("cx", xScale(this.exdata[state.index][1]["val"]) - 15)
            .attr("cy", state.height * 0.93 + 15)
        
        this.bar
            .append('circle')
            .attr("cx", xScale(this.exdata[state.index][0]["val"]) - 15)
            .attr("cy", state.height * 0.93 + 15)
        
        this.bar.selectAll("circle")
            .transition()
            .duration(2500) 
            .attr("r", 10)
            .attr("fill","black")  
    }
}
export { stickyBar };