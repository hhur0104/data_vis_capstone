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
    d3.csv("./data/targets_mod.csv")
   ]).then(([tjson, target_mod]) => {
    state.world = tjson;
    state.target = [
        // Index 0 
        target_mod.filter( d=> { 
            if (d["top10"] == "TRUE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 1
        target_mod.filter( d=> { 
            if (d["top20"] == "TRUE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 2
        target_mod.filter( d=> { 
            if (d["Region"] == "AsiaOceania") { console.log("AsiaOceania?",d.Country); return d.Country}
            else return null;
        }).map( d=> { return d.Country})
    ];

    //console.log("state.target: ",state.target)
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
    
    state.index = index

    if (index == 2) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
             if (d.properties.name == "Philippines") {
                state.box = map.path.bounds(d)
                return this
             } else {return null}})
    }

    map.animate(state);
    bar.animate(state);

}

// scrollama event handlers
function handleStepEnter(response) {
    //console.log(response);
    
    // update graphic based on step
    changeColor(response.index)
    
}

function handleStepExit(response) {
    map.svg.selectAll("path.countries")
        .transition()
        .duration(1000) 
        .attr("fill","LightGray")
        .attr("stroke", "gray")

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