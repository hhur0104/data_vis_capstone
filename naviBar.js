class naviBar {
    constructor(state) {
        var world_navi = d3.select("#world_navi")
        var east_navi = d3.select("#east_navi")
        var eur_navi = d3.select("#eur_navi")
        var mid_navi = d3.select("#mid_navi")
        var us_navi = d3.select("#us_navi")
        
        world_navi.on("click", function(){
            world_navi.classed("active",true)
            east_navi.classed("active",false)
            eur_navi.classed("active",false)
            mid_navi.classed("active",false)
            us_navi.classed("active",false)
            //document.getElementById("world_home").scrollIntoView({behavior: 'smooth'});
            document.getElementById("world_home").scrollIntoView();
        })

        
        east_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",true)
            eur_navi.classed("active",false)
            mid_navi.classed("active",false)
            us_navi.classed("active",false)
            document.getElementById("east_home").scrollIntoView();
        })

        
        eur_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",false)
            eur_navi.classed("active",true)
            mid_navi.classed("active",false)
            us_navi.classed("active",false)
            document.getElementById("eur_home").scrollIntoView();
        })

        
        mid_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",false)
            eur_navi.classed("active",false)
            mid_navi.classed("active",true)
            us_navi.classed("active",false)
            document.getElementById("mid_home").scrollIntoView();
        })

        
        us_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",false)
            eur_navi.classed("active",false)
            mid_navi.classed("active",false)
            us_navi.classed("active",true)
            document.getElementById("us_home").scrollIntoView();
        })
    }
}
export { naviBar };