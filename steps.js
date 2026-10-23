// One entry per scroll step. Each step fully describes what is on screen,
// so entering a step (by scrolling, fast scrolling, or the section menu)
// never depends on which step came before it.
//
//   text       narrative typed into the side panel
//   nav        section highlighted in the menu
//   highlight  { group } or { countries }, plus optional color
//   zoom       "world" or { country, k }
//   bar        key into BARS (comparison bar at the bottom), or null
//   trend      key into TRENDS (line chart under the text), or null

const RED = "#F76C6C";
const BLUE = "#77A6F7";

export const STEPS = [
    { // 0 - intro, map hidden
        text: "", nav: null, hidden: true, highlight: null, zoom: "world", bar: null, trend: null },
    { // 1
        text: "Let's start with an overview.",
        nav: "world", highlight: null, zoom: "world", bar: null, trend: null },
    { // 2
        text: "In 2021, 98 countries increased their military expenditure spending.",
        nav: "world", highlight: { group: "increased" }, zoom: "world", bar: null, trend: null },
    { // 3
        text: "and 36 countries decreased their spending.",
        nav: "world", highlight: { group: "decreased", color: BLUE }, zoom: "world", bar: null, trend: null },
    { // 4
        text: "The top 10 spending countries accounted for ~75% of world's total. That is about 1.6 Trillion US Dollars.",
        nav: "world", highlight: { group: "top10" }, zoom: "world", bar: "top10", trend: null },
    { // 5
        text: "Adding the next 10, top 20 countries account for ~86% of the total.",
        nav: "world", highlight: { group: "top20" }, zoom: "world", bar: "top20", trend: null },
    { // 6
        text: "North America has the most regional total. US = $800B. Canada=$26B",
        nav: "world", highlight: { group: "North America" }, zoom: { country: "United States of America", k: 2 }, bar: "northAmerica", trend: null },
    { // 7
        text: "East Asia ranks 2nd in regional total. $410B",
        nav: "world", highlight: { group: "East Asia" }, zoom: { country: "Taiwan", k: 2 }, bar: "eastAsia", trend: null },
    { // 8
        text: "Western Europe ranks 3rd in regional total. $305B",
        nav: "world", highlight: { group: "Western Europe" }, zoom: { country: "Germany", k: 2 }, bar: "westernEurope", trend: null },
    { // 9
        text: "Middle East ranks 4th in regional total. $186B",
        nav: "world", highlight: { group: "Middle East" }, zoom: { country: "Kuwait", k: 2 }, bar: "middleEast", trend: null },
    { // 10
        text: "", nav: "world", highlight: null, zoom: "world", bar: null, trend: null },

    // ---- East Asia ----
    { // 11
        text: "Let's look at East Asia.",
        nav: "east", highlight: null, zoom: { country: "Taiwan", k: 2 }, bar: null, trend: null },
    { // 12
        text: "Since WWII, East Asia has been an important region in preventing the spread of communism led by U.S and its Major Non-Nato Allies. \n That strategy largely remains the same. \n\n Scroll down for more detail outlook.",
        nav: "east", highlight: null, zoom: { country: "Taiwan", k: 2 }, bar: null, trend: null },
    { // 13
        text: "China \n- 2nd in GDP \n- 2nd in Military Expenditure \n- Most Foreign Arms Deal: Russia (Import)\n- Formal Ally: North Korea\n- Nuclear Warheads\n- Milex Trend in Last 10 Years:",
        nav: "east", highlight: { countries: ["China"] }, zoom: { country: "China", k: 3 }, bar: "china", trend: "china" },
    { // 14
        text: "Japan, South Korea & Taiwan\n- 3rd, 10th, ~20th in GDP\n- 9th, 10th, 21st in Military Expenditure\n- Most Foreign Arms Deal: US (Import)\n- US Major Non-Nato Allies",
        nav: "east", highlight: { countries: ["Japan", "South Korea", "Taiwan"] }, zoom: { country: "Japan", k: 3 }, bar: "eastAsiaAllies", trend: "eastAsiaAllies" },
    { // 15
        text: "Just these four countries together spent more than all Western Europe combined ($410B > $305B). Conflicts of political and economical interests between these countries make this region a hot bed for possible military conflict. \n\n Upward trend will likely continue.",
        nav: "east", highlight: { countries: ["China", "Japan", "South Korea", "Taiwan"] }, zoom: { country: "China", k: 3 }, bar: "eastAsia4", trend: null },
    { // 16
        text: "", nav: "east", highlight: null, zoom: "world", bar: null, trend: null },

    // ---- Europe ----
    { // 17
        text: "", nav: "eur", highlight: null, zoom: { country: "Germany", k: 3 }, bar: null, trend: null },
    { // 18
        text: "After the fall of Soviet Union, Europe went through a period of demilitarization. Since the annexation of Crimea by Russia, Europe has been steadily increasing military spending once again. \n\nScroll down for more detail outlook of key nations.",
        nav: "eur", highlight: null, zoom: { country: "Germany", k: 3 }, bar: null, trend: null },
    { // 19
        text: "Russia\n- GDP: 11th\n- Milex World: 5th\n- Milex Europe: 2nd\n- Most Foreign Arms Deal: India, China (Export)\n- Nuclear Warheads",
        nav: "eur", highlight: { countries: ["Russia"] }, zoom: { country: "Ukraine", k: 3 }, bar: "russia", trend: "russia" },
    { // 20
        text: "Ukraine\n- GDP $200B\n- 35th in Military Expenditure $5.6B\n- Most Foreign Arms Deal: US (Import)\n",
        nav: "eur", highlight: { countries: ["Ukraine"] }, zoom: { country: "Poland", k: 3 }, bar: "ukraine", trend: "ukraine" },
    { // 21
        text: "UK, France, Germany\n- GDP: 5,7,4th\n- Milex World: 4,6,7th\n- Milex Europe: 1,3,4th\n- Allies: NATO\n- Most Foreign Arms Deal: US (Import)\n- Nuclear Warheads (UK, France)",
        nav: "eur", highlight: { countries: ["United Kingdom", "Germany", "France"] }, zoom: { country: "United Kingdom", k: 3 }, bar: "nato3", trend: "nato3" },
    { // 22
        text: "The upward trend was already there. Most of the Europe increased their spending in 2021 (marked red) even before the Russian invasion of Ukraine in 2022. This prompted Sweden and Finland to newly join NATO alliance, but a resolution in Ukraine still seems far away at the time of writing. \n\nThe rearmament trend in Europe will likely continue.",
        nav: "eur", highlight: { group: "europeIncreased" }, zoom: { country: "United Kingdom", k: 3 }, bar: null, trend: null },
    { // 23
        text: "", nav: "eur", highlight: null, zoom: "world", bar: null, trend: null },

    // ---- Middle East ----
    { // 24
        text: "", nav: "mid", highlight: null, zoom: { country: "Kuwait", k: 3 }, bar: null, trend: null },
    { // 25
        text: "With world's most Oil reserves, this region always been a region of interests for major powers in Europe and America in 20th century. The recent history also contributes the geopolitics in the region to remain constantly at unease with range of problems to resolve.\n\nScroll down to see military spending outlook for major powers in the region.",
        nav: "mid", highlight: null, zoom: { country: "Kuwait", k: 3 }, bar: null, trend: null },
    { // 26
        text: "Saudi Arabia\n- GDP: 19th\n- Milex MiddleEast: 1st\n- Milex World: 8th\n- Most Foreign Arms Deal: US (Import)\n- Petro-Dollar Agreement with US",
        nav: "mid", highlight: { countries: ["Saudi Arabia"] }, zoom: { country: "Saudi Arabia", k: 3 }, bar: "saudi", trend: "saudi" },
    { // 27
        text: "Iran\n- GDP: 17th\n- Milex MiddleEast: 2nd\n- Milex World: 14th\n- US Economic Sanction on Iran",
        nav: "mid", highlight: { countries: ["Iran"] }, zoom: { country: "Iran", k: 3 }, bar: "iran", trend: "iran" },
    { // 28
        text: "Israel\n- GDP: 30th\n- Milex MiddleEast: 3rd\n- Milex World: 15th\n- US Major Non-Nato Ally",
        nav: "mid", highlight: { countries: ["Israel"] }, zoom: { country: "Israel", k: 5 }, bar: "israel", trend: "israel" },
    { // 29
        text: "In March 2023, Saudi Arabia and Iran announced they are restoring diplomatic relations with China brokering the deal. This is a diplomatic blow to U.S. and a win for China. This potentially may lead to more complex and complicated conflicts if China gains more favor in the region and tries to replace more traditional western politics and interests.",
        nav: "mid", highlight: null, zoom: { country: "Kuwait", k: 3 }, bar: null, trend: null },
];

