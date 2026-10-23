const BASE_FILL = "#464866";

class WorldMap {
    constructor(svgSelector, world) {
        this.svg = d3.select(svgSelector);
        this.g = this.svg.append("g");
        this.features = topojson.feature(world, world.objects.countries).features;
        this.byName = new Map(this.features.map(f => [f.properties.name, f]));

        this.countries = this.g.append("g")
            .selectAll("path.countries")
            .data(this.features, d => d.properties.name)
            .join("path")
            .attr("class", "countries")
            .attr("stroke", "#90CCF4")
            .attr("fill", BASE_FILL);

        this.borders = this.g.append("path")
            .attr("fill", "none")
            .attr("stroke-linejoin", "round")
            .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b));

        const g = this.g;
        this.zoom = d3.zoom()
            .scaleExtent([1, 1.5])
            .on("zoom", ({ transform }) => {
                g.attr("transform", transform);
                g.attr("stroke-width", 1 / transform.k);
            });
        this.svg.call(this.zoom).on("wheel.zoom", null);
    }

    // Recompute the projection for the current layout (called on load and on resize).
    layout(state) {
        this.width = state.width;
        this.height = state.height;
        const projection = d3.geoMercator()
            .scale(state.width * 0.17)
            .center([0, 30])
            .translate([state.width / 2, state.height / 2]);
        this.path = d3.geoPath(projection);
        this.countries.attr("d", this.path);
        this.borders.attr("d", this.path);
    }

    show(visible, duration) {
        this.svg.transition("fade").duration(duration).style("opacity", visible ? 1 : 0);
    }

    highlight(names, color, duration) {
        const set = new Set(names);
        this.countries
            .transition("fill").duration(duration)
            .attr("fill", d => set.has(d.properties.name) ? color : BASE_FILL);
    }

    zoomTo(target, duration) {
        let t = d3.zoomIdentity;
        if (target !== "world") {
            const feature = this.byName.get(target.country);
            if (feature) {
                const [[x0, y0], [x1, y1]] = this.path.bounds(feature);
                t = d3.zoomIdentity
                    .translate(this.width / 2, this.height / 2)
                    .scale(target.k)
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
            }
        }
        this.svg.transition("zoom").duration(duration).call(this.zoom.transform, t);
    }
}

export { WorldMap };
