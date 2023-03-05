import { worldmap } from "./worldmap.js";
import { stickyBar } from "./stickyBar.js"; 

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("#worldmap");
var article = scrolly.select("article");
var step = article.selectAll(".step");
var map;
var bar;


let state = {
    world : [],
    width : window.innerWidth * 1,
    height : window.innerHeight * 0.95,
    index : 0,
    box : [[],[]]
};

Promise.all([
    d3.json("./data/world-110.topo.json"),
   ]).then(([tjson]) => {
    state.world = tjson;
    init();
   });

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 1);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight * 0.95;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;
    // var figureHeight = window.innerHeight * 0.85;
    // var figureMarginTop = window.innerHeight * 0.05

    state.figureHeight = figureHeight

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

function changeColor(index) {
    // europe.svg.selectAll("path.countries")
    //     .select(function(d) {
    //          if (d.properties.name == target[index]) {
    //             box = europe.path.bounds(d)
    //             return this
    //          } else {return null}})
    //     .transition()
    //     .duration(2500)
    //     .attr("fill","Red")
    state.index = index

    if (index == 2) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
             if (d.properties.name == "Taiwan") {
                state.box = map.path.bounds(d)
                return this
             } else {return null}})
    }

    map.animate(state);
    bar.animate(state);
        
    // console.log("Box", box)
    // console.log("x0:", box[0][0], ", x1:",box[1][0])
    // console.log("y0:", box[0][1], ", y1:",box[1][1])
    // europe.svg.transition()
    //     .duration(2500)
    //     .call(
    //         europe.zoom.transform,
    //         d3.zoomIdentity
    //             .translate(state.width / 2 , state.height / 2 ) // change by index
    //             .scale(1.5)
    //             .translate(-(box[0][0] + box[1][0]) / 2, -(box[0][1] + box[1][1]) / 2)
    //     );

}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    // step.classed("is-active", function (d, i) {
    //     return i === response.index;
    // });
    
    // update graphic based on step
    changeColor(response.index)
    
}

function handleStepExit(response) {
    // europe.svg.selectAll("path.countries")
    //     .transition()
    //     .attr("fill","LightGray")

    // europe.svg.transition()
    //     .duration(1500) 
    //     .call(
    //         europe.zoom.transform,
    //         d3.zoomIdentity,
    //         d3.zoomTransform(europe.svg.node()).invert([state.width /2 , state.height /2])
    //     );
}

function init() {
    map = new worldmap(state);
    bar = new stickyBar(state);

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.7,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)
        
}