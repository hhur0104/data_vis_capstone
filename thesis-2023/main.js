import { worldmap } from "./worldmap.js";
import { stickyBar } from "./stickyBar.js"; 
import { trendCurve } from "./trendCurve.js";
import { naviBar } from "./naviBar.js";

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
// var figure = scrolly.select("#figure");
var figure = scrolly.select("#worldmap");
var article = scrolly.select("article");
var step = article.selectAll(".step");
var map;
var bar;
var nav;
const textData = [
    "" 
    ,"Let's start with an overview." // response.index == 0, 1
    ,"In 2021, 98 countries increased their military expenditure spending." //2
    ,"and 36 countries decreased their spending."      //3
    ,"The top 10 spending countries accounted for ~75% of world's total. That is about 1.6 Trillion US Dollars." //4
    ,"Adding the next 10, top 20 countries account for ~86% of the total." //5
    ,"North America has the most regional total. US = $800B. Canada=$26B"  //6
    ,"East Asia ranks 2nd in regional total. $410B"      //7
    ,"Western Europe ranks 3rd in regional total. $305B" //8
    ,"Middle East ranks 4th in regional total. $186B"    //9
    ,""
    ,"Let's look at East Asia." //10, 11
    ,"Since WWII, East Asia has been an important region in preventing the spread of communism led by U.S and its Major Non-Nato Allies. \n That strategy largely remains the same. \n\n Scroll down for more detail outlook." //12
    ,"China \n- 2nd in GDP \n- 2nd in Military Expenditure \n- Most Foreign Arms Deal: Russia (Import)\n- Formal Ally: North Korea\n- Nuclear Warheads\n- Milex Trend in Last 10 Years:" //13
    ,"Japan, South Korea & Taiwan\n- 3rd, 10th, ~20th in GDP\n- 9th, 10th, 21st in Military Expenditure\n- Most Foreign Arms Deal: US (Import)\n- US Major Non-Nato Allies" //14
    ,"Just these four countries together spent more than all Western Europe combined ($410B > $305B). Conflicts of political and economical interests between these countries make this region a hot bed for possible military conflict. \n\n Upward trend will likely continue."
    ,""//16
    ,""//17
    ,"After the fall of Soviet Union, Europe went through a period of demilitarization. Since the annexation of Crimea by Russia, Europe has been steadily increasing military spending once again. \n\nScroll down for more detail outlook of key nations."
    ,"Russia\n- GDP: 11th\n- Milex World: 5th\n- Milex Europe: 2nd\n- Most Foreign Arms Deal: India, China (Export)\n- Nuclear Warheads"//19
    ,"Ukraine\n- GDP $200B\n- 35th in Military Expenditure $5.6B\n- Most Foreign Arms Deal: US (Import)\n" //20
    ,"UK, France, Germany\n- GDP: 5,7,4th\n- Milex World: 4,6,7th\n- Milex Europe: 1,3,4th\n- Allies: NATO\n- Most Foreign Arms Deal: US (Import)\n- Nuclear Warheads (UK, France)" //21
    ,"The upward trend was already there. Most of the Europe increased their spending in 2021 (marked red) even before the Russian invasion of Ukraine in 2022. This prompted Sweden and Finland to newly join NATO alliance, but a resolution in Ukraine still seems far away at the time of writing. \n\nThe rearmament trend in Europe will likely continue." //22
    ,"" //23
    ,"" //24
    ,"With world's most Oil reserves, this region always been a region of nterests for major powers in Europe and America in 20th century. The recent history also contributes the geopolitics in the region to remain constantly at unease with range of problems to resolve.\n\nScroll down to see military spending outlook for major powers in the region." //25
    ,"Saudi Arabia\n- GDP: 19th\n- Milex MiddleEast: 1st\n- Milex World: 8th\n- Most Foreign Arms Deal: US (Import)\n- Petro-Dollar Agreement with US" //26
    ,"Iran\n- GDP: 17th\n- Milex MiddleEast: 2nd\n- Milex World: 14th\n- US Economic Sanction on Iran" //27
    ,"Israel\n- GDP: 30th\n- Milex MiddleEast: 3rd\n- Milex World: 15th\n- US Major Non-Nato Ally" //28
    ,"In March 2023, Saudi Arabia and Iran announced they are restoring diplomatic relations with China brokering the deal. This is a diplomatic blow to U.S. and a win for China. This potentially may lead to more complex and complicated conflicts if China gains more favor in the region and tries to replace more traditional western politics and interests " //29
    
]