export const HIGHLIGHT_COLOR = RED;

// Comparison bars: reference total first, the highlighted part second.
// Values are 2021 military expenditure in USD millions (SIPRI).
export const BARS = {
    top10:          [["World", 2077095.3, "gray"], ["Top 10", 1577475.0, "yellow"]],
    top20:          [["World", 2077095.3, "gray"], ["Top 20", 1798287.3, "yellow"]],
    northAmerica:   [["World", 2077095.3, "gray"], ["North America", 827121.4, "green"]],
    eastAsia:       [["World", 2077095.3, "gray"], ["East Asia", 410769.1, "green"]],
    westernEurope:  [["World", 2077095.3, "gray"], ["Western Europe", 304961.2, "green"]],
    middleEast:     [["World", 2077095.3, "gray"], ["Middle East", 186318.5, "green"]],
    china:          [["East Asia", 410769.1, "gray"], ["China", 293351.8, "red"]],
    eastAsiaAllies: [["East Asia", 410769.1, "gray"], ["Japan, S. Korea, Taiwan", 117309, "red"]],
    eastAsia4:      [["China, Japan, S. Korea, Taiwan", 715621.8, "red"], ["Western Europe", 304961.2, "green"]],
    russia:         [["Eastern Europe", 76290, "gray"], ["Russia", 65907.7, "red"]],
    ukraine:        [["Eastern Europe", 76290, "gray"], ["Ukraine", 5942.8, "red"]],
    nato3:          [["Western Europe", 304961.2, "gray"], ["UK, France, Germany", 181030.4, "red"]],
    saudi:          [["Middle East", 186318.5, "gray"], ["Saudi Arabia", 55564.3, "yellow"]],
    iran:           [["Middle East", 186318.5, "gray"], ["Iran", 24589.1, "yellow"]],
    israel:         [["Middle East", 186318.5, "gray"], ["Israel", 24341.0, "yellow"]],
};

// Trend charts: column names in data/trend_lastSvn.csv (USD billions, 2011-2021).
export const TRENDS = {
    china:          { series: ["China"], height: 200 },
    eastAsiaAllies: { series: ["Japan", "SouthKorea", "Taiwan"], height: 300 },
    russia:         { series: ["Russia"], height: 200 },
    ukraine:        { series: ["Ukraine"], height: 200 },
    nato3:          { series: ["UK", "Germany", "France"], height: 300 },
    saudi:          { series: ["SaudiArabia"], height: 200 },
    iran:           { series: ["Iran"], height: 200 },
    israel:         { series: ["Israel"], height: 200 },
};

// Menu entries -> the step each one jumps to.
export const SECTIONS = { world: 1, east: 11, eur: 17, mid: 24 };
