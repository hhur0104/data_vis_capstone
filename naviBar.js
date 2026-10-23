// Section menu: jumps to the first step of a section and marks it active.
const IDS = { world: "world_navi", east: "east_navi", eur: "eur_navi", mid: "mid_navi" };

class NaviBar {
    constructor(stepNodes, sections) {
        this.menu = d3.select("#navi");
        for (const [key, stepIndex] of Object.entries(sections)) {
            d3.select(`#${IDS[key]}`).on("click", () => {
                // Land with the section's first step at mid-screen, past Scrollama's
                // trigger line, so that step (not the one after it) is the active one.
                const top = stepNodes[stepIndex].getBoundingClientRect().top + window.scrollY;
                window.scrollTo(0, top - window.innerHeight * 0.5);
            });
        }
    }

    setActive(section) {
        for (const [key, id] of Object.entries(IDS)) {
            d3.select(`#${id}`).classed("active", key === section);
        }
    }

    show(visible) {
        this.menu.transition().duration(500).style("opacity", visible ? 1 : 0);
        this.menu.style("pointer-events", visible ? "auto" : "none");
    }
}

export { NaviBar };