let state = {
    world : [],
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
        }).map( d=> { return d.Country}),
        [],[],[],
        ["Saudi Arabia"], //R26
        ["Iran"],  //R27
        ["Israel"], //R28
        []
        // ["Bahrain", "Egypt", "Israel", "Jordan", "Kuwait", "Morocco", "Pakistan",  "Qatar", "Tunisia"], //R29
        // [], //R30
        // target_mod.filter( d=> { 
        //     if (d["NATO"] == "TRUE" || d["MNNA"] == "TRUE") {return d.Country}
        //     else return null;
        // }).map( d=> { return d.Country})
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
    state.saudi_trend = trend.map(({Year,SaudiArabia}) => ({year:Year, value:SaudiArabia}))
    state.iran_trend = trend.map(({Year,Iran}) => ({year:Year, value:Iran}))
    state.israel_trend = trend.map(({Year,Israel}) => ({year:Year, value:Israel}))
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
    state.width = window.innerWidth * 0.7;
    state.height = window.innerHeight * 0.95;
    state.leftMar = window.innerWidth * 0.3;
    state.contextWidth = state.leftMar - 20;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    article
        .style("left","0 px");

    main.select("#heading")
        .style("top", window.innerHeight * 0.45 + "px")
        .style("left", window.innerWidth * 0.45 + "px")

    d3.select('#context')
        .style("top",window.innerHeight * 0.35 + "px")
        .style("width",state.contextWidth + "px")
        

    // article.selectAll(".asia")
    //     .style("left",window.innerWidth * 0.25 + "px");


    // state.asia_width = article.selectAll(".asia").node().getBoundingClientRect().width
    
    // state.asia_left = window.innerWidth * 0.25
    // console.log("asia_width:", state.asia_width)

    // 3. tell scrollama to update new element dimensions
    scroller.resize();

    map = new worldmap(state);
    bar = new stickyBar(state);
    nav = new naviBar(state);
}

