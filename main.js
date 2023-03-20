import { worldmap } from "./worldmap.js";
import { stickyBar } from "./stickyBar.js"; 
import { trendCurve } from "./trendCurve.js";

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
// var figure = scrolly.select("#figure");
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
    d3.csv("./data/targets_mod.csv"),  
    d3.csv("./data/trend_lastSvn.csv")
   ]).then(([tjson, target_mod, trend]) => {
    state.world = tjson;
    state.target = [
        // Index 0 
        target_mod.filter( d=> { 
            if (d["big2021"] == "TRUE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        // index 1
        target_mod.filter( d=> { 
            if (d["big2021"] == "FALSE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        // Index 2 
        target_mod.filter( d=> { 
            if (d["top10"] == "TRUE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 3
        target_mod.filter( d=> { 
            if (d["top20"] == "TRUE") {return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 4
        target_mod.filter( d=> { 
            if (d["SubRegion"] == "North America") { return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 5
        target_mod.filter( d=> { 
            if (d["SubRegion"] == "East Asia") { return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 6
        target_mod.filter( d=> { 
            if (d["SubRegion"] == "Western Europe") { return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 7
        target_mod.filter( d=> { 
            if (d["SubRegion"] == "Middle East") { return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        //Index 8
        target_mod.filter( d=> { 
            if (d["SubRegion"] == "East Asia") { return d.Country}
            else return null;
        }).map( d=> { return d.Country}),
        [],[],
        ["China"],
        ["Japan" ,"South Korea","Taiwan"],
        ["China","Japan" ,"South Korea","Taiwan"],
        [],[],[],
        ["Russia"], // R20, S17
        ["Ukraine"],
        ["United Kingdom","Germany","France"], 
        target_mod.filter( d=> { 
            if (d["big2021"] == "TRUE" && d["Region"] == "Europe") {return d.Country}
            else return null;
        }).map( d=> { return d.Country})
    ];
    state.china_trend = trend.map(({Year, China}) => ({year: Year, value: China}))
    state.EA_MNNA = [
        trend.map(({Year, Japan}) => ({year: Year, name:"Japan", value: Japan})),
        trend.map(({Year, SouthKorea}) => ({year: Year, name:"SouthKorea",value: SouthKorea})),
        trend.map(({Year, Taiwan}) => ({year: Year, name:"Taiwan", value: Taiwan}))
        //trend.map(({Year, SouthKorea}) => ({year: Year, name:"SouthKorea",value: SouthKorea})),
        //trend.map(({Year, Taiwan}) => ({year: Year, name:"Taiwan", value: Taiwan}))
    ]
    state.russia_trend = trend.map(({Year,Russia}) => ({year:Year, value:Russia}))
    state.ukraine_trend = trend.map(({Year,Ukraine}) => ({year:Year, value:Ukraine}))
    state.nato_trend = [
        trend.map(({Year, UK}) => ({year: Year, name:"UK", value: UK})),
        trend.map(({Year, Germany}) => ({year: Year, name:"Germany",value: Germany})),
        trend.map(({Year, France}) => ({year: Year, name:"France", value: France}))
        //trend.map(({Year, SouthKorea}) => ({year: Year, name:"SouthKorea",value: SouthKorea})),
        //trend.map(({Year, Taiwan}) => ({year: Year, name:"Taiwan", value: Taiwan}))
    ]
    init();
   });

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 1);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight * 0.95 ;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2 ;
    // var figureHeight = window.innerHeight * 0.85;
    // var figureMarginTop = window.innerHeight * 0.05

    state.figureHeight = figureHeight

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    article
        .style("left",window.innerWidth * 0.37 + "px");

    main.select("#heading")
        .style("top", window.innerHeight * 0.40 + "px")
        .style("left",window.innerWidth * 0.40 + "px")

    article.selectAll(".asia")
        .style("left",window.innerWidth * 0.25 + "px");


    state.asia_width = article.selectAll(".asia").node().getBoundingClientRect().width
    
    state.asia_left = window.innerWidth * 0.25
    console.log("asia_width:", state.asia_width)

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

function changeColor(index) {
    
    state.index = index - 3
    
    if (state.index == 4) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
             if (d.properties.name == "United States of America") {
                state.box = map.path.bounds(d)
                return this
             } else {return null}})
    }
    if (state.index == 5) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
             if (d.properties.name == "Taiwan") {
                state.box = map.path.bounds(d)
                return this
             } else {return null}})
    } 
    if (state.index ==6) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Germany") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 7 ) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Kuwait") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 9) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Taiwan") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 11) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "South Korea") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 12) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Japan") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    } 
    if (state.index == 15) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Germany") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 17) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Ukraine") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 18) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Poland") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 19 || state.index == 20) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "United Kingdom") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 22) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Kuwait") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    map.animate(state);
    bar.animate(state);

}

// scrollama event handlers
function handleStepEnter(response) {
    console.log("ResponseIndex:", response.index)
        
    if (response.index == 0) {
        map.svg.selectAll("path.countries")
            .attr("fill","LightGray")
            .attr("stroke", "gray")

        map.svg
            .transition()
            .duration(1000)
            .attr("opacity","0")
        
        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","0")
            

    } else if (response.index == 1) {
        main.select("#heading")
            .text("World Overview")

        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","1")
        
        map.svg.selectAll("path.countries")
            .attr("fill","LightGray")
            .attr("stroke", "gray")

        map.svg
            .transition()
            .duration(500)
            .attr("opacity","0.5")

    } else if (response.index == 2) {
        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","0")

         map.svg
            .transition()
            .duration(50)
            .attr("opacity","1")

    } else if (response.index > 2 && response.index < 11) {
        // update graphic based on step
        changeColor(response.index)

    } else if (response.index == 11) {
        changeColor(response.index)

        //StickyBar should disappear
        if(response.direction == "up") {
            main.select("#heading")
                .style("opacity","0")

            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .style("opacity","1")
        }
    } else if (response.index==12) {
        main.select("#heading")
            .text("East Asia")

        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","1")

        changeColor(response.index)
    } else if (response.index == 13) {
        main.select("#heading")
            .transition()
            .duration(50)
            .style("opacity","0")
        
        map.svg.selectAll("path.countries")
            .transition()
            .duration(50) 
            .style("opacity","1")

        changeColor(response.index)

        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","LightGray")
        }

    } else if (response.index == 14) {
        // China
        changeColor(response.index)
        var crv1 = new trendCurve(1, state)    
    } else if (response.index == 15) {
        //EA MNNA
        changeColor(response.index)
        var crv2 = new trendCurve(2, state)
    } else if (response.index == 16) {
        //EA Closing
        changeColor(response.index)
    } else if (response.index == 17) {
        // WorldOpaque
        changeColor(response.index)
        
        if(response.direction == "up") {
            main.select("#heading")
                .style("opacity","0")
            
            article
                .style("left",window.innerWidth * 0.37 + "px");
        }
    } else if (response.index==18) {
        // Europe Heading
        main.select("#heading")
            .text("Europe")

        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","1")
        
        article
            .style("left",window.innerWidth * 0.05 + "px");
        state.eur_left = window.innerWidth * 0.05

        changeColor(response.index)
    } else if (response.index == 19) {
        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","LightGray")
        }

        // Europe Intro
        main.select("#heading")
            .transition()
            .duration(50)
            .style("opacity","0")
        
        map.svg.selectAll("path.countries")
            .transition()
            .duration(50) 
            .style("opacity","1")

        changeColor(response.index)        
    } else if (response.index == 20) {
        // Russia
        changeColor(response.index)
        var crv3 = new trendCurve(3, state)
    } else if (response.index == 21) {
        // Ukraine
        changeColor(response.index)
        var crv4 = new trendCurve(4, state)
    } else if (response.index == 22) {
        // UK, Germany, France
        changeColor(response.index)
        var crv5 = new trendCurve(5, state)
    } else if (response.index == 23) {
        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .style("opacity","1")
        }
        // Europe Closing
        changeColor(response.index)

        
    } else if (response.index == 24) {
        if(response.direction == "up") {
            main.select("#heading")
                .style("opacity","0")
            
            article
                .style("left",window.innerWidth * 0.05 + "px");
            state.eur_left = window.innerWidth * 0.05
        }
        // WorldOpaque
        changeColor(response.index)
    } else if (response.index==25) {
        // Europe Heading
        main.select("#heading")
            .text("Middle East")

        main.select("#heading")
            .transition()
            .duration(500)
            .style("opacity","1")
        
        article
            .style("left",window.innerWidth * 0.05 + "px");
        state.eur_left = window.innerWidth * 0.05

        changeColor(response.index)
    } else if (response.index == 26) {
        // Middle East Intro
        main.select("#heading")
            .transition()
            .duration(50)
            .style("opacity","0")
        
        map.svg.selectAll("path.countries")
            .transition()
            .duration(50) 
            .style("opacity","1")

        changeColor(response.index)

        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","LightGray")
        }
    }
}

function handleStepExit(response) {
    if (response.index < 2 || 
        ( 5 <= response.index && response.index <= 9)) {

    } else {
        map.svg.selectAll("path.countries")
            .transition()
            .duration(1000) 
            .attr("fill","LightGray")
            .attr("stroke", "gray")
    }
    
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
            offset: 0.9,
            progress: true,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        //.onStepProgress(handleStepProgress);
        //.onStepExit(handleStepExit)
        
}