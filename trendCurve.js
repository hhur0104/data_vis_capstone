// 2011-2021 spending trend for one or more countries, drawn under the narrative text.
const COLORS = ["red", "yellow", "green"];
const LABELS = { SouthKorea: "South Korea", SaudiArabia: "Saudi Arabia" };

function drawTrend(container, trend, config, width, duration) {
    const { series, height } = config;
    const bottom = height - 40;
    const lines = series.map(name => ({
        name,
        values: trend.map(r => ({ year: +r.Year, value: +r[name] })).filter(d => !isNaN(d.value)),
    }));

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "relative")
        .style("background-color", "#20212e");

    const x = d3.scaleLinear()
        .domain(d3.extent(trend, r => +r.Year))
        .range([15, width - 15]);
    const y = d3.scaleLinear()
        .domain(d3.extent(lines.flatMap(l => l.values), d => d.value)).nice()
        .range([bottom, 10]);

    svg.append("g")
        .attr("transform", `translate(0,${bottom})`)
        .style("color", "white")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)");

    svg.append("g")
        .style("color", "white")
        .call(d3.axisRight(y));

    svg.append("text")
        .attr("x", width - 15)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .style("font-size", "11px")
        .text("USD billions");

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value));

    const paths = svg.selectAll("path.line")
        .data(lines)
        .join("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", (d, i) => COLORS[i % COLORS.length])
        .attr("stroke-width", 4)
        .attr("d", d => line(d.values));

    // draw-on animation, per line
    paths.each(function () {
        const len = this.getTotalLength();
        d3.select(this)
            .attr("stroke-dasharray", `${len} ${len}`)
            .attr("stroke-dashoffset", len)
            .transition().duration(duration).ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });

    if (lines.length > 1) {
        svg.selectAll("text.label")
            .data(lines)
            .join("text")
            .attr("class", "label")
            .attr("x", 30)
            .attr("y", d => y(d.values[0].value))
            .attr("dy", "-0.5em")
            .attr("fill", "white")
            .style("font-family", "sans-serif")
            .style("font-size", "12px")
            .text(d => LABELS[d.name] || d.name);
    }
}

export { drawTrend };