function changeColor(index) {
    
    state.index = index - 2
    
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
            if (d.properties.name == "China") {
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
    if (state.index == 13) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "China") {
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
    if (state.index == 24) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Saudi Arabia") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 25) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Iran") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 26) {
        map.svg.selectAll("path.countries")
            .select(function(d) {
            if (d.properties.name == "Israel") {
                state.box = map.path.bounds(d)
                return this
            } else {return null}})
    }
    if (state.index == 27) {
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

    d3.select('#context').selectAll("svg").remove()
    d3.select('#typewriter').selectAll("text").remove()

    d3.select('#typewriter')
        .transition()
        .duration(3000)
        .tween("text", function () {
            var newText = textData[response.index];
            var textLength = newText.length;
            return function (t) {
                this.innerText = newText.substring(0, Math.round( t * textLength) ) ;
            };
        });
    

    if (response.index == 0) {
        map.svg.selectAll("path.countries")
            .attr("fill","#464866")

        main.select("#navi")
            .transition()
            .style("opacity", "0")

        map.svg
            .transition()
            .style("opacity","0")
        
        main.select("#heading")
            .style("opacity","0")
            
    } else if (response.index == 1) {
        // map.svg.selectAll("path.countries")
        //     .attr("fill","#464866")
       
        map.svg.transition()
            .duration(1000)
            .style("opacity","1")
            .call(
                map.zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(map.svg.node()).invert([state.width /2 , state.height /2])
            );

        changeColor(response.index)

        main.select("#navi")
            .transition()
            .duration(500)
            .style("opacity", "1")
        
        // main.select("#heading")
        //     .transition()
        //     .duration(500)
        //     .style("opacity","1")

        main.select("#world_navi")
            .classed("active",true)
        

        main.select("#heading")
            .text("World Overview")

    } else if (response.index >= 2 && response.index < 10) {
        // main.select("#heading")
        //     .transition()
        //     .duration(50)
        //     .style("opacity","0")

        // update graphic based on step
        changeColor(response.index)

    } else if (response.index == 10) {
        //World Opague
        changeColor(response.index)

        //StickyBar should disappear
        if(response.direction == "up") {
            // main.select("#heading")
            //     .style("opacity","0")

            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .style("opacity","1")

            main.select("#world_navi")
                .classed("active",true)
            main.select("#east_navi")
                .classed("active",false)
        }
    } else if (response.index==11) {
        //East Asia Start
        // main.select("#heading")
        //     .text("East Asia")

        // main.select("#heading")
        //     .transition()
        //     .duration(500)
        //     .style("opacity","1")
        
        main.select("#world_navi")
            .classed("active",false)
        main.select("#east_navi")
            .classed("active",true)

        changeColor(response.index)
    } else if (response.index == 12) {
        // main.select("#heading")
        //     .transition()
        //     .duration(50)
        //     .style("opacity","0")

        changeColor(response.index)

        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","#464866")
        }

    } else if (response.index == 13) {
        // China
        changeColor(response.index)
        var crv1 = new trendCurve(1, state)    
    } else if (response.index == 14) {
        //EA MNNA
        changeColor(response.index)
        var crv2 = new trendCurve(2, state)
    } else if (response.index == 15) {
        //EA Closing
        changeColor(response.index)
    } else if (response.index == 16) {
        // WorldOpaque
        changeColor(response.index)
        
        if(response.direction == "up") {
            // main.select("#heading")
            //     .style("opacity","0")
            
            main.select("#east_navi")
                .classed("active",true)
            main.select("#eur_navi")
                .classed("active",false)

            // article
            //     .style("left",window.innerWidth * 0.37 + "px");
        }
    } else if (response.index==17) {
        // Europe Heading
        // main.select("#heading")
        //     .text("Europe")

        // main.select("#heading")
        //     .transition()
        //     .duration(500)
        //     .style("opacity","1")
        
        main.select("#east_navi")
            .classed("active",false)
        main.select("#eur_navi")
            .classed("active",true)

        // article
        //     .style("left",window.innerWidth * 0.05 + "px");
        state.eur_left = window.innerWidth * 0.05

        changeColor(response.index)
    } else if (response.index == 18) {
        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","#464866")
        }

        // Europe Intro
        // main.select("#heading")
        //     .transition()
        //     .duration(50)
        //     .style("opacity","0")
        
        map.svg.selectAll("path.countries")
            .transition()
            .duration(50) 
            .style("opacity","1")

        changeColor(response.index)        
    } else if (response.index == 19) {
        // Russia
        changeColor(response.index)
        var crv3 = new trendCurve(3, state)
    } else if (response.index == 20) {
        // Ukraine
        changeColor(response.index)
        var crv4 = new trendCurve(4, state)
    } else if (response.index == 21) {
        // UK, Germany, France
        changeColor(response.index)
        var crv5 = new trendCurve(5, state)
    } else if (response.index == 22) {
        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .style("opacity","1")

            main.select("#eur_navi")
                .classed("active",true)
            main.select("#mid_navi")
                .classed("active",false)
        }
        // Europe Closing
        changeColor(response.index)

        
    } else if (response.index == 23) {
        if(response.direction == "up") {
            // main.select("#heading")
            //     .style("opacity","0")
            
            // article
            //     .style("left",window.innerWidth * 0.0  + "px");
            state.eur_left = window.innerWidth * 0.05
        }
        // WorldOpaque
        changeColor(response.index)
    } else if (response.index==24) {
        // Europe Heading
        // main.select("#heading")
        //     .text("Middle East")

        // main.select("#heading")
        //     .transition()
        //     .duration(500)
        //     .style("opacity","1")
        
        main.select("#eur_navi")
            .classed("active",false)
        main.select("#mid_navi")
            .classed("active",true)

        article
            .style("left",window.innerWidth * 0.05 + "px");
        state.eur_left = window.innerWidth * 0.05

        changeColor(response.index)
    } else if (response.index == 25) {
        // Middle East Intro
        // main.select("#heading")
        //     .transition()
        //     .duration(50)
        //     .style("opacity","0")
        if(response.direction == "up") {
            map.svg.selectAll("path.countries")
                .transition()
                .duration(50) 
                .attr("fill","#464866")
        }

        map.svg.selectAll("path.countries")
            .transition()
            .duration(50) 
            .style("opacity","1")

        changeColor(response.index)

        
    } else if (response.index == 26 ) {
        //Saudi
        changeColor(response.index)
        var crv6 = new trendCurve(6, state)
    } else if (response.index == 27) {
        //Iran
        changeColor(response.index)
        var crv7 = new trendCurve(7, state)
    } else if (response.index == 28) {
        //Israel
        changeColor(response.index)
        var crv8 = new trendCurve(8, state)
    } else if (response.index == 29) {
        changeColor(response.index)
    } // else if (response.index == 30) {
    //     changeColor(response.index)
    // } else if (response.index == 31) {
    //     changeColor(response.index) 
    // }
}

function handleStepExit(response) {
    if (response.index == 1) {
        console.log("Handle Exit for World Map Heading")

    } else {
       
    }
    
}

function init() {
    
    handleResize();

    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.9,
            progress: true,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        
}