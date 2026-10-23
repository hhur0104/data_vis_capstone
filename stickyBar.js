// Comparison bar along the bottom of the map: a reference total and the part
// of it being discussed, drawn as two overlapping rounded bars.
const BAR_H = 30;
const fmt = v => v >= 1e6 ? `$${(v / 1e6).toFixed(2)}T` : `$${Math.round(v / 1e3)}B`;

class StickyBar {
    constructor(svgSelector) {
        this.g = d3.select(svgSelector).append("g").attr("class", "sticky-bar");
    }

    layout(state) {
        this.margin = state.width * 0.15;
        this.right = state.width - this.margin;
        this.y = state.height * 0.93;
    }

    render(rows, duration) {
        if (!rows) {
            this.g.selectAll("*").interrupt().remove();
            return;
        }
        const data = rows.map(([label, val, color]) => ({ label, val, color }));
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.val)])
            .range([this.margin, this.right]);

        this.g.selectAll("rect")
            .data(data, (d, i) => i)
            .join(enter => enter.append("rect").attr("width", 0))
            .attr("x", this.margin)
            .attr("y", this.y)
            .attr("height", BAR_H)
            .attr("rx", BAR_H / 2)
            .transition().duration(duration)
            .attr("fill", d => d.color)
            .attr("width", d => x(d.val) - this.margin);

        this.g.selectAll("circle")
            .data(data, (d, i) => i)
            .join(enter => enter.append("circle").attr("r", 0))
            .attr("cy", this.y + BAR_H / 2)
            .attr("fill", "black")
            .transition().duration(duration)
            .attr("cx", d => x(d.val) - BAR_H / 2)
            .attr("r", 10);

        this.g.selectAll("text")
            .data(data, (d, i) => i)
            .join(enter => enter.append("text").style("opacity", 0))
            // reference label above the bar, highlighted part below, so they never collide
            .attr("y", (d, i) => i === 0 ? this.y - 6 : this.y + BAR_H + 16)
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .style("font-size", "1.2em")
            .text(d => `${d.label}  ${fmt(d.val)}`)
            .transition().duration(duration)
            .attr("x", d => x(d.val))
            .style("opacity", 1);
    }
}

export { StickyBar };
