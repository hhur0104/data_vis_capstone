import { STEPS, BARS, TRENDS, SECTIONS, HIGHLIGHT_COLOR } from "./steps.js";
import { WorldMap } from "./worldmap.js";
import { StickyBar } from "./stickyBar.js";
import { drawTrend } from "./trendCurve.js";
import { NaviBar } from "./naviBar.js";

const main = d3.select("main");
const figure = main.select("#worldmap");
const stepNodes = main.selectAll("#scrolly article .step").nodes();
const context = d3.select("#context");
const typewriter = d3.select("#typewriter");

const state = { current: 0, width: 0, height: 0, contextWidth: 0 };
let map, bar, nav, groups, trend;
const scroller = scrollama();

Promise.all([
    d3.json("./data/world-110.topo.json"),
    d3.csv("./data/targets_mod.csv"),
    d3.csv("./data/trend_lastSvn.csv"),
]).then(([world, targets, trendRows]) => {
    trend = trendRows;
    groups = buildGroups(targets);
    map = new WorldMap("#worldmap", world);
    bar = new StickyBar("#worldmap");
    nav = new NaviBar(stepNodes, SECTIONS);
    whenVisible(init);
});

// Named country groups used by the steps' highlight settings.
function buildGroups(targets) {
    const pick = test => targets.filter(test).map(d => d.Country);
    return {
        increased: pick(d => d.big2021 === "TRUE"),
        decreased: pick(d => d.big2021 === "FALSE"),
        top10: pick(d => d.top10 === "TRUE"),
        top20: pick(d => d.top20 === "TRUE"),
        "North America": pick(d => d.SubRegion === "North America"),
        "East Asia": pick(d => d.SubRegion === "East Asia"),
        "Western Europe": pick(d => d.SubRegion === "Western Europe"),
        "Middle East": pick(d => d.SubRegion === "Middle East"),
        europeIncreased: pick(d => d.big2021 === "TRUE" && d.Region === "Europe"),
    };
}

// Scrollama can't measure steps in a window with no height (hidden tab or pane),
// so wait until the page has a real size before setting it up.
function whenVisible(fn) {
    if (window.innerHeight > 0 && window.innerWidth > 0) return fn();
    const retry = () => {
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            window.removeEventListener("resize", retry);
            document.removeEventListener("visibilitychange", retry);
            fn();
        }
    };
    window.addEventListener("resize", retry);
    document.addEventListener("visibilitychange", retry);
}

function layout() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    main.selectAll(".step").style("height", `${vh}px`);

    state.width = vw * 0.7;
    state.height = vh * 0.95;
    state.contextWidth = vw * 0.3 - 20;

    figure
        .style("left", `${vw * 0.3}px`)
        .style("width", `${state.width}px`)
        .style("height", `${state.height}px`)
        .style("top", `${(vh - state.height) / 2}px`);

    context
        .style("top", `${vh * 0.35}px`)
        .style("width", `${state.contextWidth}px`);

    map.layout(state);
    bar.layout(state);
}

function render(index, { animate = true } = {}) {
    const step = STEPS[index];
    const d = animate ? 1 : 0;

    map.show(!step.hidden, 1000 * d);
    nav.show(!step.hidden);
    nav.setActive(step.nav);

    const h = step.highlight;
    const names = !h ? [] : h.countries || groups[h.group] || [];
    map.highlight(names, (h && h.color) || HIGHLIGHT_COLOR, 1000 * d);
    map.zoomTo(step.zoom, 1000 * d);

    bar.render(step.bar ? BARS[step.bar] : null, 2500 * d);

    context.selectAll("svg").remove();
    if (step.trend) {
        drawTrend(context, trend, TRENDS[step.trend], state.contextWidth, 1500 * d);
    }

    const text = step.text;
    typewriter.interrupt();
    if (animate) {
        typewriter.transition().duration(3000).tween("text", function () {
            return t => { this.innerText = text.substring(0, Math.round(t * text.length)); };
        });
    } else {
        typewriter.property("innerText", text);
    }
}

function init() {
    layout();
    render(0, { animate: false });

    scroller
        .setup({ step: "#scrolly article .step", offset: 0.9 })
        .onStepEnter(({ index }) => {
            state.current = index;
            render(index);
        });

    let timer;
    window.addEventListener("resize", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (window.innerHeight === 0) return;
            layout();
            render(state.current, { animate: false });
            scroller.resize();
        }, 200);
    });
}
