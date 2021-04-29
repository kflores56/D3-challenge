//// SET UP ////

var svgWidth = 750;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(function(demoData) {

  // Parse Data
  demoData.forEach(function(data) {
    data.poverty = +data.poverty; 
    data.healthcare = +data.healthcare;
    // data.abbr = +data.abbr;
  });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8.5, d3.max(demoData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(demoData, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    chartGroup.selectAll("circle")
      .data(demoData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "18")
      .classed("stateCircle", true)
      .attr("opacity", ".5");

    // Create labels for circles
    chartGroup.selectAll(null)
      .data(demoData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare - 0.15))
      .text(d => d.abbr)
      .classed("stateText", true);

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40,)
      .attr("x", 0 - (height / 1.3))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Residents Lacking Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.15}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty Rate (%)");
  }).catch(function(error) {
    console.log(error);


})
