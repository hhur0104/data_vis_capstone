class worldmap {
    
    constructor(state) {
        console.log(state.width);
        console.log(state.height);

        this.svg = d3.select("#worldmap")
            //.append("svg")
            .attr("class", "svg-map")
            .attr("visibility","hidden")
            //.attr("width",state.width)
            //.attr("height",state.height)
            //.attr("viewBox",[-260,-250,state.width, state.height])
            
        const g = this.svg.append("g");
        
        var projection = d3.geoMercator()
            .scale(state.width * 0.14)
            .center([0, 10])
            .translate([state.width/2, state.height/2])
                
        this.path = d3.geoPath(projection);

        const countries = g.append("g")
            .selectAll("path.countries")
            .data(topojson.feature(state.world, state.world.objects.countries).features,
             d => d.properties.name)
            .join("path")
            .attr("class", "countries")
            .attr("d", this.path)
            .attr("stroke", "gray")
            .attr("fill", d => {
                //console.log(d.properties.name)
                return "LightGray"})
            
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
        const targetList = state.target[state.index]
        // console.log("targetList: ", targetList)

        if (!(4 <= state.index && state.index <= 8)) {
            this.svg.transition()
                .duration(1500) 
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity,
                    d3.zoomTransform(this.svg.node()).invert([state.width /2 , state.height /2])
                );
        }
        
        this.svg.selectAll("path.countries")
            .transition()
            .duration(2500)
            .attr("fill", d=> {
                if(targetList.includes(d.properties.name)) {return "red"}
                else {return "LightGray"}})
            
        
        if (state.index == 1) {
            this.svg.selectAll("path.countries")
                .select(function(d) {
                    if (targetList.includes(d.properties.name)) { return this }
                    else {return null}})
                .transition()
                .duration(2500)
                .attr("fill", "Blue")
                .attr("stroke", "black")
        }
        
        if (state.index == 4 || state.index == 5 ||
            state.index == 6 || state.index == 7 || state.index == 8 || 
            state.index == 9 ) {
            
            this.svg.transition()
                .duration(2500)
                .call(
                    this.zoom.transform,
                    d3.zoomIdentity
                        .translate(state.width / 2 , state.height / 2 ) // change by index
                        .scale(1.8)
                        .translate(-(state.box[0][0] + state.box[1][0]) / 2, 
                                   -(state.box[0][1] + state.box[1][1]) / 2)
                );
        }
        
    }
}
export { worldmap };