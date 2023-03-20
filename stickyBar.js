class stickyBar {
    
    constructor(state) {
        
        //This needs to be more Modular. // Get this from Regional.
        this.exdata  = [
            [], // 0
            [], // 1
            [{"src":"total", "val":2077095.3},
            {"src":"top10", "val":1577475.0}], //2
            [{"src":"total", val:2077095.3},   
            {"src":"top20", val:1798287.3}],   //3
            [{"src":"total", val:2077095.3},
            {"src":"NorthAmerica", val:827121.4}], // 4
            [{"src":"total", val:2077095.3},
            {"src":"EastAsia", val:410769.1}],  // 5  
            [{"src":"total", val:2077095.3},
            {"src":"WestEur", val:304961.2}], // 6
            [{"src":"total", val:2077095.3},
            {"src":"MiddleEast", val:186318.5}], // 7
            [], // 8
            [], // 9
            [], // 10
            [{"src":"total", val:410769.1},
            {"src":"China", val:293351.8}], // state.index=11, response.index=14
            [{"src":"total", val:410769.1},
            {"src":"EastAsia MNNA", val:117309}],
            [{"src":"East4", val:715621.8},
            {"src":"WestEur", val:304961.2}],
            [],[],[],
            [{"src":"EasternEurope", val:76290},
            {"src":"Russia", val:65907.7}],
            [{"src":"EasternEurope", val:76290},
            {"src":"Ukraine", val:5942.8}],
            [{"src":"WesternEurope", val:304961.2},
            {"src":"Nato3", val:181030.4}],
            [],[],[]
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
            .domain(["total","top10","top20","NorthAmerica","EastAsia","WestEur","MiddleEast",
            "China","EastAsia MNNA","East4","EasternEurope","Russia","Ukraine","WesternEurope","Nato3"])
            .range(["gray","yellow","yellow","green","green","green","green",
            "red","red","red","gray","red","red","gray","red"])
        
        
    }

    animate(state) {    
        if (state.index < 2 || 
            state.index == 8 || state.index ==9 || state.index == 10 ||
            state.index == 14 || state.index == 15 || state.index == 16 ||
            state.index == 20) {
                this.bar.selectAll("bar").remove()
                this.bar.selectAll("rect").remove()
                this.bar.selectAll("text").remove()
                this.bar.selectAll("circle").remove()
            return ;
        }
        if (state.index == 19) {
            this.bar.selectAll("circle").remove()
        }
        
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
                // .style('font-size', "0.0em")
                // .transition().duration(1000)
                //   .remove()
            )
        
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