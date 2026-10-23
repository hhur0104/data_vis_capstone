class worldmap {
    
    constructor(state) {
        console.log(state.width);
        console.log(state.height);

        this.svg = d3.select("#worldmap")
            //.append("svg")
            .attr("class", "svg-map")
            .attr("opacity","0")
            .style("left",state.leftMar)
            //.attr("width",state.width)
            //.attr("height",state.height)
            //.attr("viewBox",[-260,-250,state.width, state.height])
            
        const g = this.svg.append("g");
        
        var projection = d3.geoMercator()
            .scale(state.width * 0.17)
            .center([0, 30])
            .translate([state.width/2, state.height/2])
                
        this.path = d3.geoPath(projection);

        const countries = g.append("g")
            .selectAll("path.countries")
            .data(topojson.feature(state.world, state.world.objects.countries).features,
             d => d.properties.name)
            .join("path")
            .attr("class", "countries")
            .attr("d", this.path)
            .attr("stroke", "#90CCF4")
            .attr("fill", d => {
                //console.log(d.properties.name)
                return "#464866"})
            
        g.append("path")
            .attr("fill", "none")
            .attr("stroke-linejoin", "round")
            .attr("d", this.path(topojson.mesh(state.world, state.world.objects.countries, (a, b) => a !== b)));
        
        this.zoom = d3.zoom()
            .scaleExtent([1, 1.5])
            .on("zoom", zoomed);
        
        this.svg.call(this.zoom)
            .on("wheel.zoom", null);
        
        function zoomed({transform}) {
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }    
    }

    animate(state) {
        var targetList;
        if (state.index == -1) {
            console.log("Everythin Reset")
            this.svg.selectAll("path.countries")
                .attr("fill","#464866")
            
        }
        else {
        
        targetList = state.target[state.index]
        // console.log("targetList: ", targetList)

        if (state.index < 4 ) {
            this.svg.transition()
                .duration(1500) 
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity,
                    d3.zoomTransform(this.svg.node()).invert([state.width /2 , state.height /2])
                );
        }

        if ((state.index >= 0 && state.index <= 7) ||
            (state.index == 11 || state.index == 12 || state.index == 13) ||
            (state.index == 17 || state.index == 18 || state.index == 19 || state.index == 20) ||
            (state.index == 24 || state.index == 25 || state.index == 26 || state.index == 27) ||
            state.index == 29) {
            if (state.index == 1) {
                this.svg.selectAll("path.countries")
                    .transition()
                    .duration(1000)
                    .attr("fill", d=> {
                        if(targetList.includes(d.properties.name)) {return "#77A6F7"}
                        else {return "#464866"}})
            } else {
                this.svg.selectAll("path.countries")
                    .transition()
                    .duration(1000)
                    .attr("fill", d=> {
                        if(targetList.includes(d.properties.name)) {return "#F76C6C"}
                        else {return "#464866"}})
            }
        }
        
        if (state.index == 4 || state.index == 5 ||
            state.index == 6 || state.index == 7 || state.index == 9 ){
                this.svg.transition()
                .duration(1000)
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity
                        .translate(state.width / 2 , state.height / 2 ) // change by index
                        .scale(2.0)
                        .translate(-(state.box[0][0] + state.box[1][0]) / 2, 
                                   -(state.box[0][1] + state.box[1][1]) / 2)
                );
            }
        

        if( state.index == 11 || state.index == 12 || state.index == 13 || state.index == 15 ||
            state.index == 17 || state.index == 18 || state.index == 19 || state.index == 20 ||
            state.index == 22 || state.index == 24 || state.index == 25 || state.index == 27)  {
            this.svg.transition()
                .duration(1000)
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity
                        .translate(state.width / 2 , state.height / 2 ) // change by index
                        .scale(3.0)
                        .translate(-(state.box[0][0] + state.box[1][0]) / 2, 
                                   -(state.box[0][1] + state.box[1][1]) / 2)
                );
        }

        //Israel
        if (state.index == 26) {
            this.svg.transition()
                .duration(1000)
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity
                        .translate(state.width / 2 , state.height / 2 ) // change by index
                        .scale(5.0)
                        .translate(-(state.box[0][0] + state.box[1][0]) / 2, 
                                   -(state.box[0][1] + state.box[1][1]) / 2)
                );
        }

        
        if (state.index == 8 || state.index == 14 || state.index == 21 || state.index == 28) {
            console.log("map reset fi#F76C6C.")
            
            this.svg.selectAll("path.countries")
                .transition()
                .duration(500) 
                .attr("fill","#464866")
                //.style("opacity","0.2")
            
            this.svg.transition()
                .duration(1000) 
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity,
                    d3.zoomTransform(this.svg.node()).invert([state.width /2 , state.height /2])
                );
        }
    }
        
    }
}
export { worldmap };