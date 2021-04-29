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
  .attr("height", svgHeight + 25);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params 
var chosenXAxis = "poverty";

// function for updating x-scale with selected
function xScale(demoData, chosenXAxis) {
  var xLinearScale = d3.scaleLinear()
  .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.9,
    d3.max(demoData, d => d[chosenXAxis]) * 1.05
])
  .range([0, width]);

  return xLinearScale
}

// function used for updating x axis when selected 
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function for updating circle group with a transition 
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// Import Data
d3.csv("./assets/data/data.csv").then(function(demoData) {

  // Parse Data
  demoData.forEach(function(data) {
    data.poverty = +data.poverty; 
    data.healthcare = +data.healthcare;
    data.age = +data.age;
  });

    // xLinearScale function above csv import
    var xLinearScale = xScale(demoData, chosenXAxis);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(demoData, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Append Axes to the chart
    var xAxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(demoData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "18")
      .classed("stateCircle", true)
      .attr("opacity", ".5");

    // Create labels for circles // POVERTY
    chartGroup.selectAll(null)
      .data(demoData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare - 0.15))
      .text(d => d.abbr)
      .classed("stateText", true);

    // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`); 
    
    var povertyLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("Poverty Rate (%)");

    var ageLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (years)");
    
    // Create y axis labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40,)
      .attr("x", 0 - (height / 1.3))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Residents Lacking Healthcare (%)");

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {

      // replaces chosenXAxis with value
      chosenXAxis = value;

      // updates x scale for new data
      xLinearScale = xScale(demoData, chosenXAxis);

      // updates x axis with transition
      xAxis = renderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

      // changes classes to change bold text
      if (chosenXAxis === "poverty") {
        povertyLabel
          .classed("active", true)
          .classed("inactive", false);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);
      pov_abbr
        .classed("stateText", true);
        
      }
      else {
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
          .classed("active", true)
          .classed("inactive", false);
        chartGroup.selectAll(null)
          .data(demoData)
          .enter()
          .append("text")
          .attr("x", d => xLinearScale(d.age))
          .attr("y", d => yLinearScale(d.healthcare - 0.15))
          .text(d => d.abbr)
          .classed("stateText", true);
      }
    }
  });
}).catch(function(error) {
console.log(error);

})
