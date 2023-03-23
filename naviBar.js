class naviBar {
    constructor(state) {
        var world_navi = d3.select("#world_navi")
        world_navi.on("click", function(){
            world_navi.classed("active",true)
            east_navi.classed("active",false)
            eur_navi.classed("active",false)
            mid_navi.classed("active",false)
            //document.getElementById("world_home").scrollIntoView({behavior: 'smooth'});
            document.getElementById("world_home").scrollIntoView();
        })

        var east_navi = d3.select("#east_navi")
        east_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",true)
            eur_navi.classed("active",false)
            mid_navi.classed("active",false)
            document.getElementById("east_home").scrollIntoView();
        })

        var eur_navi = d3.select("#eur_navi")
        eur_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",false)
            eur_navi.classed("active",true)
            mid_navi.classed("active",false)
            document.getElementById("eur_home").scrollIntoView();
        })

        var mid_navi = d3.select("#mid_navi")
        mid_navi.on("click", function(){
            world_navi.classed("active",false)
            east_navi.classed("active",false)
            eur_navi.classed("active",false)
            mid_navi.classed("active",true)
            document.getElementById("mid_home").scrollIntoView();
        })
    }
}
export { naviBar };